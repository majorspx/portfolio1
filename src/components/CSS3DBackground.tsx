import { useState, useEffect } from 'react'

export default function CSS3DBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Floating geometric shapes */}
      <div 
        className="absolute top-20 left-20 w-20 h-20 bg-cyan-500 opacity-20 blur-sm"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotateZ(${mousePosition.x}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute top-40 right-32 w-32 h-32 bg-amber-500 opacity-20 blur-sm rounded-full"
        style={{
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px) rotateX(${mousePosition.y}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-32 left-40 w-24 h-24 bg-purple-500 opacity-20 blur-sm"
        style={{
          transform: `translate(${mousePosition.x * 0.4}px, ${-mousePosition.y * 0.4}px) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `css3d-float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
