import { useState } from 'react'
import { motion } from 'framer-motion'

function Letter() {
  const [opened, setOpened] = useState(false)

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-[0_0_65px_rgba(255,111,165,0.14)] backdrop-blur-xl">
      <div className="mb-4 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-200">Love Letter</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">A little note just for you</h3>
      </div>

      <div className="flex flex-col items-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpened((prev) => !prev)}
          className="relative h-56 w-full max-w-md rounded-[2rem] border border-white/20 bg-gradient-to-br from-pink-100/30 to-purple-200/20 p-4"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-white/20" />
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute right-8 bottom-8 h-24 w-24 rounded-full bg-fuchsia-200/30 blur-2xl" />
          <div className="relative flex h-full flex-col justify-between rounded-[1.2rem] border border-white/20 bg-white/10 p-6 text-left text-white">
            <div>
              <p className="text-lg font-semibold">Dear My Love</p>
              <p className="mt-2 text-sm text-pink-50/80">Tap to open this envelope and read what&apos;s inside.</p>
            </div>
            <p className="text-right text-sm text-pink-100">From Zee ❤️</p>
          </div>
        </motion.button>

        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full max-w-2xl rounded-[2rem] border border-white/20 bg-[#180b2a]/80 p-6 text-left text-pink-50 shadow-2xl"
          >
            <p className="whitespace-pre-line text-lg leading-8">
              {`Dear My Love,

I may not have the biggest gifts to give you,
but I promise my effort, my time, and my heart will always be yours.

Thank you for supporting me.
Thank you for believing in me.
Thank you for being my happiness.

You are my favorite person.

Forever yours,

Zeeshan ❤️`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Letter
