import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import {
  HERO_IMAGE,
  STEAK_MEAL_IMAGE,
  CHICKEN_MEAL_IMAGE,
  SALMON_BOWL_IMAGE,
  BREAKFAST_AVOCADO_TOAST,
  LUNCH_WAGYU_BURGER,
  DINNER_SHORT_RIB
} from '../data/mockMeals';

export const BackgroundFoodScroller: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const leftColumnImages = [
    { src: BREAKFAST_AVOCADO_TOAST, alt: 'Artisanal morning avocado toast' },
    { src: HERO_IMAGE, alt: 'Pan-seared wild salmon' },
    { src: STEAK_MEAL_IMAGE, alt: 'Grilled grass-fed filet mignon' },
    { src: CHICKEN_MEAL_IMAGE, alt: 'Sous-vide herb chicken' },
  ];

  const rightColumnImages = [
    { src: LUNCH_WAGYU_BURGER, alt: 'Wagyu truffle smash burger' },
    { src: DINNER_SHORT_RIB, alt: '12-hour braised beef short rib' },
    { src: SALMON_BOWL_IMAGE, alt: 'Teriyaki salmon wellness bowl' },
    { src: HERO_IMAGE, alt: 'Wild king salmon entrée' },
  ];

  // Duplicate vertically for seamless up-and-down infinite loop
  const leftLoop = [...leftColumnImages, ...leftColumnImages];
  const rightLoop = [...rightColumnImages, ...rightColumnImages];

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Left Vertical Column - Gliding smoothly upward */}
        <div
          className="absolute top-0 left-3 sm:left-6 w-56 sm:w-64 opacity-[0.08] dark:opacity-[0.06] flex flex-col gap-6"
          style={{
            animation: 'smoothFloatVertical 65s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {leftLoop.map((img, idx) => (
            <div key={`left-${idx}`} className="w-full h-44 shrink-0 rounded-2xl overflow-hidden shadow-xl filter saturate-120">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Right Vertical Column - Gliding smoothly downward */}
        <div
          className="hidden md:flex absolute top-0 right-4 lg:right-8 w-60 lg:w-72 opacity-[0.08] dark:opacity-[0.06] flex-col gap-6"
          style={{
            animation: 'smoothFloatVertical 75s linear infinite reverse',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {rightLoop.map((img, idx) => (
            <div key={`right-${idx}`} className="w-full h-48 shrink-0 rounded-2xl overflow-hidden shadow-xl filter saturate-120">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Ambient gradient meshes contained strictly within viewport */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-400/10 dark:bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      {/* Accessible Control button on bottom-left (above main z-10 layer so clicks always register) */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-pressed={isPaused}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-stone-600 dark:text-stone-300 bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-stone-200/70 dark:border-stone-700/70 rounded-full hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
          title={isPaused ? 'Resume ambient background motion' : 'Pause ambient background motion'}
        >
          {isPaused ? <Play className="w-3 h-3 text-amber-600 dark:text-amber-400" /> : <Pause className="w-3 h-3" />}
          <span>{isPaused ? 'Resume Background' : 'Pause Background'}</span>
        </button>
      </div>
    </>
  );
};
