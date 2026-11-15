import { useEffect, useRef } from "react";

const RADIUS = 190; // reach of cursor threads
const LINK = 120; // node-to-node web distance

/** Full-screen canvas: drifting specks that get spun into a web around the cursor,
 *  a spider that follows the pointer, and a radial web spawned on every click. */
export default function SpiderWeb() {
  const canvasRef = useRef(null);
  const spiderRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spider = spiderRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W, H, raf;
    let nodes = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const sp = { x: -100, y: -100, angle: 0 };
    const webs = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth;
      H = innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((W * H) / (reduced ? 26000 : 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const move = (x, y) => Object.assign(mouse, { x, y, active: true });
    const onMouse = (e) => move(e.clientX, e.clientY);
    const onTouch = (e) => move(e.touches[0].clientX, e.touches[0].clientY);
    const onOut = (e) => { if (!e.relatedTarget) mouse.active = false; };
    const onOver = (e) => spider.classList.toggle("hover", !!e.target.closest("a, button"));
    const onDown = (e) => {
      const spokes = 10 + Math.floor(Math.random() * 4);
      const offs = Array.from({ length: spokes }, (_, i) => (i / spokes) * Math.PI * 2 + (Math.random() - 0.5) * 0.25);
      webs.push({ x: e.clientX, y: e.clientY, offs, lens: offs.map(() => 70 + Math.random() * 40), t: 0 });
      if (webs.length > 6) webs.shift();
    };

    const drawWeb = (w) => {
      w.t += 1 / 60;
      const grow = Math.min(w.t / 0.45, 1);
      const alpha = w.t < 1.4 ? 1 : Math.max(0, 1 - (w.t - 1.4) / 1.2);
      if (alpha <= 0) return false;
      ctx.strokeStyle = `rgba(228,218,203,${0.55 * alpha})`;
      ctx.lineWidth = 0.7;
      const pts = w.offs.map((a, i) => [Math.cos(a), Math.sin(a), w.lens[i] * grow]);
      ctx.beginPath();
      for (const [cx, cy, l] of pts) {
        ctx.moveTo(w.x, w.y);
        ctx.lineTo(w.x + cx * l, w.y + cy * l);
      }
      ctx.stroke();
      const rings = 7;
      for (let k = 1; k <= rings && k / rings <= grow; k++) {
        const f = k / rings;
        ctx.beginPath();
        pts.forEach(([cx, cy, l], i) => {
          const [nx, ny, nl] = pts[(i + 1) % pts.length];
          const ax = w.x + cx * l * f, ay = w.y + cy * l * f;
          const bx = w.x + nx * nl * f, by = w.y + ny * nl * f;
          const qx = w.x + ((ax + bx) / 2 - w.x) * 0.82; // sag toward centre
          const qy = w.y + ((ay + by) / 2 - w.y) * 0.82;
          if (i === 0) ctx.moveTo(ax, ay);
          ctx.quadraticCurveTo(qx, qy, bx, by);
        });
        ctx.stroke();
      }
      return true;
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const near = [];

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
        let d = Infinity;
        if (mouse.active) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y;
          d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            n.x += dx * 0.006;
            n.y += dy * 0.006;
            near.push({ n, d });
          }
        }
        const lit = d < RADIUS ? 1 - d / RADIUS : 0;
        ctx.fillStyle = `rgba(${200 + 28 * lit},${60 + 150 * (1 - lit)},${70 + 130 * (1 - lit)},${0.25 + lit * 0.7})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + lit * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active && near.length) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i].n, b = near[j].n;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK) {
              const fade = (1 - d / LINK) * (1 - Math.max(near[i].d, near[j].d) / RADIUS);
              ctx.strokeStyle = `rgba(228,218,203,${fade * 0.55})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.lineWidth = 0.8;
        for (const { n, d } of near) {
          ctx.strokeStyle = `rgba(196,24,45,${(1 - d / RADIUS) * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      for (let i = webs.length - 1; i >= 0; i--) if (!drawWeb(webs[i])) webs.splice(i, 1);

      const dx = mouse.x - sp.x, dy = mouse.y - sp.y;
      sp.x += dx * 0.28;
      sp.y += dy * 0.28;
      if (Math.hypot(dx, dy) > 1.5) {
        const diff = Math.atan2(dy, dx) + Math.PI / 2 - sp.angle;
        sp.angle += Math.atan2(Math.sin(diff), Math.cos(diff)) * 0.2;
      }
      spider.style.transform = `translate(${sp.x - 17}px, ${sp.y - 17}px) rotate(${sp.angle}rad)`;
      spider.style.opacity = mouse.active ? 1 : 0;

      raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    addEventListener("resize", resize);
    addEventListener("mousemove", onMouse);
    addEventListener("touchmove", onTouch, { passive: true });
    addEventListener("pointerdown", onDown);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMouse);
      removeEventListener("touchmove", onTouch);
      removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <canvas id="web" ref={canvasRef} aria-hidden="true" />
      <div id="spider" ref={spiderRef} aria-hidden="true">
        <svg viewBox="0 0 64 64" width="34" height="34">
          <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M26 28 L14 18 L6 22" /><path d="M25 32 L10 30 L3 36" />
            <path d="M26 36 L13 42 L8 52" /><path d="M28 39 L20 50 L19 60" />
            <path d="M38 28 L50 18 L58 22" /><path d="M39 32 L54 30 L61 36" />
            <path d="M38 36 L51 42 L56 52" /><path d="M36 39 L44 50 L45 60" />
          </g>
          <ellipse cx="32" cy="36" rx="8" ry="10" fill="currentColor" />
          <circle cx="32" cy="24" r="5.5" fill="currentColor" />
          <circle cx="30" cy="23" r="1.1" fill="#ff2a3d" />
          <circle cx="34" cy="23" r="1.1" fill="#ff2a3d" />
          <path d="M29 34 L32 38 L35 34 L32 42 Z" fill="#8b0a1a" />
        </svg>
      </div>
    </>
  );
}
