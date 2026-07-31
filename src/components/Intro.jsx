import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Intro({ onComplete }) {
  const [stage, setStage] = useState('loading')

  useEffect(() => {
    const timer = window.setTimeout(() => setStage('ready'), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (stage !== 'ready') return
    const timer = window.setTimeout(() => onComplete(), 900)
    return () => window.clearTimeout(timer)
  }, [onComplete, stage])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,111,165,0.35),_transparent_50%),linear-gradient(135deg,_#0b0217,_#19092d)] px-4 text-center text-white"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(255,111,165,0.18)] backdrop-blur-xl sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15),_transparent_65%)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            className="text-7xl sm:text-8xl"
          >
            ❤️
          </motion.div>
          <p className="text-2xl font-semibold tracking-[0.2em] text-pink-100 sm:text-3xl">
            Connecting...
          </p>
          <p className="text-lg text-pink-50/80 sm:text-xl">Opening Zee&apos;s Heart...</p>
          <p className="text-lg text-pink-50/80 sm:text-xl">Loading Memories...</p>
          <p className="text-2xl font-semibold text-rose-200">Success ❤️</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Intro
