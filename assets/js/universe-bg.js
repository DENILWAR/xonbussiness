/* ================================================
   UNIVERSE BACKGROUND
   Animated deep-space canvas for personal/philosophy sections
   (About Me, Engineering philosophy). Stars, nebulae, a distant
   galaxy and occasional meteors, with subtle scroll parallax.
   Respects prefers-reduced-motion and dark/light theme.
   ================================================ */
(function () {
    'use strict';

    const SCENE_DURATION = 90000;   // ms per "region of space" before crossfading to the next
    const SCENE_BLEND = 6000;       // ms spent crossfading between scenes
    const STAR_DENSITY = 0.00014;   // stars per px^2 of canvas
    const MAX_STARS_PER_LAYER = 90;
    const METEOR_MIN_DELAY = 5000;
    const METEOR_MAX_DELAY = 15000;
    const DPR_CAP = 2;

    const PALETTES = {
        dark: {
            star: ['255,255,255', '191,219,254', '216,199,255'],
            nebula: [[47, 60, 158], [88, 47, 145], [126, 32, 92]],
            galaxy: '255,244,222',
            meteor: '255,255,255'
        },
        light: {
            star: ['70,70,85', '90,95,120', '110,100,125'],
            nebula: [[176, 180, 200], [188, 178, 196], [170, 176, 190]],
            galaxy: '120,118,132',
            meteor: '90,90,100'
        }
    };

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function currentTheme() {
        const attr = document.documentElement.getAttribute('data-theme');
        if (attr === 'dark' || attr === 'light') return attr;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    function debounce(fn, wait) {
        let t;
        return function () {
            clearTimeout(t);
            const args = arguments;
            t = setTimeout(() => fn.apply(null, args), wait);
        };
    }

    class StarLayer {
        constructor(count, depthFactor, sizeRange, twinkleRange) {
            this.depthFactor = depthFactor;
            this.stars = [];
            for (let i = 0; i < count; i++) {
                this.stars.push({
                    x: Math.random(),
                    y: Math.random(),
                    r: rand(sizeRange[0], sizeRange[1]),
                    baseAlpha: rand(0.35, 0.9),
                    phase: rand(0, Math.PI * 2),
                    speed: rand(twinkleRange[0], twinkleRange[1]),
                    colorIndex: Math.floor(rand(0, 3))
                });
            }
        }
    }

    function buildNebulaScene(w, h) {
        const blobs = [];
        const count = 3 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            blobs.push({
                x: rand(0.05, 0.95) * w,
                y: rand(0.05, 0.95) * h,
                r: rand(Math.min(w, h) * 0.25, Math.min(w, h) * 0.55),
                colorIndex: i % 3
            });
        }
        return blobs;
    }

    class UniverseBackground {
        constructor(section) {
            this.section = section;
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'universe-bg-canvas';
            this.canvas.setAttribute('aria-hidden', 'true');
            section.insertBefore(this.canvas, section.firstChild);
            this.ctx = this.canvas.getContext('2d');

            this.reducedMotion = prefersReducedMotion();
            this.visible = true;
            this.running = false;
            this.dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

            this.galaxyAngle = rand(0, Math.PI * 2);
            this.galaxyAnchor = { x: rand(0.7, 0.92), y: rand(0.08, 0.28) };

            this.meteor = null;
            this.nextMeteorAt = performance.now() + rand(METEOR_MIN_DELAY, METEOR_MAX_DELAY);
            this.sceneStart = performance.now();
            this.driftY = 0;

            this._resize = debounce(this.resize.bind(this), 200);
            this._onScroll = this.onScroll.bind(this);
            this._frame = this.frame.bind(this);

            this.resize();
            window.addEventListener('resize', this._resize);
            window.addEventListener('scroll', this._onScroll, { passive: true });

            const themeObserver = new MutationObserver(() => {});
            themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

            const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            const onReduceChange = () => {
                this.reducedMotion = reduceQuery.matches;
                if (this.reducedMotion) {
                    this.stop();
                    this.drawFrame(performance.now(), true);
                } else {
                    this.start();
                }
            };
            if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', onReduceChange);

            if ('IntersectionObserver' in window) {
                this.io = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        this.visible = entry.isIntersecting;
                        if (this.visible) this.start(); else this.stop();
                    });
                }, { threshold: 0 });
                this.io.observe(this.canvas);
            }

            if (this.reducedMotion) {
                this.drawFrame(performance.now(), true);
            } else {
                this.start();
            }
        }

        resize() {
            const rect = this.section.getBoundingClientRect();
            const w = Math.max(this.section.clientWidth, 1);
            const h = Math.max(this.section.offsetHeight, 1);
            this.width = w;
            this.height = h;
            this.canvas.width = Math.floor(w * this.dpr);
            this.canvas.height = Math.floor(h * this.dpr);
            this.canvas.style.width = w + 'px';
            this.canvas.style.height = h + 'px';
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

            const area = w * h;
            const total = Math.min(Math.round(area * STAR_DENSITY), MAX_STARS_PER_LAYER * 3);
            const far = Math.round(total * 0.5);
            const mid = Math.round(total * 0.32);
            const near = Math.max(total - far - mid, 6);

            this.layers = [
                new StarLayer(Math.min(far, MAX_STARS_PER_LAYER), 0.15, [0.4, 1.0], [0.0006, 0.0012]),
                new StarLayer(Math.min(mid, MAX_STARS_PER_LAYER), 0.35, [0.7, 1.5], [0.001, 0.0018]),
                new StarLayer(Math.min(near, MAX_STARS_PER_LAYER), 0.6, [1.1, 2.2], [0.0014, 0.0024])
            ];

            this.sceneA = buildNebulaScene(w, h);
            this.sceneB = buildNebulaScene(w, h);
            this.sceneStart = performance.now();

            if (this.reducedMotion) this.drawFrame(performance.now(), true);
        }

        onScroll() {
            this.scrollLocal = -this.section.getBoundingClientRect().top;
        }

        start() {
            if (this.running || this.reducedMotion) return;
            this.running = true;
            requestAnimationFrame(this._frame);
        }

        stop() {
            this.running = false;
        }

        frame(now) {
            if (!this.running) return;
            this.drawFrame(now, false);
            requestAnimationFrame(this._frame);
        }

        drawFrame(now, staticFrame) {
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;
            const palette = PALETTES[currentTheme()];
            ctx.clearRect(0, 0, w, h);

            if (!staticFrame) {
                this.driftY += 0.0025 * 16.7; // ~ px per frame at 60fps, very slow
            }

            // Nebulae — crossfade between two generated scenes
            const elapsed = now - this.sceneStart;
            let blendProgress = 0;
            if (elapsed > SCENE_DURATION - SCENE_BLEND) {
                blendProgress = Math.min((elapsed - (SCENE_DURATION - SCENE_BLEND)) / SCENE_BLEND, 1);
            }
            if (elapsed > SCENE_DURATION) {
                this.sceneA = this.sceneB;
                this.sceneB = buildNebulaScene(w, h);
                this.sceneStart = now;
                blendProgress = 0;
            }

            this.drawNebulaScene(this.sceneA, 1 - blendProgress, palette);
            this.drawNebulaScene(this.sceneB, blendProgress, palette);

            // Distant galaxy
            if (!staticFrame) this.galaxyAngle += 0.00002 * 16.7;
            this.drawGalaxy(palette);

            // Stars with parallax + slow drift, wrapped vertically
            const scrollLocal = staticFrame ? 0 : (this.scrollLocal || 0);
            this.layers.forEach((layer) => {
                const offset = (this.driftY * layer.depthFactor * 0.02) + (scrollLocal * layer.depthFactor * 0.06);
                layer.stars.forEach((star) => {
                    let y = ((star.y * h + offset) % h + h) % h;
                    const x = star.x * w;
                    const twinkle = staticFrame ? 1 : (0.65 + 0.35 * Math.sin(now * star.speed + star.phase));
                    const alpha = Math.max(star.baseAlpha * twinkle, 0.08);
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(${palette.star[star.colorIndex]},${alpha})`;
                    ctx.arc(x, y, star.r, 0, Math.PI * 2);
                    ctx.fill();
                });
            });

            // Occasional meteor
            if (!staticFrame) this.updateMeteor(now, w, h, palette);
            if (this.meteor) this.drawMeteor(palette);
        }

        drawNebulaScene(blobs, alphaMul, palette) {
            if (alphaMul <= 0) return;
            const ctx = this.ctx;
            blobs.forEach((blob) => {
                const c = palette.nebula[blob.colorIndex];
                const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
                grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.16 * alphaMul})`);
                grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        drawGalaxy(palette) {
            const ctx = this.ctx;
            const cx = this.galaxyAnchor.x * this.width;
            const cy = this.galaxyAnchor.y * this.height;
            const baseR = Math.min(this.width, this.height) * 0.16;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(this.galaxyAngle);

            const core = ctx.createRadialGradient(0, 0, 0, 0, 0, baseR * 0.6);
            core.addColorStop(0, `rgba(${palette.galaxy},0.22)`);
            core.addColorStop(1, `rgba(${palette.galaxy},0)`);
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(0, 0, baseR * 0.6, 0, Math.PI * 2);
            ctx.fill();

            for (let i = 0; i < 2; i++) {
                ctx.save();
                ctx.rotate(i * Math.PI);
                ctx.scale(1, 0.38);
                const arm = ctx.createRadialGradient(0, 0, 0, 0, 0, baseR);
                arm.addColorStop(0, `rgba(${palette.galaxy},0.14)`);
                arm.addColorStop(1, `rgba(${palette.galaxy},0)`);
                ctx.fillStyle = arm;
                ctx.beginPath();
                ctx.ellipse(baseR * 0.35, 0, baseR, baseR * 0.55, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
        }

        updateMeteor(now, w, h) {
            if (!this.meteor && now >= this.nextMeteorAt) {
                const fromTop = Math.random() > 0.5;
                const startX = rand(0, w * 0.7);
                const startY = fromTop ? rand(-20, h * 0.15) : rand(0, h * 0.1);
                const angle = rand(Math.PI * 0.15, Math.PI * 0.3);
                const speed = rand(0.55, 0.9);
                this.meteor = {
                    x: startX,
                    y: startY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    trail: []
                };
            }
            if (this.meteor) {
                const m = this.meteor;
                m.x += m.vx * 16.7;
                m.y += m.vy * 16.7;
                m.trail.push({ x: m.x, y: m.y });
                if (m.trail.length > 14) m.trail.shift();
                m.life -= 0.012;
                if (m.life <= 0 || m.x > w + 40 || m.y > h + 40) {
                    this.meteor = null;
                    this.nextMeteorAt = now + rand(METEOR_MIN_DELAY, METEOR_MAX_DELAY);
                }
            }
        }

        drawMeteor(palette) {
            const ctx = this.ctx;
            const m = this.meteor;
            if (!m || m.trail.length < 2) return;
            ctx.save();
            ctx.strokeStyle = `rgba(${palette.meteor},${0.55 * m.life})`;
            ctx.lineWidth = 1.4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            m.trail.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();

            const head = m.trail[m.trail.length - 1];
            ctx.beginPath();
            ctx.fillStyle = `rgba(${palette.meteor},${0.9 * m.life})`;
            ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        document.querySelectorAll('.universe-section').forEach((section) => {
            new UniverseBackground(section);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
