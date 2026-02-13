import React from 'react'

interface ResultCardProps {
  title: string
  children: React.ReactNode
  icon?: string
}

export default function ResultCard({ title, children, icon }: ResultCardProps) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group">
      <div className="mb-5 flex items-center gap-3">
        {icon && (
          <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        )}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

interface ResultItemProps {
  label: string
  value: string | number
  highlight?: boolean
  valueColor?: string
}

export function ResultItem({ label, value, highlight, valueColor }: ResultItemProps) {
  return (
    <div className={`flex items-center justify-between rounded-xl p-4 transition-all duration-300 ${
      highlight 
        ? 'bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20' 
        : 'bg-white/5 hover:bg-white/10'
    }`}>
      <span className="font-medium text-gray-300">{label}</span>
      <span className={`text-lg font-bold ${valueColor || 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}

interface ResultTextProps {
  text: string
}

export function ResultText({ text }: ResultTextProps) {
  return (
    <div className="rounded-xl bg-white/5 p-5 border border-white/5 hover:border-white/10 transition-all duration-300">
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  )
}
