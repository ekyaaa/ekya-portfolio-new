import { useRef } from 'react';
import illustrationImg from '../../../assets/images/illustration.png';
import './Character.css';

interface CharacterProps {
  className?: string;
}

export function Character({ className = '' }: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      data-character
      className={`character-wrapper ${className}`}
    >
      <div className="character-box" data-cursor-photo>
        <img
          src={illustrationImg}
          alt="Ekya Muhammad Illustration"
          className="character-img illustration"
          data-illustration
        />
      </div>
      <div className="character-caption" aria-hidden="true">
        <span className="doodle-arrow">↖</span> hover to see me :D
      </div>
    </div>
  );
}
