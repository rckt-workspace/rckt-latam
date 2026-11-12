import ThemeToggle from "@/components/rckt/ThemeToggle";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";
import { useLanguage } from "@/i18n/LanguageProvider";

const FOOTER_NAV = [
  { href: "/soluciones/", label: "Soluciones" },
  { href: "/sistemas/", label: "Sistemas" },
  { href: "/sectores/", label: "Sectores" },
  { href: "/casos/", label: "Casos" },
  { href: "/recursos/", label: "Recursos" },
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/mercados/", label: "Mercados" },
  { href: "/sistemas/revenue-diagnostic", label: "Revenue Diagnostic" },
  { href: "/contacto", label: "Contacto" },
  { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
];

const FOOTER_LEGAL = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Aviso de privacidad" },
  { href: "/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf", label: "Política de Tratamiento de Datos", external: true },
  { href: "/legal/cookies", label: "Cookies" },
  // PENDIENTE: abrir panel de consentimiento, lo conecta backend.
  { href: "#preferencias-cookies", label: "Preferencias de cookies" },
];

// PENDIENTE: teléfono y horario de atención (Fabián)
const phone = "[pendiente]";
const hours = "[pendiente]";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer section-deep" style={{ borderTop: "1px solid var(--line-lt)" }} role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="self-start">
            <a href="/" className="flex items-center" aria-label="RCKT Home">
              <img src={logoDark} alt="RCKT" className="site-footer-logo site-footer-logo--dark h-8 w-auto" />
              <img src={logoLight} alt="" className="site-footer-logo site-footer-logo--light h-8 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">{t.footer.tagline}</p>
            <p className="font-display mt-4 text-sm text-paper/55">{t.footer.addressUs}</p>
            <p className="font-display mt-2 text-sm text-paper/55">{t.footer.addressCo}</p>
            <p className="label-orange mt-8 !text-[10px]">{t.footer.email}</p>
            <a href="mailto:hola@rckt.lat" className="font-display mt-3 block text-sm text-paper/55 transition-colors hover:text-paper">hola@rckt.lat</a>
            <a href="mailto:privacy@rckt.lat" className="font-display mt-2 block text-sm text-paper/55 transition-colors hover:text-paper">privacy@rckt.lat</a>
            {phone !== "[pendiente]" && <p className="font-display mt-2 text-sm text-paper/55">{phone}</p>}
            {hours !== "[pendiente]" && <p className="font-display mt-2 max-w-xs text-sm text-paper/55">{hours}</p>}
          </div>
          <nav aria-label="Footer">
            <p className="label-orange !text-[10px]">{t.footer.navTitle}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_NAV.map((link, i) => (
                <li key={link.href}><a href={link.href} className="font-display text-paper/55 transition-colors hover:text-paper">{t.footer.nav[i] ?? link.label}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="label-orange !text-[10px]">{t.footer.legalTitle}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LEGAL.map((link, i) => (
                  <li key={link.href}><a href={link.href} target={"external" in link ? "_blank" : undefined} rel={"external" in link ? "noopener noreferrer" : undefined} className="font-display text-paper/55 transition-colors hover:text-paper">{t.footer.legal[i] ?? link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label-orange !text-[10px]">{t.footer.appearance}</p>
            <div className="mt-4"><ThemeToggle /></div>
            <p className="mt-3 text-xs text-paper/40">{t.footer.appearanceHint}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-paper/35" style={{ borderColor: "var(--line-lt)" }}>
          <p>{t.footer.status}</p>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}