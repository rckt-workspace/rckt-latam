import type { CSSProperties } from "react";
import { useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export type SectorShortPageProps = {
  titulo: string;
  subtitulo: string;
  flujo: readonly string[];
  duele: readonly string[];
  ctaLabel?: string;
};

export function SectorShortPage({
  titulo,
  subtitulo,
  flujo,
  duele,
  ctaLabel = "Revisar mi proceso comercial →",
}: SectorShortPageProps) {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <section className="subpage-hero">
          <div className="subpage-hero-photo" aria-hidden="true">
            <img src={heroAsset} alt="" />
            <span className="subpage-hero-photo-overlay" />
          </div>
          <span className="tcn-orb tcn-orb-hero-corner" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-hero" aria-hidden="true" />
          <SiteHeader />
          <div className="container">
            <div className="subpage-hero-inner">
              <span className="kicker">Sectores</span>
              <h1>{titulo}</h1>
              <p className="sub">{subtitulo}</p>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="como-vende">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Cómo vende hoy este sector</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group">
              {flujo.map((paso, i) => (
                <div className="metodo-step rv" key={paso} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <h4>{paso}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="motion" id="que-le-duele">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Qué le duele</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {duele.map((texto, i) => (
                <div className="linea-card rv" key={texto} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Medimos antes de tocar nada.</h2>
            <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">
              {ctaLabel}
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function SectorError({ kicker = "Sectores" }: { kicker?: string }) {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">{kicker}</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
