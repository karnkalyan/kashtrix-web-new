import type { CSSProperties } from "react";
import Image from "next/image";

type Props = {
  image: string;
  alt: string;
  serverLabel: string;
  accent?: string;
  compact?: boolean;
  priority?: boolean;
};

export function ProductHardwareMockup({ image, alt, serverLabel, accent = "#6f2b8f", compact = false, priority = false }: Props) {
  return (
    <div className={`hardware-mockup ${compact ? "hardware-mockup-compact" : ""}`} style={{ "--hardware-accent": accent } as CSSProperties}>
      <div className="hardware-monitor">
        <div className="hardware-screen">
          <Image
            src={image}
            alt={alt}
            width={1900}
            height={1069}
            priority={priority}
            sizes={compact ? "(max-width: 1024px) 92vw, 540px" : "(max-width: 1024px) 100vw, 700px"}
            className="block h-auto w-full object-cover"
          />
        </div>
        <div className="hardware-chin"><span className="hardware-mark">K</span></div>
      </div>
      <div className="hardware-stand"><span /></div>
      <div className="rack-server" aria-hidden="true">
        <div className="rack-ear left" />
        <div className="rack-grill left-grill" />
        <div className="rack-brand">
          <Image
            src="/logo/kashtrix-server-logo.png"
            alt="Kashtrix Server"
            width={140}
            height={22}
            className="rack-server-logo"
            priority={priority}
          />
          {serverLabel && <span>{serverLabel}</span>}
        </div>
        <div className="rack-status"><i /> <span>RELIABLE</span><i /> <span>SCALABLE</span><i /> <span>READY</span></div>
        <div className="rack-grill right-grill" />
        <div className="rack-power"><span /></div>
        <div className="rack-ear right" />
      </div>
    </div>
  );
}
