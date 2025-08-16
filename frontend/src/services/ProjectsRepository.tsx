
export type ProjectData = {
    id: string;
    name: string;
    imageSrc: string; // cover image
    description: string; // HTML allowed (will be sanitized when rendered)
    href?: string; // external link
    images?: string[]; // OPTIONAL: gallery images; fallback to [imageSrc]
};

export const projects: ProjectData[] = [
    {
        id: 'p1',
        name: 'The Entity',
        imageSrc: '/images/TheEntity.png',
        description: ``,
        href: 'https://example.com/the-entity',
    },
    {
        id: 'p2',
        name: 'AI Notes',
        imageSrc: '/images/notes.jpg',
        images: ['/images/notes.jpg'],
        href: 'https://github.com/you/ai-notes',
        description: `
        <p>Semantic notes with vector search.</p>
        <ul>
          <li>Embeddings-powered similarity</li>
          <li>Fast search</li>
          <li>Clean UI</li>
        </ul>
      `,
    },
    {
        id: 'p3',
        name: 'Audio Playground',
        imageSrc: '/images/audio.jpg',
        images: ['/images/audio.jpg'],
        href: 'https://example.com/audio',
        description: `
        <p>WebAudio synth and loops.</p>
        <ul>
          <li>Step sequencer</li>
          <li>Drum machine</li>
          <li>Live effects</li>
        </ul>
      `,
    },
];
