/**
 * Obenan Branded Magic Link Email Template
 * 
 * Design specs:
 * - Background: #F8F8F8
 * - Surface/Logo block: #1F1F1F (150x125px desktop, 125x100px mobile)
 * - Heading: Helvetica Neue Light, 40px/48px desktop, 32px/38px mobile, color #1F1F1F
 * - Body: Helvetica Neue Light, 20px/150% desktop, Regular 14px/150% mobile, color #818181
 * - CTA Button: 204x50px, background #1F1F1F, 4px radius, white text 16px + right chevron
 * - Divider: 1px #E3E3E3
 * - Footer: 12px/16px Regular, color #818181, links #0D6CF6
 */

const LOGO_URL = "https://iyydmdrviofaulhyoynl.supabase.co/storage/v1/object/public/brand-assets/obenan-logo-email.png";

export function buildMagicLinkEmail(magicLink: string): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Yapı Kredi Report Access</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
    @media only screen and (max-width: 599px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .logo-block { width: 125px !important; height: 100px !important; }
      .logo-img { width: 80px !important; height: auto !important; }
      .heading { font-size: 32px !important; line-height: 38px !important; }
      .body-text { font-size: 14px !important; line-height: 150% !important; font-weight: 400 !important; }
      .body-text-width { width: 280px !important; }
      .divider { width: 279px !important; }
      .footer-text-width { width: 280px !important; }
      .gap-logo-heading { height: 73px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F8F8;">
  <center style="width: 100%; background-color: #F8F8F8;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;" class="email-container">
      <!-- Top spacing -->
      <tr><td style="height: 55px;"></td></tr>

      <!-- Logo Block -->
      <tr>
        <td align="center" class="content-padding">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td class="logo-block" style="width: 150px; height: 125px; background-color: #1F1F1F; border-radius: 16px; text-align: center; vertical-align: middle;">
                <img src="${LOGO_URL}" alt="Obenan" class="logo-img" style="width: 100px; height: auto;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Gap: Logo → Heading -->
      <tr><td class="gap-logo-heading" style="height: 96px;"></td></tr>

      <!-- Heading -->
      <tr>
        <td align="center" class="content-padding">
          <h1 class="heading" style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 40px; line-height: 48px; color: #1F1F1F; text-align: center;">
            Verify your email address...
          </h1>
        </td>
      </tr>

      <!-- Gap: Heading → Body -->
      <tr><td style="height: 7px;"></td></tr>

      <!-- Body Text -->
      <tr>
        <td align="center" class="content-padding">
          <p class="body-text body-text-width" style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 20px; line-height: 150%; color: #818181; text-align: center; max-width: 440px;">
            Click the link below to verify your email address. We will save your Yapı Kredi Google Maps Audit Report access using your email address.
          </p>
        </td>
      </tr>

      <!-- Gap: Body → Button -->
      <tr><td style="height: 12px;"></td></tr>

      <!-- CTA Button -->
      <tr>
        <td align="center" class="content-padding">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="border-radius: 4px; background-color: #1F1F1F;">
                <a href="${magicLink}" target="_blank" style="display: inline-block; padding: 14px 28px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; color: #FFFFFF; text-decoration: none; border-radius: 4px; text-align: center;">
                  Access Yapı Kredi Report ›
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Gap: Button → Divider -->
      <tr><td style="height: 24px;"></td></tr>

      <!-- Divider -->
      <tr>
        <td align="center" class="content-padding">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="divider" style="width: 440px;">
            <tr>
              <td style="border-top: 1px solid #E3E3E3;"></td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Gap: Divider → Footer -->
      <tr><td style="height: 12px;"></td></tr>

      <!-- Footer -->
      <tr>
        <td align="center" class="content-padding">
          <p class="body-text footer-text-width" style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 16px; color: #818181; text-align: center; max-width: 440px;">
            If you have any questions, please reply to this email or contact us at
            <a href="mailto:seven@obenan.com" style="color: #0D6CF6; text-decoration: none;">seven@obenan.com</a>
          </p>
          <p style="margin: 8px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 16px; color: #818181; text-align: center;">
            &copy; ${year} Obenan. All rights reserved.
          </p>
        </td>
      </tr>

      <!-- Bottom spacing -->
      <tr><td style="height: 55px;"></td></tr>
    </table>
  </center>
</body>
</html>`;
}

export function buildAdminNotificationEmail(
  email: string,
  userAgent: string,
  method: string,
  resendError: string | null
): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #1F1F1F;">
  <h2 style="color: #1F1F1F;">New Yapı Kredi Report Access Request</h2>
  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tr><td style="padding: 8px; font-weight: bold; color: #818181;">Email:</td><td style="padding: 8px;">${email}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #818181;">Time:</td><td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #818181;">User Agent:</td><td style="padding: 8px; font-size: 12px;">${userAgent}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #818181;">Delivery Method:</td><td style="padding: 8px;">${method}</td></tr>
    ${resendError ? `<tr><td style="padding: 8px; font-weight: bold; color: #cc0000;">Resend Error:</td><td style="padding: 8px; color: #cc0000;">${resendError}</td></tr>` : ""}
  </table>
</body>
</html>`;
}
