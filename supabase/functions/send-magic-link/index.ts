import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { buildMagicLinkEmail, buildAdminNotificationEmail } from "./email-template.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    console.log(`[send-magic-link] Starting for: ${email}`);

    // Get origin from request headers for correct redirect
    const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "");
    const baseUrl = origin || "https://yapikredi.lovable.app";
    const callbackUrl = `${baseUrl}/auth/callback`;

    console.log(`[send-magic-link] Callback URL: ${callbackUrl}`);

    // Generate magic link using Supabase Auth Admin API
    const { data: otpData, error: otpError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: email,
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (otpError) {
      console.error("[send-magic-link] Error generating magic link:", otpError);
      throw otpError;
    }

    const magicLink = otpData.properties?.action_link;
    console.log("[send-magic-link] Magic link generated successfully");

    // Build the branded email HTML
    const emailHtml = buildMagicLinkEmail(magicLink);

    // Attempt to send branded email via Resend
    let emailSentViaResend = false;
    let resendError: string | null = null;

    try {
      const emailResponse = await resend.emails.send({
        from: "Obenan <noreply@obenan.tech>",
        replyTo: "seven@obenan.com",
        to: [email],
        subject: "Your Yapı Kredi Report Access Link",
        html: emailHtml,
      });

      if (emailResponse.error) {
        console.error("[send-magic-link] Resend returned error:", JSON.stringify(emailResponse.error));
        resendError = emailResponse.error.message || JSON.stringify(emailResponse.error);
        emailSentViaResend = false;
      } else {
        console.log("[send-magic-link] Resend email sent successfully. ID:", emailResponse.data?.id);
        emailSentViaResend = true;
      }
    } catch (resendErr: unknown) {
      const errMsg = resendErr instanceof Error ? resendErr.message : String(resendErr);
      console.error("[send-magic-link] Resend threw exception:", errMsg);
      resendError = errMsg;
      emailSentViaResend = false;
    }

    // FALLBACK: If Resend failed, use Supabase built-in OTP email
    let fallbackUsed = false;
    if (!emailSentViaResend) {
      console.log("[send-magic-link] Resend failed, attempting Supabase OTP fallback...");
      try {
        const { error: otpFallbackError } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: callbackUrl,
          },
        });

        if (otpFallbackError) {
          console.error("[send-magic-link] Supabase OTP fallback also failed:", otpFallbackError);
          return new Response(
            JSON.stringify({
              success: false,
              error: `Email delivery failed. Resend error: ${resendError}. Fallback error: ${otpFallbackError.message}`,
              method: "none",
            }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        console.log("[send-magic-link] Supabase OTP fallback sent successfully");
        fallbackUsed = true;
      } catch (fallbackErr: unknown) {
        const errMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
        console.error("[send-magic-link] Supabase OTP fallback exception:", errMsg);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Email delivery failed via all methods.",
            method: "none",
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Send admin notification (non-blocking)
    const method = emailSentViaResend ? "resend" : "supabase_otp";
    try {
      const adminHtml = buildAdminNotificationEmail(
        email,
        req.headers.get("user-agent") || "Unknown",
        emailSentViaResend ? "Resend (branded)" : "Supabase OTP (fallback)",
        resendError
      );
      await resend.emails.send({
        from: "Obenan Notifications <notifications@obenan.tech>",
        replyTo: "seven@obenan.com",
        to: ["seven@obenan.com"],
        subject: `Yapı Kredi Report Access: ${email}`,
        html: adminHtml,
      });
    } catch (adminErr: unknown) {
      const errMsg = adminErr instanceof Error ? adminErr.message : String(adminErr);
      console.warn("[send-magic-link] Admin notification failed (non-blocking):", errMsg);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Magic link sent successfully",
        method: method,
        fallbackUsed: fallbackUsed,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[send-magic-link] Fatal error:", errMsg);
    return new Response(
      JSON.stringify({ success: false, error: errMsg }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
