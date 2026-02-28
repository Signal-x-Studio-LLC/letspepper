'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { quizQuestions, pepperResults, calculateResult, type PepperPersonality } from '@/lib/quiz-data'
import { getStoredValue, setStoredValue, STORAGE_KEYS } from '@/lib/local-storage'

function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-xs font-accent uppercase tracking-wider text-zinc-500 mb-2">
        <span>Question {current + 1}</span>
        <span>{total - current} remaining</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-heat-jalapeno rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: MOTION.ease.outExpo }}
        />
      </div>
    </div>
  )
}

export default function QuizPage() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<PepperPersonality | null>(null)

  // Check for existing result on mount
  useEffect(() => {
    const stored = getStoredValue<PepperPersonality | null>(STORAGE_KEYS.QUIZ_RESULT, null)
    if (stored && pepperResults[stored]) {
      setResult(stored)
      setStarted(true)
    }
  }, [])

  // Check for ?result= param (shared link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedResult = params.get('result') as PepperPersonality | null
    if (sharedResult && pepperResults[sharedResult]) {
      setResult(sharedResult)
      setStarted(true)
    }
  }, [])

  function handleAnswer(answerIndex: number) {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion + 1 >= quizQuestions.length) {
      const personality = calculateResult(newAnswers)
      setResult(personality)
      setStoredValue(STORAGE_KEYS.QUIZ_RESULT, personality)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  function handleRetake() {
    setAnswers([])
    setCurrentQuestion(0)
    setResult(null)
    setStarted(true)
  }

  function handleShare() {
    if (!result) return
    const url = `${window.location.origin}/quiz?result=${result}`
    const pepperResult = pepperResults[result]
    const text = `I'm a ${pepperResult.title}! "${pepperResult.tagline}" — Take the Pepper Quiz and find out what pepper you are.`

    if (navigator.share) {
      navigator.share({ title: 'What Pepper Are You?', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`).catch(() => {})
    }
  }

  const pepperResult = result ? pepperResults[result] : null

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24">
        <section className="section-padding">
          <div className="section-container">
            <AnimatePresence mode="wait">
              {/* Start Screen */}
              {!started && (
                <motion.div
                  key="start"
                  className="max-w-2xl mx-auto text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: MOTION.ease.outExpo }}
                >
                  <p className="text-section-heading mb-4">Personality Quiz</p>
                  <h1 className="text-display mb-6">
                    What <span className="text-heat-jalapeno">Pepper</span> Are You?
                  </h1>
                  <p className="text-xl text-zinc-400 mb-8">
                    7 questions. One destiny. Find out which pepper matches your volleyball personality.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStarted(true)}
                    className="btn-primary text-lg"
                  >
                    Take the Quiz
                  </button>
                </motion.div>
              )}

              {/* Questions */}
              {started && !result && (
                <motion.div
                  key={`question-${currentQuestion}`}
                  className="max-w-2xl mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: MOTION.ease.outExpo }}
                >
                  <QuizProgress current={currentQuestion} total={quizQuestions.length} />

                  <h2 className="font-display text-2xl sm:text-3xl uppercase text-white text-center mb-8">
                    {quizQuestions[currentQuestion].question}
                  </h2>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => handleAnswer(i)}
                        className="w-full text-left p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-zinc-300 hover:border-heat-jalapeno/50 hover:bg-zinc-900/60 hover:text-white transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="font-accent text-xs text-zinc-600 mr-3">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {option.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {result && pepperResult && (
                <motion.div
                  key="result"
                  className="max-w-2xl mx-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: MOTION.ease.outExpo }}
                >
                  <p className="text-section-heading mb-4">Your Result</p>

                  {/* Result Card */}
                  <div className="bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-8 sm:p-12 mb-8">
                    <div className="text-6xl mb-4">🌶️</div>
                    <h2 className={cn('font-display text-4xl sm:text-5xl uppercase mb-2', pepperResult.color)}>
                      {pepperResult.title}
                    </h2>
                    <p className="font-accent text-sm uppercase tracking-wider text-zinc-500 mb-6">
                      &ldquo;{pepperResult.tagline}&rdquo;
                    </p>

                    {/* Heat level */}
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={cn('text-lg', i < pepperResult.heatLevel ? 'opacity-100' : 'opacity-20')}
                        >
                          🌶️
                        </span>
                      ))}
                    </div>

                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                      {pepperResult.description}
                    </p>

                    {/* Traits */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {pepperResult.traits.map((trait) => (
                        <span
                          key={trait}
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-accent uppercase tracking-wider border',
                            pepperResult.color,
                            `border-current/30`
                          )}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button type="button" onClick={handleShare} className="btn-primary">
                      Share Result
                    </button>
                    <button type="button" onClick={handleRetake} className="btn-secondary">
                      Retake Quiz
                    </button>
                    <Link href="/rankings" className="btn-secondary">
                      View Rankings
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
