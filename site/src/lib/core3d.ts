// Three.js hero core. Loaded on demand by Core3D.astro, never on first paint.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, CylinderGeometry,
  MeshStandardMaterial, CanvasTexture, AmbientLight, DirectionalLight,
  SRGBColorSpace, RepeatWrapping, Color,
} from "three";
import { intervals } from "../content/content";
import { TOTAL_DEPTH, ROCK, BREAKS } from "./core";

// Small deterministic PRNG so the stone looks the same on every visit.
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Unrolled core surface: x = around the circumference, y = along the hole. */
function makeTextures() {
  const W = 512, H = 2048;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const b = document.createElement("canvas");
  b.width = W; b.height = H;
  const gb = b.getContext("2d")!;
  gb.fillStyle = "#808080"; gb.fillRect(0, 0, W, H);
  const rand = rng(7);
  const y = (m: number) => (m / TOTAL_DEPTH) * H;

  g.fillStyle = ROCK[intervals[0].accent];
  g.fillRect(0, 0, W, H);
  for (const iv of intervals.slice(1)) {
    // A contact between two rock units is a plane; on the unrolled core it's a sine.
    const amp = 10 + rand() * 30, phase = rand() * Math.PI * 2;
    g.fillStyle = ROCK[iv.accent];
    g.beginPath();
    g.moveTo(0, H);
    for (let px = 0; px <= W; px += 4) g.lineTo(px, y(iv.from) + amp * Math.sin((px / W) * Math.PI * 2 + phase));
    g.lineTo(W, H);
    g.closePath();
    g.fill();
  }
  // Grain: thousands of small light/dark specks, also written to the bump map.
  for (let i = 0; i < 26000; i++) {
    const px = rand() * W, py = rand() * H, s = rand() * 2.2 + 0.4;
    const light = rand() > 0.5;
    const a = rand() * 0.22;
    g.fillStyle = light ? `rgba(255,250,240,${a})` : `rgba(10,10,10,${a})`;
    g.fillRect(px, py, s, s);
    gb.fillStyle = light ? `rgba(255,255,255,${a * 2})` : `rgba(0,0,0,${a * 2})`;
    gb.fillRect(px, py, s, s);
  }
  // Veins: a plane cutting a cylinder unrolls to a sine wave.
  for (let k = 0; k < 7; k++) {
    const y0 = rand() * H, amp = 8 + rand() * 35, phase = rand() * Math.PI * 2;
    const w = 1 + rand() * 2.5;
    for (const [ctx, col] of [[g, "rgba(239,233,220,0.55)"], [gb, "rgba(255,255,255,0.9)"]] as const) {
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
      for (let px = 0; px <= W; px += 4) {
        const py = y0 + amp * Math.sin((px / W) * Math.PI * 2 + phase);
        px ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke();
    }
  }
  const map = new CanvasTexture(c);
  map.colorSpace = SRGBColorSpace;
  map.wrapS = RepeatWrapping;
  map.anisotropy = 4;
  const bump = new CanvasTexture(b);
  bump.wrapS = RepeatWrapping;
  return { map, bump };
}

export function mountCore(root: HTMLElement) {
  const canvas = root.querySelector("canvas")!;
  const svg = root.querySelector("svg");
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(22, 4, 0.1, 100);
  camera.position.set(0, 0.6, 14);
  camera.lookAt(0, 0, 0);

  scene.add(new AmbientLight(new Color("#fff6ea"), 1.1));
  const key = new DirectionalLight(new Color("#fff3e0"), 2.6);
  key.position.set(-4, 6, 6);
  scene.add(key);
  const rim = new DirectionalLight(new Color("#cfdbe6"), 0.9);
  rim.position.set(5, -2, -4);
  scene.add(rim);

  const { map, bump } = makeTextures();
  const LEN = 10.5, RADIUS = 0.62, GAP = 0.07;
  const outer = new Group();
  outer.rotation.z = Math.PI / 2; // lie the core down, like in a core tray
  outer.rotation.x = 0.18;        // slight tilt toward the viewer
  const spin = new Group();
  outer.add(spin);

  const cuts = [0, ...BREAKS, TOTAL_DEPTH];
  for (let i = 0; i < cuts.length - 1; i++) {
    const a = cuts[i] / TOTAL_DEPTH, b = cuts[i + 1] / TOTAL_DEPTH;
    const h = (b - a) * LEN - GAP;
    const geo = new CylinderGeometry(RADIUS, RADIUS, h, 64, 1);
    // Remap V so each piece shows its own slice of the hole.
    const uv = geo.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setY(k, a + (1 - uv.getY(k)) * (b - a));
    uv.needsUpdate = true;
    const m = map.clone(); m.flipY = false; m.needsUpdate = true;
    const bm = bump.clone(); bm.flipY = false; bm.needsUpdate = true;
    const mat = new MeshStandardMaterial({ map: m, bumpMap: bm, bumpScale: 1.4, roughness: 0.82, metalness: 0 });
    const mesh = new Mesh(geo, mat);
    // Depth 0 at the left: cylinder +y points left after the z-rotation.
    mesh.position.y = LEN / 2 - (a + b) / 2 * LEN;
    mesh.rotation.y = i * 1.3; // pieces don't line up perfectly, like real core
    spin.add(mesh);
  }
  scene.add(outer);

  const resize = () => {
    const w = root.clientWidth, h = root.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit the whole core in width on any aspect ratio.
    const vFov = (camera.fov * Math.PI) / 180;
    const fitW = (LEN * 1.08) / 2 / Math.tan(vFov / 2) / camera.aspect;
    camera.position.z = Math.max(fitW, 7);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(root);
  resize();

  let visible = true, last = performance.now(), raf = 0;
  const frame = (t: number) => {
    const dt = Math.min((t - last) / 1000, 0.1);
    last = t;
    spin.rotation.y += dt * 0.18; // slow: one turn every ~35 s
    renderer.render(scene, camera);
    raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(root);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && visible) start(); });
  // If the user switches on reduced motion mid-visit, go back to the static core.
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
    if (e.matches) { visible = false; canvas.style.opacity = "0"; if (svg) svg.style.opacity = "1"; }
  });

  renderer.render(scene, camera);
  canvas.style.opacity = "1";
  if (svg) svg.style.opacity = "0";
  start();
}
