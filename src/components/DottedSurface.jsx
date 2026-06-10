"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// An animated field of dots that ripples like a slow surface, rendered in WebGL.
// Tuned for this site: brand-azure points on the ink background, faded into the
// distance by linear fog so the grid reads as depth, not wallpaper.
//
// It is a decorative backdrop, so it is aggressively defensive about cost:
//   - device pixel ratio capped at 1.5 (retina phones don't need 3x for dots)
//   - the rAF loop only runs while the canvas is on-screen AND the tab is visible
//   - prefers-reduced-motion renders a single still frame and never animates
//
// `color` and `opacity` let callers tune the tone per surface; geometry is fixed.
export default function DottedSurface({
  color = 0x5aa0ff,
  opacity = 0.6,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SEPARATION = 130;
    const AMOUNTX = 32;
    const AMOUNTY = 42;

    const size = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    const scene = new THREE.Scene();
    // Fog color is the page ink, so far dots dissolve into the background.
    scene.fog = new THREE.Fog(0x0e141c, 900, 3000);

    const { w, h } = size();
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0); // transparent: the page bg shows through
    container.appendChild(renderer.domElement);

    const count = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(count * 3);
    let p = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[p] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[p + 1] = 0;
        positions[p + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        p += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color,
      size: 7,
      sizeAttenuation: true,
      transparent: true,
      opacity,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.attributes.position;
    const arr = posAttr.array;
    let wave = 0;
    let raf = 0;
    let running = false;

    const renderFrame = () => {
      let j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          arr[j + 1] =
            Math.sin((ix + wave) * 0.3) * 50 + Math.sin((iy + wave) * 0.5) * 50;
          j += 3;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const tick = () => {
      if (!running) return;
      renderFrame();
      wave += 0.1;
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Paint one frame immediately (this is also the reduced-motion still state).
    renderFrame();
    if (!reduce) start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Only animate while actually in view.
    const io = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(container);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const next = size();
        camera.aspect = next.w / next.h;
        camera.updateProjectionMatrix();
        renderer.setSize(next.w, next.h);
        if (!running) renderFrame();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, opacity]);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}
