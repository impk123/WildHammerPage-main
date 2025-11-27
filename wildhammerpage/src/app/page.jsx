'use client';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import HeroSection from "../components/sections/HeroSection";
import BackgroundEffects from "../components/sections/BackgroundEffects";
import CustomCursor from "../components/CustomCursor";
import CharacterCarousel from "../components/sections/CharacterCarousel";
import GamePreview from "../components/sections/GamePreview";

export default function Home() {
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Section animation variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Custom Cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <CustomCursor />
      </motion.div>

      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <BackgroundEffects />
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>

        {/* Game Preview */}
        <motion.div
          variants={sectionVariants}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* <GamePreview /> */}
        </motion.div>

        {/* Character Carousel */}
        <motion.div
          variants={sectionVariants}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <CharacterCarousel />
        </motion.div>

        {/* Preview Section */}
        {/* <PreviewSection /> */}

        {/* Policy Cards Section */}
        {/* <PolicyCardsSection /> */}
      </motion.div>




    </motion.div>
  );
}
