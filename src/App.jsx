import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Gallery from './components/Gallery'
import Heart from './components/Heart'
import Intro from './components/Intro'
import Letter from './components/Letter'
import Music from './components/Music'
import { answers } from './config/verification'

const photoSet = [
  '/photos/WhatsApp Image 2026-07-31 at 6.17.53 AM (2).jpeg',
  '/photos/WhatsApp Image 2026-07-31 at 6.17.53 AM (1).jpeg',
  '/photos/WhatsApp Image 2026-07-31 at 6.17.53 AM.jpeg',
  '/photos/WhatsApp Image 2026-07-31 at 6.17.52 AM.jpeg',
]

function Typewriter({ text, speed = 28, onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      setDisplayed((prev) => prev + text[index])
      index += 1
      if (index >= text.length) {
        window.clearInterval(timer)
        onDone?.()
      }
    }, speed)

    return () => window.clearInterval(timer)
  }, [onDone, speed, text])

  return <p className="whitespace-pre-line text-left text-lg leading-8 text-pink-50 sm:text-xl">{displayed}</p>
}

function App() {
  const [view, setView] = useState('intro')
  const [verificationInputs, setVerificationInputs] = useState({
    birthday: '',
    favoriteSport: '',
  })
  const [verificationState, setVerificationState] = useState('idle')
  const [profile, setProfile] = useState({ memory: '', dream: '' })
  const [activeSection, setActiveSection] = useState('heart')
  const [autoPlayMusic, setAutoPlayMusic] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('zee-heart-profile')
    if (saved) {
      try {
        setProfile(JSON.parse(saved))
      } catch {
        window.localStorage.removeItem('zee-heart-profile')
      }
    }
  }, [])

  const welcomeText = useMemo(
    () => `Hey beautiful ❤️\n\nI wanted to buy you a special gift.\n\nSomething expensive.\nSomething unforgettable.\n\nBut then I realized...\n\nThe best gift I can give you is something made with my own hands.\n\nSo I created this little piece of my heart for you.\n\nEvery animation,\nevery detail,\nevery line of code,\n\nwas made while thinking about you.\n\nFor the most supportive,\nmost caring,\nand most beautiful girlfriend in the universe.\n\nWelcome to Zee's Heart ❤️`,
    [],
  )

  const handleVerificationSubmit = (event) => {
    event.preventDefault()

    const normalized = {
      birthday: verificationInputs.birthday.trim().toLowerCase(),
      favoriteSport: verificationInputs.favoriteSport.trim().toLowerCase(),
    }

    const isCorrect =
      normalized.birthday === answers.birthday.toLowerCase() &&
      normalized.favoriteSport === answers.favoriteSport.toLowerCase()

    if (isCorrect) {
      setVerificationState('success')
      setAutoPlayMusic(true)
      window.setTimeout(() => setView('personal'), 1400)
    } else {
      setVerificationState('error')
    }
  }

  const handlePersonalSubmit = (event) => {
    event.preventDefault()
    window.localStorage.setItem('zee-heart-profile', JSON.stringify(profile))
    setView('main')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,111,165,0.2),_transparent_45%),linear-gradient(135deg,_#07020d,_#1c0730)] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {view === 'intro' && <Intro key="intro" onComplete={() => setView('welcome')} />}

          {view === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 items-center justify-center px-1 py-6"
            >
              <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_0_80px_rgba(255,111,165,0.18)] backdrop-blur-xl sm:p-8">
                <div className="mb-6 text-center text-3xl font-semibold text-pink-100 sm:text-4xl">Welcome to Zee&apos;s Heart ❤️</div>
                <div className="rounded-[1.5rem] border border-white/15 bg-black/20 p-5 sm:p-6">
                  <Typewriter text={welcomeText} />
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setView('verification')}
                    className="rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500/70 to-fuchsia-500/70 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-pink-900/30"
                  >
                    Enter ❤️
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'verification' && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 items-center justify-center py-6"
            >
              <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_0_80px_rgba(255,111,165,0.16)] backdrop-blur-xl sm:p-8">
                <div className="mb-4 text-center">
                  <h2 className="text-3xl font-semibold text-pink-100">🔐 Heart Verification ❤️</h2>
                  <p className="mt-3 text-sm leading-7 text-pink-50/80 sm:text-base">
                    Before opening Zee&apos;s Heart, I need to make sure you are the right person... Only someone who truly knows me can enter ❤️
                  </p>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                  <label className="block rounded-[1.25rem] border border-white/15 bg-black/20 p-4 text-sm text-pink-50">
                    <span className="mb-2 block font-semibold">1. When is my birthday?</span>
                    <input
                      type="text"
                      value={verificationInputs.birthday}
                      onChange={(event) => setVerificationInputs((prev) => ({ ...prev, birthday: event.target.value }))}
                      placeholder="DD/MM/YYYY"
                      className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-white outline-none"
                      required
                    />
                  </label>

                  <label className="block rounded-[1.25rem] border border-white/15 bg-black/20 p-4 text-sm text-pink-50">
                    <span className="mb-2 block font-semibold">2. What is my favorite sport?</span>
                    <input
                      type="text"
                      value={verificationInputs.favoriteSport}
                      onChange={(event) => setVerificationInputs((prev) => ({ ...prev, favoriteSport: event.target.value }))}
                      placeholder="Your answer"
                      className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-white outline-none"
                      required
                    />
                  </label>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500/70 to-fuchsia-500/70 px-6 py-3 font-semibold text-white"
                    >
                      Verify ❤️
                    </button>
                  </div>
                </form>

                {verificationState === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-[1.4rem] border border-emerald-300/30 bg-emerald-500/10 p-4 text-center text-emerald-100">
                    <p className="text-xl font-semibold">✅ Verification Successful</p>
                    <p className="mt-2 text-sm">Welcome, my love ❤️ You know me better than anyone. Opening Zee&apos;s Heart...</p>
                  </motion.div>
                )}

                {verificationState === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-[1.4rem] border border-amber-300/30 bg-amber-500/10 p-4 text-center text-amber-100">
                    <p className="text-xl font-semibold">Almost there ❤️</p>
                    <p className="mt-2 text-sm">Looks like you need another try.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="flex flex-1 items-center justify-center py-6"
            >
              <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_0_80px_rgba(255,111,165,0.16)] backdrop-blur-xl sm:p-8">
                <div className="mb-4 text-center">
                  <h2 className="text-3xl font-semibold text-pink-100">Welcome Iman 💕</h2>
                  <p className="mt-2 text-sm text-pink-50/80">Share a memory and a dream so this heart feels fully yours.</p>
                </div>

                <form onSubmit={handlePersonalSubmit} className="space-y-4">
                  <label className="block rounded-[1.25rem] border border-white/15 bg-black/20 p-4 text-sm text-pink-50">
                    <span className="mb-2 block font-semibold">1. What is your favorite memory with me?</span>
                    <textarea
                      value={profile.memory}
                      onChange={(event) => setProfile((prev) => ({ ...prev, memory: event.target.value }))}
                      className="min-h-24 w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-white outline-none"
                      required
                    />
                  </label>

                  <label className="block rounded-[1.25rem] border border-white/15 bg-black/20 p-4 text-sm text-pink-50">
                    <span className="mb-2 block font-semibold">2. What is one dream you want us to achieve together?</span>
                    <input
                      type="text"
                      value={profile.dream}
                      onChange={(event) => setProfile((prev) => ({ ...prev, dream: event.target.value }))}
                      className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-white outline-none"
                      required
                    />
                  </label>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500/70 to-fuchsia-500/70 px-6 py-3 font-semibold text-white"
                    >
                      Save & Enter ❤️
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex-1 py-6"
            >
              <div className="mb-6 rounded-[2rem] border border-white/20 bg-white/10 p-4 text-center shadow-[0_0_80px_rgba(255,111,165,0.14)] backdrop-blur-xl sm:p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-pink-300">Inside Zee&apos;s Heart ❤️</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Welcome {profile.name || 'my love'} ❤️</h2>
                <p className="mt-3 text-sm text-pink-50/80 sm:text-base">
                  Our favorite memory: {profile.memory || 'Every second with you'}
                </p>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {[
                  { id: 'heart', label: '❤️ Zee\'s Heart', icon: '💗' },
                  { id: 'gallery', label: '📸 Most Beautiful GF', icon: '📸' },
                  { id: 'letter', label: '💌 Love Letter', icon: '💌' },
                ].map((card) => (
                  <motion.button
                    key={card.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(card.id)}
                    className={`rounded-[1.6rem] border p-5 text-left text-white shadow-lg backdrop-blur-xl ${activeSection === card.id ? 'border-pink-200/40 bg-pink-500/20' : 'border-white/15 bg-white/10'}`}
                  >
                    <div className="text-3xl">{card.icon}</div>
                    <p className="mt-3 text-lg font-semibold">{card.label}</p>
                  </motion.button>
                ))}
              </div>

              <div className="space-y-6">
                {activeSection === 'heart' && <Heart photos={photoSet} />}
                {activeSection === 'gallery' && <Gallery photos={photoSet} />}
                {activeSection === 'letter' && <Letter />}
              </div>

              <div className="mt-6 space-y-6">
                <Music autoPlay={autoPlayMusic} />
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setView('final')}
                    className="rounded-full border border-pink-200/30 bg-gradient-to-r from-fuchsia-500/70 to-pink-500/70 px-6 py-3 font-semibold text-white"
                  >
                    Reveal final surprise ✨
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 items-center justify-center py-6"
            >
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,_rgba(255,111,165,0.2),_transparent_30%),linear-gradient(135deg,_#080218,_#271155)] p-6 text-center shadow-[0_0_80px_rgba(255,111,165,0.16)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.16),_transparent_65%)]" />
                <div className="relative z-10">
                  <p className="text-2xl text-pink-100 sm:text-3xl">If someday I can buy you everything you deserve,</p>
                  <p className="mt-2 text-2xl text-pink-100 sm:text-3xl">I will.</p>
                  <p className="mt-6 text-lg text-pink-50/80">But until then...</p>
                  <p className="mt-3 text-xl font-semibold text-white">Remember:</p>
                  <p className="mt-3 text-lg text-pink-50/80">Even when my wallet isn&apos;t full, my heart always is.</p>
                  <p className="mt-8 text-2xl font-semibold text-pink-100">Happy Girlfriend Day ❤️</p>
                  <div className="mt-8 flex justify-center">
                    <div className="relative h-48 w-48">
                      {photoSet.map((photo, index) => (
                        <motion.img
                          key={photo}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, y: [0, -14, 0], x: [0, 8, 0] }}
                          transition={{ duration: 3 + index * 0.3, repeat: Infinity }}
                          src={photo}
                          alt="Lovely memory"
                          className="absolute h-16 w-16 rounded-2xl border border-white/20 object-cover"
                          style={{ left: `${12 + index * 20}%`, top: `${18 + (index % 2) * 18}%` }}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center text-4xl text-pink-100">❤️</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
