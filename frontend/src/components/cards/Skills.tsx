import React from 'react';
import clsx from 'clsx';
import FrontendCard from './technologies/Frontend';
import BackendCard from './technologies/Backend';
import DatabasesCard from './technologies/Databases';
import DevopsCard from './technologies/DevOps';
import SystemsCard from './technologies/Systems';
import TestingCard from './technologies/Testing';
import AILLMCard from './technologies/AILLM';

type SkillsCardProps = {
  initialIndex?: number;
  loop?: boolean;
  className?: string;
  slideClassName?: string;
};

const styles = {
  root:
    'relative w-full max-w-[640px] mx-auto p-4 rounded-xl ' +
    'bg-neutral-900/70 text-neutral-100 shadow-lg ring-1 ring-white/10',
  viewport: 'overflow-hidden rounded-lg',
  track: 'flex transition-transform duration-300 ease-out',
  slide: 'shrink-0 grow-0 basis-full p-4',
  nav: 'mt-3 flex items-center justify-center',
  dots: 'flex items-center gap-2',
  dotBtn: 'p-2 -m-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30',
  dot: 'block h-2 w-2 rounded-full',
  dotBg: 'bg-white/30',
  dotActive: 'bg-white',
  empty: 'p-6 text-center opacity-80',
};

const SkillsCard: React.FC<SkillsCardProps> = ({
  initialIndex = 0,
  loop = true,
  className,
  slideClassName,
}) => {
  const slides = React.useMemo(
    () => [<BackendCard key="backend" />,
    <FrontendCard key="frontend" />,
    <DevopsCard key="devops" />,
    <AILLMCard key="aillm" />,
    <TestingCard key="testing" />,
    <DatabasesCard key="databases" />,
    <SystemsCard key="systems" />
    ],
    []
  );

  const total = slides.length;
  const hasSlides = total > 0;

  const [index, setIndex] = React.useState(() => {
    if (!hasSlides) return 0;
    return Math.min(Math.max(initialIndex, 0), total - 1);
  });

  const next = React.useCallback(() => {
    if (!hasSlides) return;
    setIndex((i) => {
      if (i === total - 1) return loop ? 0 : i;
      return i + 1;
    });
  }, [hasSlides, total, loop]);

  const prev = React.useCallback(() => {
    if (!hasSlides) return;
    setIndex((i) => {
      if (i === 0) return loop ? total - 1 : 0;
      return i - 1;
    });
  }, [hasSlides, total, loop]);

  const goTo = React.useCallback(
    (i: number) => {
      if (!hasSlides) return;
      const clamped = Math.min(Math.max(i, 0), total - 1);
      setIndex(clamped);
    },
    [hasSlides, total]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  const TITLE = "Technologies";

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">{TITLE}</h2>
      <div
        className={clsx(styles.root, className)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Skills"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {hasSlides ? (
              slides.map((child, i) => (
                <div
                  key={i}
                  className={clsx(styles.slide, slideClassName)}
                  aria-hidden={i !== index}
                >
                  {child}
                </div>
              ))
            ) : (
              <div className={styles.empty}>No skills added yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsCard;
