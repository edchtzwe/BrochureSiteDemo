import React, { useCallback, useMemo, useRef, useState } from 'react';
import Project, { ProjectData } from './Project';

type Direction = 'left' | 'right';

const containerCls =
  'w-full flex flex-col items-center gap-4';
const stageOuterCls =
  'relative w-full flex items-center justify-center';
const stageCls =
  'relative w-full max-w-[900px] px-4 sm:px-6 md:px-0'; // CHANGE: Simple centered stage with max width
const cardShellCls =
  // CHANGE: No absolute stacking; only fade/slide on the single active card for smoothness
  'transition-transform duration-300 ease-out';

const arrowBtnBase =
  'inline-flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/75 ' +
  'opacity-40 hover:opacity-90 p-3 focus:outline-none backdrop-blur pointer-events-auto';
const arrowOverlayCls =
  'pointer-events-none absolute inset-0 flex items-center justify-between'; // wrapper consumes clicks except buttons

// CHANGE: Single place to adjust how close arrows sit to the center
// HOW TO CONTROL: Increase padding to move arrows closer to center; decrease to move outward.
const arrowPadX = 'px-1 sm:px-1 md:px1'; // CHANGE: Adjust this to control arrow horizontal position

const bottomBarCls =
  'relative w-full max-w-[900px] mx-auto';
const barButtonCls =
  'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg ' +
  'bg-gray-800/70 text-gray-100 hover:bg-gray-800/90 transition-colors';
const dropdownCls =
  'absolute left-0 right-0 mt-2 max-h-64 overflow-auto rounded-lg bg-gray-900/90 ' +
  'backdrop-blur border border-gray-700 shadow-xl z-10';

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const ProjectsCard: React.FC = () => {
  const projects: ProjectData[] = useMemo(
    () => [
      {
        id: 'p1',
        name: 'The Entity',
        imageSrc: '/images/TheEntity.png',
        description: ``,
        href: 'https://example.com',
      },
      {
        id: 'p2',
        name: 'HIITer',
        imageSrc: '/images/HIITer.png',
        description: ``,
        href: 'https://example.com/',
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const len = projects.length;

  const go = useCallback(
    (dir: Direction) => setActive((i) => (dir === 'right' ? mod(i + 1, len) : mod(i - 1, len))),
    [len]
  );
  const gotoIndex = useCallback((idx: number) => setActive(mod(idx, len)), [len]);

  // CHANGE: Lightweight swipe (no listeners on window)
  const swipe = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, active: true };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!swipe.current.active) return;
    const dx = e.clientX - swipe.current.x;
    swipe.current.active = false;
    if (Math.abs(dx) > 40) {
      go(dx < 0 ? 'right' : 'left');
    }
  };

  const current = projects[active];

  return (
    <div className={containerCls}>
      {/* Stage */}
      <div className={stageOuterCls}>
        <div
          className={stageCls}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {/* CHANGE: Render only the active card to avoid layout/paint cost */}
          <div className={cardShellCls}>
            <Project {...current} isActive />
          </div>

          {/* Arrows overlay (closer to center via arrowPadX) */}
        </div>
      </div>

      {/* Bottom bar with dropdown */}
      <div className={bottomBarCls}>
        <button
          type="button"
          className={barButtonCls}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="truncate">{current?.name}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>

        {open && (
          <div className={dropdownCls}>
            <ul className="py-2">
              {projects.map((p, idx) => {
                const isCurrent = idx === active;
                const itemCls =
                  'w-full text-left px-4 py-2 hover:bg-gray-800/80 flex items-center gap-2 ' +
                  (isCurrent ? 'text-cyan-300' : 'text-gray-100');
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={itemCls}
                      onClick={() => {
                        gotoIndex(idx);
                        setOpen(false);
                      }}
                    >
                      {isCurrent && (
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                      <span className="truncate">{p.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsCard;
