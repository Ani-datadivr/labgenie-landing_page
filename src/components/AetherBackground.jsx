"use client";

import { useEffect, useRef } from "react";

// Interactive particle-network field, brand-recolored (Datadivr blue / azure on
// ink). Particles drift, connect to nearby neighbors, and repel from the cursor;
// links near the cursor brighten. Scoped to its container, DPR-crisp, and fully
// static under prefers-reduced-motion.
export default function AetherBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    // Render a single static frame (no rAF, no listeners) when motion is
    // reduced OR on touch/small screens: there's no cursor to interact with on
    // mobile, and the per-frame O(n²) link pass is the hero's heaviest cost.
    const reduce =
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768);

    let raf = 0;
    let particles = [];
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: null, y: null, radius: 150 };

    const DOT = "rgba(90,160,255,0.85)";
    const linkBase = (o) => `rgba(0,102,255,${o})`;
    const linkHot = (o) => `rgba(125,184,255,${o})`;

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = DOT;
        ctx.fill();
      }
      update() {
        if (this.x > w || this.x < 0) this.dx = -this.dx;
        if (this.y > h || this.y < 0) this.dy = -this.dy;
        if (mouse.x !== null) {
          const ddx = mouse.x - this.x;
          const ddy = mouse.y - this.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < mouse.radius + this.size && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (ddx / dist) * force * 4;
            this.y -= (ddy / dist) * force * 4;
          }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(130, Math.floor((w * h) / 15000));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.6 + 0.8;
        particles.push(
          new Particle(
            Math.random() * (w - size * 2) + size,
            Math.random() * (h - size * 2) + size,
            (Math.random() - 0.5) * 0.35,
            (Math.random() - 0.5) * 0.35,
            size
          )
        );
      }
    };

    const connect = () => {
      const maxDist = (Math.min(w, h) / 7) ** 2;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist) {
            const o = 1 - d2 / maxDist;
            let near = false;
            if (mouse.x !== null) {
              const md = Math.hypot(particles[a].x - mouse.x, particles[a].y - mouse.y);
              near = md < mouse.radius;
            }
            ctx.strokeStyle = near ? linkHot(o * 0.9) : linkBase(o * 0.5);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) p.update();
      connect();
    };

    // Loop runs only while the hero is on-screen and the tab is visible, so the
    // particle field doesn't burn CPU/GPU when scrolled past or backgrounded.
    let active = false;
    let onScreen = true;
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || active || !onScreen) return;
      active = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (reduce) {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) p.draw();
        connect();
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { rootMargin: "120px" }
    );

    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      document.addEventListener("visibilitychange", onVis);
      io.observe(parent);
      start();
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
