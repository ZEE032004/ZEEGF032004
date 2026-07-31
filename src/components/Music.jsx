import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { motion } from 'framer-motion'

function Music({ autoPlay = false }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.35)
  const howlRef = useRef(null)

  useEffect(() => {
    howlRef.current = new Howl({
      src: [
        '/music/Lana del Rey- yes to heaven (lyrics) I\'ve got my eye on you - RoyaLyrics (128k).mp3',
      ],
      html5: true,
      volume,
      loop: true,
    })

    return () => {
      howlRef.current?.stop()
      howlRef.current?.unload()
    }
  }, [])

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume)
    }
  }, [volume])

  useEffect(() => {
    if (autoPlay && howlRef.current && !playing) {
      howlRef.current.play()
      setPlaying(true)
    }
  }, [autoPlay, playing])

  const togglePlayback = () => {
    if (!howlRef.current) return

    if (playing) {
      howlRef.current.pause()
      setPlaying(false)
    } else {
      howlRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-[0_0_65px_rgba(255,111,165,0.14)] backdrop-blur-xl">
      <div className="mb-4 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-200">Soft Music</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">A little melody for your heart</h3>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/20 bg-black/20 p-4">
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: 'linear' }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-pink-200/30 bg-white/10 text-3xl"
        >
          ♪
        </motion.div>

        <div className="flex-1">
          <button
            type="button"
            onClick={togglePlayback}
            className="rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500/60 to-fuchsia-500/60 px-4 py-2 text-sm font-semibold text-white"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="mt-4 w-full accent-pink-400"
          />
        </div>
      </div>
    </div>
  )
}

export default Music
