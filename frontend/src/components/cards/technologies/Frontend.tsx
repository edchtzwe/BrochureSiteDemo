import React from 'react';
import clsx from 'clsx';

type FrontendCardProps = {
  className?: string;
  title?: string;
};

type Section = {
  title: string;
  items: string[];
};

const styles = {
  root: 'min-h-[160px] flex flex-col',
  header: 'text-2xl font-bold',
  sub: 'mt-1 text-sm opacity-80',
  sections: 'mt-3 flex flex-col gap-3',
  section: 'flex flex-col gap-2',
  sectionTitle: 'text-sm font-semibold text-white/90',
  chipsWrap: 'flex flex-wrap gap-2',
  chip:
    'inline-flex items-center rounded-full border border-white/10 ' +
    'bg-white/5 px-3 py-1.5 text-sm text-white/90 ' +
    'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30',
};

const FrontendCard: React.FC<FrontendCardProps> = ({ className, title = 'Frontend' }) => {
  const sections: Section[] = [
    {
      title: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Vue', 'AngularJS', 'KnockoutJS', 'Svelte'],
    },
    {
      title: 'Languages',
      items: ['TypeScript', 'JavaScript'],
    },
    {
      title: 'Styling',
      items: ['CSS', 'Tailwind CSS'],
    },
    {
      title: 'State Management',
      items: ['Redux', 'Zustand', 'Pinia', 'Svelte store'],
    },
    {
      title: 'Build & Package',
      items: ['npm', 'Webpack', 'Vite'],
    },
    {
      title: 'Testing (E2E)',
      items: ['Selenium'],
    },
    {
      title: 'Rendering',
      items: ['SSR (Next.js)'],
    },
    {
      title: 'Networking',
      items: ['REST', 'Axios', 'fetch'],
    },
  ];

  return (
    <section className={clsx(styles.root, className)} aria-label={`${title} skills`}>
      <h3 className={styles.header}>{title}</h3>
      <p className={styles.sub}>Frontend technologies for SPAs, and MVCs.</p>

      <div className={styles.sections}>
        {sections.map((sec) => (
          <div key={sec.title} className={styles.section}>
            <h4 className={styles.sectionTitle}>{sec.title}</h4>
            <div className={styles.chipsWrap}>
              {sec.items.map((s) => (
                <span key={s} className={styles.chip} aria-label={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrontendCard;
