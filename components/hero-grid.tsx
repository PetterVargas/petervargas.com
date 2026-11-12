'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Trace {
  // Celdas (columna, fila) de origen y destino.
  from: [number, number];
  to: [number, number];
  horizontalFirst: boolean;
  start: number;
}

interface Probe {
  col: number;
  row: number;
  start: number;
}

const CELL = 11;
const BRAND = '77, 174, 132';
const MAX_TRACES = 5;
const TRACE_INTERVAL = 700;
const TRACE_MS = 1500;
const HOLD_MS = 1100;
const FADE_MS = 800;
const PROBE_INTERVAL = 90;
const PROBE_MS = 900;

/**
 * Fondo decorativo de cuadrícula: celdas que se "revisan" al azar y trazas que
 * recorren la cuadrícula de una celda a otra hasta encontrar la correlación,
 * que se marca al llegar. Ocupa el viewport (pensado para `position: fixed`).
 * Con movimiento reducido se dibuja solo la cuadrícula estática. Portado del
 * hero de divisioncero.com.
 */
export function HeroGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let lineColor = '0, 0, 0';
    let traces: Trace[] = [];
    let probes: Probe[] = [];
    let lastTraceAt = -Infinity;
    let lastProbeAt = -Infinity;

    const readLineColor = () => {
      // Un elemento de prueba resuelve la variable CSS (hsl/oklch/...) a rgb().
      const probe = document.createElement('div');
      probe.style.color = 'var(--color-fd-foreground)';
      probe.style.display = 'none';
      container.appendChild(probe);
      const resolved = getComputedStyle(probe).color;
      container.removeChild(probe);
      const match = resolved.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (match) lineColor = `${match[1]}, ${match[2]}, ${match[3]}`;
    };

    const x = (col: number) => offsetX + col * CELL;
    const y = (row: number) => offsetY + row * CELL;
    const randInt = (max: number) => Math.floor(Math.random() * max);
    const clampCol = (col: number) => Math.min(cols - 1, Math.max(0, col));
    const clampRow = (row: number) => Math.min(rows - 1, Math.max(0, row));

    const drawGrid = () => {
      ctx.strokeStyle = `rgba(${lineColor}, 0.05)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        ctx.moveTo(Math.round(x(c)) + 0.5, 0);
        ctx.lineTo(Math.round(x(c)) + 0.5, height);
      }
      for (let r = 0; r <= rows; r++) {
        ctx.moveTo(0, Math.round(y(r)) + 0.5);
        ctx.lineTo(width, Math.round(y(r)) + 0.5);
      }
      ctx.stroke();
    };

    const fillCell = (col: number, row: number, alpha: number) => {
      ctx.fillStyle = `rgba(${BRAND}, ${alpha})`;
      ctx.fillRect(x(col) + 1, y(row) + 1, CELL - 1, CELL - 1);
    };

    const strokeCell = (col: number, row: number, alpha: number) => {
      ctx.strokeStyle = `rgba(${BRAND}, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x(col) + 0.5, y(row) + 0.5, CELL, CELL);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      // Centra la cuadrícula para que quede simétrica respecto al contenido.
      offsetX = ((width % CELL) - CELL) / 2;
      offsetY = ((height % CELL) - CELL) / 2;
      traces = [];
      probes = [];
      readLineColor();
      if (reduced) {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
      }
    };

    const spawnTrace = (now: number) => {
      // El origen se elige en la zona central (el borde lo oculta la máscara del hero).
      const from: [number, number] = [
        Math.floor(cols * 0.1) + randInt(Math.ceil(cols * 0.8)),
        Math.floor(rows * 0.1) + randInt(Math.ceil(rows * 0.8)),
      ];
      const dc = (randInt(16) + 10) * (Math.random() < 0.5 ? -1 : 1);
      const dr = (randInt(10) + 5) * (Math.random() < 0.5 ? -1 : 1);
      const to: [number, number] = [clampCol(from[0] + dc), clampRow(from[1] + dr)];
      if (to[0] === from[0] && to[1] === from[1]) return;
      traces.push({ from, to, horizontalFirst: Math.random() < 0.5, start: now });
    };

    // Punto del recorrido en forma de L (centro de celda a centro de celda) según el progreso 0..1.
    const pointAt = (trace: Trace, t: number) => {
      const ax = x(trace.from[0]) + CELL / 2;
      const ay = y(trace.from[1]) + CELL / 2;
      const bx = x(trace.to[0]) + CELL / 2;
      const by = y(trace.to[1]) + CELL / 2;
      const legA = trace.horizontalFirst ? Math.abs(bx - ax) : Math.abs(by - ay);
      const legB = trace.horizontalFirst ? Math.abs(by - ay) : Math.abs(bx - ax);
      const total = legA + legB || 1;
      const d = t * total;
      const corner = trace.horizontalFirst ? { x: bx, y: ay } : { x: ax, y: by };
      if (d <= legA) {
        const k = legA ? d / legA : 1;
        return { x: ax + (corner.x - ax) * k, y: ay + (corner.y - ay) * k, corner, passed: false };
      }
      const k = legB ? (d - legA) / legB : 1;
      return { x: corner.x + (bx - corner.x) * k, y: corner.y + (by - corner.y) * k, corner, passed: true };
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      // Celdas candidatas que se revisan brevemente.
      if (now - lastProbeAt > PROBE_INTERVAL) {
        probes.push({ col: randInt(cols), row: randInt(rows), start: now });
        lastProbeAt = now;
      }
      probes = probes.filter((p) => now - p.start < PROBE_MS);
      for (const p of probes) {
        const k = (now - p.start) / PROBE_MS;
        fillCell(p.col, p.row, Math.sin(k * Math.PI) * 0.12);
      }

      if (traces.length < MAX_TRACES && now - lastTraceAt > TRACE_INTERVAL) {
        spawnTrace(now);
        lastTraceAt = now;
      }

      traces = traces.filter((tr) => now - tr.start < TRACE_MS + HOLD_MS + FADE_MS);

      for (const trace of traces) {
        const travel = TRACE_MS;
        const hold = HOLD_MS;
        const elapsed = now - trace.start;
        const t = Math.min(1, elapsed / travel);
        const eased = 1 - Math.pow(1 - t, 3);
        const fade = elapsed > travel + hold ? 1 - (elapsed - travel - hold) / FADE_MS : 1;
        const head = pointAt(trace, eased);
        const ax = x(trace.from[0]) + CELL / 2;
        const ay = y(trace.from[1]) + CELL / 2;

        fillCell(trace.from[0], trace.from[1], 0.25 * fade);
        strokeCell(trace.from[0], trace.from[1], 0.5 * fade);

        ctx.strokeStyle = `rgba(${BRAND}, ${0.55 * fade})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        if (head.passed) ctx.lineTo(head.corner.x, head.corner.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
        ctx.setLineDash([]);

        if (t < 1) {
          ctx.fillStyle = `rgba(${BRAND}, 0.9)`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Correlación encontrada: la celda destino se marca y emite un pulso.
          const since = elapsed - travel;
          fillCell(trace.to[0], trace.to[1], 0.35 * fade);
          strokeCell(trace.to[0], trace.to[1], 0.8 * fade);
          const pulse = Math.min(1, since / 700);
          ctx.strokeStyle = `rgba(${BRAND}, ${(1 - pulse) * 0.5 * fade})`;
          ctx.lineWidth = 1;
          const grow = pulse * CELL * 2;
          ctx.strokeRect(x(trace.to[0]) - grow, y(trace.to[1]) - grow, CELL + grow * 2, CELL + grow * 2);
        }
      }
    };

    resize();

    const tick = (time: number) => draw(time * 1000);
    if (!reduced) gsap.ticker.add(tick);

    window.addEventListener('resize', resize);

    // Al cambiar de tema cambia el color de las líneas; se vuelve a leer.
    const themeObserver = new MutationObserver(() => {
      readLineColor();
      if (reduced) {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
