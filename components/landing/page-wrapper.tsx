"use client"

import { useCallback, useState } from "react"
import { IntroAnimation } from "@/components/landing/intro-animation"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <IntroAnimation onDone={handleIntroDone} />}
      {children}
    </>
  )
}
