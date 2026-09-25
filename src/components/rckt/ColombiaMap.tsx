// Natural Earth 1:50m Admin 0 Countries (public domain), simplified and
// projected with an equirectangular projection centred on Colombia.
const COLOMBIA_PATH =
  "M223.4,86.0L207.6,90.8L200.4,102.6L195.5,104.6L189.4,111.6L185.0,120.2L181.6,137.8L172.7,152.6L177.0,152.6L180.3,151.0L182.7,154.1L186.8,154.8L190.1,166.8L196.2,173.0L196.9,175.3L197.7,180.3L195.5,183.3L194.9,194.4L196.8,197.1L201.4,198.2L204.5,205.1L206.4,206.7L209.2,207.7L216.0,206.7L228.2,207.8L237.9,205.2L246.5,208.2L253.0,208.7L270.4,229.4L272.1,228.8L274.3,230.0L278.7,227.9L282.5,227.5L294.1,228.6L309.3,225.3L316.5,226.5L318.6,228.0L319.7,231.9L318.8,234.3L316.3,236.7L314.6,243.5L310.1,250.7L309.3,269.8L314.2,285.9L322.8,297.1L321.8,299.4L309.9,310.2L309.3,312.7L311.6,311.7L315.2,312.7L316.5,315.3L325.3,322.7L327.3,332.5L333.4,348.5L333.6,351.9L328.5,352.9L327.6,339.9L320.6,329.6L316.8,330.7L310.3,337.7L307.3,338.8L304.9,337.8L301.0,332.8L299.4,336.4L301.4,339.5L273.0,339.5L267.5,338.2L259.9,339.8L259.8,356.0L273.2,356.2L276.9,360.9L277.2,366.0L273.9,366.8L269.3,364.3L260.9,367.3L254.8,368.0L254.4,386.0L258.1,390.4L265.2,395.2L266.3,398.5L265.8,401.6L267.5,405.4L269.8,407.5L271.0,412.4L257.0,488.4L247.7,477.9L243.0,479.2L237.9,477.0L254.3,451.3L253.8,449.0L232.1,437.7L226.5,440.3L221.5,440.9L212.7,436.3L206.9,440.7L201.1,442.5L196.7,443.2L191.1,441.3L183.2,442.4L177.9,439.5L178.6,434.5L176.9,428.3L169.5,424.8L168.8,418.7L165.3,413.7L160.4,412.4L155.6,408.2L150.8,406.8L148.7,403.8L146.6,397.0L141.7,391.8L138.2,390.0L137.1,387.5L133.5,387.2L128.7,383.8L126.6,383.5L125.1,385.2L116.9,380.9L112.9,380.3L105.7,373.9L100.6,371.5L97.7,372.4L96.8,376.0L95.1,376.6L86.8,376.3L79.7,373.6L72.7,372.7L71.0,366.6L66.5,364.4L65.1,361.6L62.0,361.9L50.0,356.3L40.9,350.4L32.3,341.9L34.0,338.7L38.1,336.3L43.5,338.2L44.1,334.4L42.2,331.1L43.1,323.6L47.4,320.4L56.1,319.8L60.9,314.4L62.4,314.6L65.9,310.5L65.4,306.5L68.7,305.6L72.2,299.0L73.7,298.8L80.7,284.7L78.4,285.9L76.0,285.2L75.7,281.0L73.7,283.9L72.0,281.0L72.4,276.3L69.6,277.2L73.8,272.5L75.5,264.5L74.1,261.5L73.3,249.4L72.6,247.1L69.3,244.1L74.5,240.6L76.4,238.0L70.9,228.1L70.8,225.4L72.7,225.6L73.4,218.1L71.7,215.2L69.5,215.2L60.2,201.8L62.0,196.4L64.1,194.1L63.7,190.0L65.0,190.2L68.0,193.9L69.2,193.3L73.9,189.9L74.0,186.6L77.7,183.2L70.7,170.0L72.8,166.4L86.2,180.2L84.7,181.7L85.1,184.0L87.9,184.2L89.0,182.4L88.2,174.7L87.1,170.9L84.5,168.2L100.5,157.8L104.0,150.9L106.7,148.4L109.7,146.7L116.3,146.2L117.2,144.0L115.3,139.3L117.5,132.7L117.4,129.4L118.8,127.4L118.3,126.6L114.6,128.9L118.4,124.3L121.1,117.2L136.0,104.8L145.7,107.8L148.8,107.6L144.8,109.1L144.2,110.9L147.0,113.4L153.4,99.5L165.0,100.7L174.0,100.1L188.7,89.7L199.7,85.3L203.2,77.8L207.3,76.5L213.6,72.0L219.1,71.7L224.9,74.1L227.5,78.4L228.0,81.3L223.4,86.0ZM54.9,319.0L53.0,318.5L53.3,316.3L54.9,319.0Z";

const CITIES = [
  { id: "bogota", name: "Bogotá", x: 155.2, y: 264.7, labelX: 190, labelY: 270 },
  { id: "medellin", name: "Medellín", x: 117.7, y: 226.4, labelX: 190, labelY: 229 },
  { id: "barranquilla", name: "Barranquilla", x: 137.6, y: 108.3, labelX: 190, labelY: 112 },
] as const;

type CityId = (typeof CITIES)[number]["id"];

export default function ColombiaMap({ compact = false, activeCity }: { compact?: boolean; activeCity?: CityId }) {
  const titleId = `colombia-map-title${compact ? "-compact" : ""}${activeCity ? `-${activeCity}` : ""}`;

  return (
    <div className={`market-map${compact ? " market-map--compact" : ""}`}>
      <svg viewBox="0 0 520 520" role="img" aria-labelledby={titleId}>
        <title id={titleId}>Mapa de Colombia con Bogotá, Medellín y Barranquilla como mercados activos de RCKT</title>
        <path className="market-map__country" d={COLOMBIA_PATH} />
        {CITIES.map((city, index) => {
          const selected = !activeCity || activeCity === city.id;
          return (
            <g key={city.id} className={selected ? "market-map__city is-active" : "market-map__city"}>
              <circle className="market-map__halo" cx={city.x} cy={city.y} r="18" style={{ animationDelay: `${index * 0.35}s` }} />
              <circle className="market-map__point" cx={city.x} cy={city.y} r={selected ? 6 : 4.5} />
              <path className="market-map__line" d={`M${city.x + 8} ${city.y}H${city.labelX - 10}`} />
              <text className="market-map__label" x={city.labelX} y={city.labelY}>{city.name} · activo</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}