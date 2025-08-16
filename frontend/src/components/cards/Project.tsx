import React from 'react';
import Image from 'next/image';

export type ProjectData = {
  id: string;
  name: string;
  imageSrc: string; // e.g. '/images/TheEntity.png'
  description: string;
  href?: string;
};

interface ProjectProps extends ProjectData {
  isActive: boolean;
}

const containerCls =
  'flex flex-col w-full rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur ring-0';
const containerActiveRing = 'ring-2 ring-cyan-400'; // CHANGE: Active ring kept simple and cheap
const imageWrapperCls =
  // CHANGE: Explicit heights make the image visible regardless of parent sizing
  'relative w-full h-56 sm:h-72 md:h-80 bg-black/50';
const imgCls = 'object-cover';
const footerCls =
  'flex flex-col gap-1 p-4 bg-gray-900/80 text-gray-100';
const titleCls = 'text-base sm:text-lg md:text-xl font-semibold';
const descCls = 'text-xs sm:text-sm text-gray-300';

const Project: React.FC<ProjectProps> = ({ name, imageSrc, description, href, isActive }) => {
  const content = (
    <div className={`${containerCls} ${isActive ? containerActiveRing : ''}`} aria-current={isActive}>
      <div className={imageWrapperCls}>
        {/* CHANGE: next/image with fill + explicit wrapper height ensures image renders */}
        <Image
          src={imageSrc}
          alt={name}
          fill
          className={imgCls}
          sizes="(max-width: 768px) 92vw, 900px"
          priority={isActive} // CHANGE: prioritize only active card
        />
      </div>
      <div className={footerCls}>
        <h3 className={titleCls}>{name}</h3>
        <p className={descCls}><span dangerouslySetInnerHTML={{ __html: description }} /></p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
};

export default React.memo(Project); // CHANGE: Memo to reduce re-renders
