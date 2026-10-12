export function AnimatedBrandShapes({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className={`brand-shape-field ${subtle ? "is-subtle" : ""}`} aria-hidden="true">
      <span className="brand-shape brand-shape-a" />
      <span className="brand-shape brand-shape-b" />
      <span className="brand-shape brand-shape-c" />
      <span className="brand-signal-line brand-signal-line-a" />
      <span className="brand-signal-line brand-signal-line-b" />
    </div>
  );
}
