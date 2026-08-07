'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Ported from divisioncero.com's home hero reveal. `motion-safe:opacity-0`
// on lines/items in the server-rendered markup hides them before this
// effect ever runs, so there's no flash of fully-visible content. Only
// opacity is set via CSS — position/scale is established below via
// gsap.set() instead, because Tailwind v4's translate utilities write the
// modern standalone `translate` CSS property, which GSAP's `y`/`yPercent`
// tweens don't read as their starting value.
export function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const badge = el.querySelector<HTMLElement>('[data-hero-badge]');
    const lines = el.querySelectorAll<HTMLElement>('[data-hero-line]');
    const items = el.querySelectorAll<HTMLElement>('[data-hero-item]');

    // Safety net: whatever the cause — a slow device, an exception mid-setup,
    // a platform quirk where CSS and JS disagree on prefers-reduced-motion —
    // the hero must never stay permanently invisible. Force the final,
    // fully-visible state if the entrance animation hasn't finished on its
    // own within a generous window.
    const revealNow = () => {
      const targets = [...Array.from(lines), ...Array.from(items), ...(badge ? [badge] : [])];
      gsap.set(targets, { opacity: 1, yPercent: 0, y: 0, rotate: 0, scale: 1 });
    };
    const safety = window.setTimeout(revealNow, 2500);

    if (prefersReducedMotion()) {
      window.clearTimeout(safety);
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => window.clearTimeout(safety),
        });

        tl.set(lines, { yPercent: 115, rotate: 1.5 })
          .set(items, { y: 26 });

        if (badge) {
          tl.set(badge, { scale: 0.8, y: -8 });
          tl.to(badge, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.4)' });
        }

        tl.to(
          lines,
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.14, ease: 'power4.out' },
          badge ? '-=0.2' : 0,
        );

        tl.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.14 }, '-=0.55');
      }, el);
    } catch {
      window.clearTimeout(safety);
      revealNow();
    }

    return () => {
      window.clearTimeout(safety);
      ctx?.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
