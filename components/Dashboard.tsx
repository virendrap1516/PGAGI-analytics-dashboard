'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { WeatherWidget } from './WeatherWidget'
import { NewsWidget } from './NewsWidget'
import { FinanceWidget } from './FinanceWidget'
import { WidgetSelector } from './WidgetSelector'
import { AnimatedBackground } from './AnimatedBackground'
import { Button } from './ui/button'
import { Moon, Sun, ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { GitHubWidget } from './GithubWidget'
import { MovieWidget } from './MovieWidget'
import { SpotifyWidget } from './SpotifyWidget'
import { PersonalInfo } from './PersonalInfo'
import clsx from 'clsx'


type WidgetType = 'weather' | 'news' | 'finance' | 'github' | 'movie' | 'spotify' | null

export function Dashboard() {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>(null)
  const { theme, setTheme } = useTheme()
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    })
  }, [controls])

  const renderWidget = () => {
    switch (selectedWidget) {
      case 'weather':
        return <WeatherWidget />
      case 'news':
        return <NewsWidget />
      case 'finance':
        return <FinanceWidget />
      case 'github':
        return <GitHubWidget />
      case 'movie':
        return <MovieWidget />
      case 'spotify':
        return <SpotifyWidget />
      default:
        return <WidgetSelector onSelect={setSelectedWidget} />
    }
  }

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${theme === 'dark' ? '' : ''}`}>
      <AnimatedBackground />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className={`w-full min-h-screen p-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1
              className={clsx("text-5xl text-transparent bg-clip-text bg-gradient-to-r font-bold",
                theme === 'dark' ? 'from-purple-500 to-pink-500' : 'bg-purple-600'
              )}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
               PGAGI Analytics Dashboard Console
            </motion.h1>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`border ${theme === 'dark' ? 'border-white/30' : 'border-gray-300'} p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-300`}>
                <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme === 'dark' ? 'dark:scale-0 dark:-rotate-90' : ''}`} />
                <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${theme === 'dark' ? 'dark:rotate-0 dark:scale-100' : ''}`} />
                <span className="sr-only">Toggle theme</span>
                </Button>
                </motion.div>
          </motion.div>

          <PersonalInfo
            name="Virendra Pawar"
            resumeUrl="https://drive.google.com/file/d/1cXfV76kkR7L_feFx6-btMSbwuH7gBzSk/view?usp=drive_link"
            linkedinUrl="https://www.linkedin.com/in/virendra-pawar-0b0483299/"
            email="virendrapawar47@gmail.com"
            githubUrl='https://github.com/virendrap1516'
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedWidget || 'selector'}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`${theme === 'dark' ? 'dark:from-gray-800/50 dark:to-gray-900/50' : 'from-white/50 to-gray-100/50'}`}
            >
              {renderWidget()}
            </motion.div>
          </AnimatePresence>
          {selectedWidget && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={() => setSelectedWidget(null)}
                className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

