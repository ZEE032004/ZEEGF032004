import { useState } from 'react'
import { motion } from 'framer-motion'

function Heart({ photos }) {
  const [status, setStatus] = useState('idle')
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setStatus('scanning')
    window.setTimeout(() => {
      setStatus('ready')
      setOpened(true)
    }, 1600)
  }

  const floatingPhotos = photos.slice(0, 4)

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-[0_0_65px_rgba(255,111,165,0.16)] backdrop-blur-xl">
      <div className="mb-4 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-200">Zee&apos;s Heart</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Tap to open your little universe</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileTap={{ scale: 0.95 }}
          className="relative h-72 w-72 rounded-full"
        >
          <motion.div
            animate={{ scale: opened ? 1 : [1, 1.04, 1] }}
            transition={{ duration: 1.2, repeat: opened ? 0 : Infinity }}
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_rgba(255,111,165,0.28),_rgba(113,24,147,0.5))] blur-2xl"
          />
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_30px_rgba(255,111,165,0.45)]">
              <path
                d="M100 182c-45-36-74-60-74-98 0-24 19-43 43-43 16 0 26 8 31 19 5-11 15-19 31-19 24 0 43 19 43 43 0 38-29 62-74 98z"
                fill="#ff5ea8"
                stroke="#fff"
                strokeWidth="4"
              />
            </svg>
            {!opened && (
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white">
                {status === 'scanning' ? 'Scanning Heart...' : 'Tap'}
              </div>
            )}
          </div>
        </motion.button>

        {status !== 'idle' && (
          <div className="w-full rounded-2xl border border-pink-300/30 bg-black/20 p-4 text-center text-pink-50">
            {status === 'scanning' ? (
              <>
                <p className="text-xl font-semibold">Scanning Heart...</p>
                <p className="mt-2 text-sm text-pink-100/80">Love Level: ∞</p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold">You are the owner of Zee&apos;s Heart ❤️</p>
                <p className="mt-2 text-sm text-pink-100/80">You are in every corner of my heart ❤️</p>
              </>
            )}
          </div>
        )}

        {opened && (
          <div className="relative h-72 w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[radial-gradient(circle_at_top,_rgba(255,111,165,0.18),_rgba(12,6,24,0.9))] p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_40%)]" />
            {floatingPhotos.map((photo, index) => (
              <motion.div
                key={photo}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                  x: [0, 8, 0],
                  rotate: [0, 8, -5, 0],
                }}
                transition={{ duration: 3.8 + index * 0.3, repeat: Infinity }}
                className="absolute h-20 w-20 overflow-hidden rounded-2xl border border-white/30 bg-white/20 shadow-xl"
                style={{
                  left: `${14 + index * 18}%`,
                  top: `${18 + (index % 2) * 24}%`,
                }}
              >
                <img src={photo} alt="Lovely memory" className="h-full w-full object-cover" />
              </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center text-center text-xl font-semibold text-pink-50">
              Only your photos live here now.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Heart
