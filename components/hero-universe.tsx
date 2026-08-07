'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Pulse {
  x: number;
  y: number;
  start: number;
}

const LINK_DISTANCE = 150;
const PULSE_DURATION = 1600;
const PULSE_INTERVAL = 2200;
const PULSE_MAX_RADIUS = 34;

/**
 * Decorative canvas field of drifting, twinkling nodes connected by faint
 * lines when close — a starfield ("el universo") that reads as a network /
 * correlation graph once a few nodes link up. Purely decorative, sits
 * behind the page content. Ported from divisioncero.com's home hero.
 */
export function HeroUniverse({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let lastPulseAt = 0;
    let primaryColor = '77, 174, 132';

    const readPrimaryColor = () => {
      // Resolve the CSS variable (may be hsl()/oklch()/etc.) to rgb(...) via
      // a throwaway probe element, since the browser normalizes `color` to
      // rgb() in computed style regardless of the source color function.
      const probe = document.createElement('div');
      probe.style.color = 'var(--color-fd-primary)';
      probe.style.display = 'none';
      (container as HTMLElement).appendChild(probe);
      const resolved = getComputedStyle(probe).color;
      (container as HTMLElement).removeChild(probe);
      const match = resolved.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (match) primaryColor = `${match[1]}, ${match[2]}, ${match[3]}`;
    };

    const createParticles = () => {
      const count = Math.min(130, Math.max(45, Math.round((width * height) / 9000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 2 + 1,
        twinkleSpeed: Math.random() * 0.0015 + 0.0006,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = (container as HTMLElement).getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readPrimaryColor();
      createParticles();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.32;
            ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particles (twinkle)
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const twinkle = 0.6 + Math.sin(now * p.twinkleSpeed + p.twinklePhase) * 0.35;
        ctx.fillStyle = `rgba(${primaryColor}, ${Math.max(0.3, twinkle)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // investigation "detection" pulses
      if (now - lastPulseAt > PULSE_INTERVAL && particles.length) {
        const target = particles[Math.floor(Math.random() * particles.length)];
        pulses.push({ x: target.x, y: target.y, start: now });
        lastPulseAt = now;
      }

      pulses = pulses.filter((pulse) => now - pulse.start < PULSE_DURATION);
      for (const pulse of pulses) {
        const progress = (now - pulse.start) / PULSE_DURATION;
        const radius = progress * PULSE_MAX_RADIUS;
        const alpha = (1 - progress) * 0.35;
        ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    resize();

    const tick = (time: number) => {
      draw(time * 1000);
    };
    gsap.ticker.add(tick);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    // Theme toggles swap a class/attribute on <html>, which changes what
    // --color-fd-primary resolves to — re-read it whenever that happens so
    // the particles don't go (near-)invisible after a light/dark switch.
    const themeObserver = new MutationObserver(() => readPrimaryColor());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
