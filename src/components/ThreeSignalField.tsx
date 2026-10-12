"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeSignalField({ accent = "#7c3aed" }: { accent?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, node.clientWidth / node.clientHeight, 0.1, 100);
    camera.position.z = 9;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(node.clientWidth, node.clientHeight);
    node.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const positions: number[] = [];
    const count = 140;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 * 4.8;
      const r = 1.5 + (i / count) * 2.7;
      positions.push(Math.cos(a) * r, (i / count - 0.5) * 4.2 + Math.sin(a * 1.7) * 0.4, Math.sin(a) * r * 0.42);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: accent, size: 0.065, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat);
    group.add(pts);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.16 }));
    group.add(line);

    let frame = 0;
    const render = () => {
      group.rotation.y += 0.0016;
      group.rotation.z = Math.sin(performance.now() * 0.00018) * 0.08;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      if (!node.clientWidth || !node.clientHeight) return;
      camera.aspect = node.clientWidth / node.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(node.clientWidth, node.clientHeight);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      geo.dispose(); lineGeo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [accent]);

  return <div ref={mount} aria-hidden className="absolute inset-0 overflow-hidden" />;
}
