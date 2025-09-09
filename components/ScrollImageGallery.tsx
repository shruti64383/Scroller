"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const images = [
  "/modern-office.png",
  "/creative-team-collaboration.png",
  "/digital-innovation-technology.jpg",
  "/business-growth-analytics.jpg",
  "/future-workspace-design.jpg",
]

export default function ScrollImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const progressBarRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const imageElements = imagesRef.current
    const progressBar = progressBarRef.current
    const currentIndex = currentIndexRef.current

    if (!container || imageElements.length === 0 || !progressBar || !currentIndex) return

    gsap.set(imageElements, { y: 0 })
    imageElements.forEach((img, index) => {
      img.style.zIndex = (images.length - index).toString()
    })
    gsap.set(progressBar, { scaleY: 0, transformOrigin: "bottom" })
    gsap.set(currentIndex, { textContent: "1" })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "center center",
        end: `+=${(images.length - 1) * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(progressBar, { scaleY: progress })
          const currentImageIndex = Math.floor(progress * (images.length - 1)) + 1
          gsap.set(currentIndex, { textContent: currentImageIndex.toString() })
        },
      },
    })

    imageElements.forEach((img, index) => {
      if (index < images.length - 1) {
        tl.to(img, {
          y: "-100%",
          duration: 1.2,
          ease: "power2.inOut",
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center">
      <div className="flex items-center gap-8">
        <div className="relative w-[600px] h-[400px] rounded-lg overflow-hidden shadow-2xl">
          {images.map((src, index) => (
            <img
              key={index}
              ref={(el) => {
                if (el) imagesRef.current[index] = el
              }}
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
        </div>

        <div className="flex flex-col items-center h-[400px]">
          <span ref={currentIndexRef} className="text-white text-lg font-semibold mb-4">
            1
          </span>
          <div className="relative w-1 flex-1 bg-white/20 rounded-full">
            <div ref={progressBarRef} className="absolute bottom-0 left-0 w-full bg-white rounded-full" />
          </div>
          <span className="text-white text-lg font-semibold mt-4">{images.length}</span>
        </div>
      </div>
    </div>
  )
}
