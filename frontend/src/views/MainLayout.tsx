import React, { useCallback, useEffect, useRef, useState } from 'react';
import IntroductionCard from '../components/cards/Introduction';
import TestCard from '../components/cards/TestCard';
import ProjectsCard from '../components/cards/Projects';
import ContactCard from '../components/cards/Contact';
import SkillsCard from '../components/cards/Skills';

const MainLayout: React.FC = () => {
  // Card index
  const [currentCard, setCurrentCard] = useState(0);
  const isTransitioning = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [IntroductionCard, SkillsCard, ProjectsCard, ContactCard];

  const latestCurrentCard = useRef(currentCard);
  useEffect(() => {
    latestCurrentCard.current = currentCard;
  }, [currentCard]);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isTransitioning.current) {
      return;
    }

    const activeCardRef = cardRefs.current[latestCurrentCard.current];
    if (!activeCardRef) {
      // CHANGE: If the element is genuinely missing when needed, this warning will now show.
      // This indicates a deeper hydration or rendering issue if it consistently appears.
      console.warn("handleScroll: Active card ref not found for index:", latestCurrentCard.current);
      return;
    }

    const viewport = activeCardRef.getBoundingClientRect();
    const transitionThreshold = window.innerHeight / 2;

    // Scroll Down
    if (viewport.top <= -transitionThreshold && latestCurrentCard.current < cards.length - 1) {
      isTransitioning.current = true;
      setCurrentCard((prev) => prev + 1);
      return;
    }

    // Scroll Up
    if (viewport.top >= transitionThreshold && latestCurrentCard.current > 0) {
      isTransitioning.current = true;
      setCurrentCard((prev) => prev - 1);
    }
  }, [cards.length]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const activeCardRef = cardRefs.current[currentCard];
    if (!activeCardRef) {
      // CHANGE: If the element is genuinely missing when needed, this warning will now show.
      console.warn("useEffect scrollIntoView: Active card ref not found for index:", currentCard);
      return;
    }

    // Unlock transitions after scrolling completes

    return () => clearTimeout(timeout);
  }, [currentCard]); // This effect re-runs when currentCard changes

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

  }, [handleScroll]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-hidden">
      {cards.map((CardComponent, index) => (
        <div
          key={index}
          ref={(el) => {
            // React calls this ref callback with 'null' when a component unmounts
            // or during StrictMode's double-render cleanup. This is normal behavior.
            cardRefs.current[index] = el;
          }}
          style={{
            height: '100vh', // Full viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardComponent />
        </div>
      ))}
    </div>
  );
};

export default MainLayout;
