import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from '../../../animations/gsap';
import { usePointerType } from '../../../hooks/usePointerType';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import illustrationImg from '../../../assets/images/illustration.png';
import myPhotoImg from '../../../assets/images/my-photo.png';
import './Character.css';

interface CharacterProps {
  className?: string;
}

interface MobileAmoebaState {
  visible: boolean;
  x: number;
  y: number;
  boxWidth: number;
  boxHeight: number;
}

// 60fps Procedural Organic Amoeba Path Generator (300x300 space)
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

export function Character({ className = '' }: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchTime = useRef<number>(0);

  const { isTouch } = usePointerType();
  const prefersReducedMotion = useReducedMotion();

  const [amoeba, setAmoeba] = useState<MobileAmoebaState>({
    visible: false,
    x: 0,
    y: 0,
    boxWidth: 0,
    boxHeight: 0,
  });

  // Procedural 60fps Amoeba morphing loop active only when mobile amoeba is visible
  useEffect(() => {
    if (!amoeba.visible) return;

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
  }, [amoeba.visible]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const triggerAmoebaAt = useCallback(
    (clientX: number, clientY: number) => {
      const box = boxRef.current;
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      setAmoeba({
        visible: true,
        x,
        y,
        boxWidth: rect.width,
        boxHeight: rect.height,
      });

      // Smooth elastic pop-in animation
      requestAnimationFrame(() => {
        if (lensRef.current && !prefersReducedMotion) {
          gsap.killTweensOf(lensRef.current);
          gsap.fromTo(
            lensRef.current,
            { scale: 0.45, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
          );
        }
      });

      // Hold for 3 seconds then fade/scale out
      hideTimerRef.current = setTimeout(() => {
        if (lensRef.current && !prefersReducedMotion) {
          gsap.to(lensRef.current, {
            scale: 0.2,
            opacity: 0,
            duration: 0.32,
            ease: 'power2.in',
            onComplete: () => {
              setAmoeba((prev) => ({ ...prev, visible: false }));
            },
          });
        } else {
          setAmoeba((prev) => ({ ...prev, visible: false }));
        }
      }, 3000);
    },
    [prefersReducedMotion]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      lastTouchTime.current = Date.now();
      const touch = e.touches[0];
      triggerAmoebaAt(touch.clientX, touch.clientY);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only fire click if not preceded by a touch event within 500ms
    if (Date.now() - lastTouchTime.current < 500) return;
    if (isTouch) {
      triggerAmoebaAt(e.clientX, e.clientY);
    }
  };

  const handleCaptionClick = () => {
    if (!isTouch) return;
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    triggerAmoebaAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const initialPath = generateAmoebaPath(0);

  return (
    <div
      ref={containerRef}
      data-character
      className={`character-wrapper ${className}`}
    >
      {/* SVG ClipPath Definition for Mobile Amoeba */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="mobile-character-amoeba-clip" clipPathUnits="userSpaceOnUse">
            <path ref={clipPathRef} d={initialPath} />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={boxRef}
        className="character-box"
        data-cursor-photo
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        <img
          src={illustrationImg}
          alt="Ekya Muhammad Illustration"
          className="character-img illustration"
          data-illustration
        />

        {/* Mobile Persistent Amoeba Lens on Tap */}
        {amoeba.visible && (
          <div
            ref={lensRef}
            className="mobile-character-lens"
            style={{
              left: `${amoeba.x}px`,
              top: `${amoeba.y}px`,
            }}
          >
            {/* Hand-Drawn Offset Doodle Stroke Line Overlay */}
            <svg
              className="mobile-lens-stroke"
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
            <div className="mobile-lens-mask">
              <img
                src={myPhotoImg}
                alt="Ekya Muhammad"
                className="mobile-lens-photo"
                style={{
                  width: `${amoeba.boxWidth}px`,
                  height: `${amoeba.boxHeight}px`,
                  transform: `translate(${-amoeba.x + 150}px, ${-amoeba.y + 150}px)`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="character-caption"
        aria-hidden="true"
        onClick={handleCaptionClick}
        style={{ cursor: isTouch ? 'pointer' : 'default' }}
      >
        <span className="doodle-arrow">↖</span>{' '}
        {isTouch ? 'tap to see me :D' : 'hover to see me :D'}
      </div>
    </div>
  );
}
