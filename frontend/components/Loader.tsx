import React from 'react'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Outer ring */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500"></div>
        
        {/* Middle ring */}
        <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-pink-500/20 border-r-pink-500" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Inner pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-white animate-pulse">Analyzing...</p>
        <p className="mt-2 text-sm text-gray-400">AI is processing your image</p>
      </div>
      
      {/* Loading dots */}
      <div className="mt-4 flex gap-2">
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></div>
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}
