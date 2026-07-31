import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Gallery({ photos }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const captions = useMemo(
    () => [
      'my love',
      'The night that felt endless',
      'The smile I still chase',
      'Every moment with you feels cinematic',
    ],
    [],
  )

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % photos.length)
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)

  const handleTouchStart = (event) => setTouchStart(event.touches[0].clientX)
  const handleTouchEnd = (event) => {
    if (touchStart === null) return
    const delta = event.changedTouches[0].clientX - touchStart
    if (delta > 60) prevSlide()
    if (delta < -60) nextSlide()
    setTouchStart(null)
  }

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-[0_0_65px_rgba(255,111,165,0.14)] backdrop-blur-xl">
      <div className="mb-4 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-200">Our Memories</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Swipe through your favorite little moments</h3>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-black/20"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photos[activeIndex]}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
            onClick={() => setFullscreen(true)}
          >
            <img src={photos[activeIndex]} alt={captions[activeIndex]} className="h-80 w-full object-cover sm:h-[24rem]" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 top-3 flex justify-center gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
          <p className="text-lg font-semibold text-white">{captions[activeIndex]}</p>
          <p className="mt-1 text-sm text-pink-100/70">Swipe or tap the image for full-screen love</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button type="button" onClick={prevSlide} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
          ← Previous
        </button>
        <button type="button" onClick={nextSlide} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
          Next →
        </button>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={photos[activeIndex]}
              alt={captions[activeIndex]}
              className="max-h-[90vh] w-full max-w-xl rounded-[2rem] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
