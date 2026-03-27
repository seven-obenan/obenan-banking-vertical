import { motion } from "framer-motion";
import { Globe, Monitor, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProductIdentitySection = () => {
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Operasyonel Mükemmellik",
      headline: "Şube Ağınızdaki Devasa Yatırım Dijitalde Kaybolmasın.",
      bullets: [
        {
          icon: <Globe className="w-7 h-7" />,
          title: "Dijitalde Yoksan, Müşteriye Kapalısın",
          description: "Bir şube açmak milyonlara mal olur. Ama Google'da, Apple Haritalar'da, 70+ platformda görünmüyorsanız — o şubenin kapısı müşteriye kapalıdır. Obenan AI, yatırımınızı 70+ platformda görünür kılar. Otomatik. Anlık.",
        },
        {
          icon: <Monitor className="w-7 h-7" />,
          title: "Tek Ekran. Tüm Şubeler. Sıfır Hata.",
          description: "Yüzlerce şubenin bilgileri farklı platformlarda dağınık mı? Hangisinin verileri doğru, hangisinin yanlış — bilmiyorsanız, müşteri de bilmiyor. Obenan AI, tüm ağınızı tek ekrandan yönetir. Doğru bilgi. Her yerde. Her zaman.",
        },
        {
          icon: <RefreshCw className="w-7 h-7" />,
          title: "Manuel İş Tarih Oldu",
          description: "Çalışma saatleri mi değişti? Açıklama mı güncellenmeli? Tek bir mesajla Obenan AI, Google, Apple ve 130+ dizinde verilerinizi saniyeler içinde günceller. Siz işinizi yönetin. Gerisini bize bırakın.",
        },
      ],
    },
    en: {
      badge: "Operational Excellence",
      headline: "Don't Let the Colossal Investment in Your Branch Network Get Lost in Digital.",
      bullets: [
        {
          icon: <Globe className="w-7 h-7" />,
          title: "If You Don't Exist Digitally, You're Closed to the Customer",
          description: "Opening a branch costs millions. But if you're invisible on Google, Apple Maps, and 70+ platforms — that branch is closed to customers. Obenan AI makes your physical investment visible digitally. Automatic. Instant. On every platform.",
        },
        {
          icon: <Monitor className="w-7 h-7" />,
          title: "One Screen. All Branches. Zero Errors.",
          description: "Is your branch data scattered across platforms? If you don't know which listings are accurate and which aren't — neither does the customer. Obenan AI manages your entire network from one screen. Accurate data. Everywhere. Always.",
        },
        {
          icon: <RefreshCw className="w-7 h-7" />,
          title: "Manual Work is History",
          description: "Hours changed? Description needs updating? With one message, Obenan AI updates your data across Google, Apple, and 130+ directories in seconds. You run your business. Leave the rest to us.",
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {t.headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.bullets.map((bullet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/30 rounded-2xl border border-border p-8 md:p-10 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-primary">{bullet.icon}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {bullet.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {bullet.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
