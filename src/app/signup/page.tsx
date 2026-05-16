'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'

export default function SignupPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: MOTION.ease.outExpo }}
            >
              <p className="text-section-heading mb-4">Team Registration</p>
              <h1 className="text-display mb-6">
                Sign Up Your <span className="text-heat-jalapeno">Team</span>
              </h1>
              <p className="text-xl text-zinc-400">
                Pick your tournament, drop your roster, and we&apos;ll DM your captain on
                Instagram to confirm.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <motion.div
              className="mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSekSFGfAlPtyzjeVhgPPpZhSOwNsYNAVBib0YeIWQMNT1pRYQ/viewform?embedded=true"
                  title="Let's Pepper team signup form"
                  className="w-full"
                  height={1259}
                  loading="lazy"
                >
                  Loading…
                </iframe>
              </div>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Trouble loading the form?{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSekSFGfAlPtyzjeVhgPPpZhSOwNsYNAVBib0YeIWQMNT1pRYQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heat-jalapeno underline-offset-4 hover:underline"
                >
                  Open it in a new tab
                </a>
                .
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
