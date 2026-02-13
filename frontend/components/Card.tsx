import React from 'react'

interface CardProps {
  title: string
  description: string
  icon: string
  onClick: () => void
  gradient: string
}

export default function Card({ title, description, icon, onClick, gradient }: CardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-500 hover:scale-105 glow-hover w-full max-w-md border border-white/10`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="mb-6 text-6xl transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h2 className="mb-3 text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
          {title}
        </h2>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </button>
  )
}
