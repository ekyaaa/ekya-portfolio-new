import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { usePointerType } from '../../../hooks/usePointerType';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import myPhotoImg from '../../../assets/images/my-photo.png';
import './CustomCursor.css';

interface TargetRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// 60fps Procedural Organic Amoeba Path Generator (300x300 space with anti-crop buffer)
function generateAmoebaPath(time: number): string {
  const numPoints = 8;
  const centerX = 150;
  const centerY = 150;
  const baseRadius = 88;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const r =
      baseRadius +
      14 * Math.sin(2 * angle + time * 0.0018) +
      10 * Math.cos(3 * angle - time * 0.0014) +
      8 * Math.sin(5 * angle + time * 0.0022);

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    points.push({ x, y });
  }

  let path = `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
  for (let i = 0; i < numPoints; i++) {
    const p0 = points[(i - 1 + numPoints) % numPoints];
    const p1 = points[i];
    const p2 = points[(i + 1) % numPoints];
    const p3 = points[(i + 2) % numPoints];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  path += ' Z';
  return path;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);

  const [label, setLabel] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [photoLens, setPhotoLens] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [targetRect, setTargetRect] = useState<TargetRect>({ left: 0, top: 0, width: 0, height: 0 });

  const { isFinePointer, isTouch } = usePointerType();
  const prefersReducedMotion = useReducedMotion();

  // 60fps RequestAnimationFrame Loop for Continuous Procedural Organic Amoeba Morphing
  useEffect(() => {
    let animId: number;

    const animate = (time: number) => {
      const pathStr = generateAmoebaPath(time);
      if (clipPathRef.current) {
        clipPathRef.current.setAttribute('d', pathStr);
      }
      if (strokePathRef.current) {
        strokePathRef.current.setAttribute('d', pathStr);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (!isFinePointer || isTouch || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (!active) setActive(true);

      const photoTarget = (e.target as HTMLElement).closest('[data-cursor-photo]');
      if (photoTarget) {
        const rect = photoTarget.getBoundingClientRect();
        setTargetRect({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
        if (!photoLens) setPhotoLens(true);
      } else {
        if (photoLens) setPhotoLens(false);
      }
    };

    const handleMouseLeave = () => {
      setActive(false);
      setPhotoLens(false);
    };

    const handleOver = (e: MouseEvent) => {
      const photoTarget = (e.target as HTMLElement).closest('[data-cursor-photo]');
      if (photoTarget) {
        setLabel('');
        return;
      }

      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const cursorAttr = target.getAttribute('data-cursor');
        setLabel(cursorAttr || '');
      } else {
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [isFinePointer, isTouch, prefersReducedMotion, active, photoLens]);

  if (!isFinePointer || isTouch || prefersReducedMotion) {
    return null;
  }

  const initialPath = generateAmoebaPath(0);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${active ? 'is-active' : ''} ${label ? 'has-label' : ''} ${
        photoLens ? 'is-photo-lens' : ''
      }`}
      aria-hidden="true"
    >
      {/* Dynamic 60fps SVG ClipPath Definition */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="doodle-messy-clip" clipPathUnits="userSpaceOnUse">
            <path ref={clipPathRef} d={initialPath} />
          </clipPath>
        </defs>
      </svg>

      {/* Unified Morphing Cursor Pill (Circle -> Text Badge) */}
      <div className="cursor-pill">
        <span className="cursor-label">{label}</span>
      </div>

      {/* Permanent Organic Lens Container (Elastic Pop Morphing) */}
      <div className="cursor-organic-lens">
        {/* Hand-Drawn Offset Doodle Stroke Line Overlay */}
        <svg
          className="lens-doodle-stroke"
          viewBox="0 0 300 300"
          width="300"
          height="300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={strokePathRef}
            d={initialPath}
            stroke="#3D4769"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Clipped Organic Photo Viewport */}
        <div className="lens-mask">
          <img
            src={myPhotoImg}
            alt="Ekya Muhammad"
            className="lens-photo"
            style={{
              width: `${targetRect.width}px`,
              height: `${targetRect.height}px`,
              transform: `translate(${targetRect.left - cursorPos.x + 150}px, ${
                targetRect.top - cursorPos.y + 150
              }px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
