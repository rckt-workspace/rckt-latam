import ThemeToggle from "@/components/rckt/ThemeToggle";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";

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
  { href: "/legal/cookies", label: "Cookies" },
];

const email = "privacy@rckt.lat";
const phone = "[pendiente]";
const address = "Carrera 11B # 99-25, Bogotá D.C., Colombia";
const hours = "[pendiente]";

export default function SiteFooter() {
  return (
    <footer className="site-footer section-deep" style={{ borderTop: "1px solid var(--line-lt)" }} role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="self-start">
            <a href="/" className="flex items-center" aria-label="RCKT Home">
              <img src={logoDark} alt="RCKT" className="site-footer-logo site-footer-logo--dark h-8 w-auto" />
              <img src={logoLight} alt="" className="site-footer-logo site-footer-logo--light h-8 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">IA supervisada y documentada</p>
            <p className="font-display mt-4 text-sm text-paper/55">RCKT S.A.S. · NIT 902.075.396-5</p>
            <p className="label-orange mt-8 !text-[10px]">Correo</p>
            {email === "[pendiente]" ? (
              <p className="font-display mt-3 text-sm text-paper/55">{email}</p>
            ) : (
              <a href={`mailto:${email}`} className="font-display mt-3 inline-block text-sm text-paper/55 transition-colors hover:text-paper">{email}</a>
            )}
            <p className="font-display mt-2 text-sm text-paper/55">{phone}</p>
            <p className="font-display mt-2 max-w-xs text-sm text-paper/55">{address}</p>
            <p className="font-display mt-2 max-w-xs text-sm text-paper/55">{hours}</p>
          </div>
          <nav aria-label="Footer">
            <p className="label-orange !text-[10px]">Navegar</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}><a href={link.href} className="font-display text-paper/55 transition-colors hover:text-paper">{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="label-orange !text-[10px]">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.href}><a href={link.href} className="font-display text-paper/55 transition-colors hover:text-paper">{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label-orange !text-[10px]">Apariencia</p>
            <div className="mt-4"><ThemeToggle /></div>
            <p className="mt-3 text-xs text-paper/40">Versión clara u oscura, a tu gusto.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-paper/35" style={{ borderColor: "var(--line-lt)" }}>
          <p>sistema activo · 2026</p>
          <p>© RCKT — IA supervisada y documentada</p>
        </div>
      </div>
    </footer>
  );
}