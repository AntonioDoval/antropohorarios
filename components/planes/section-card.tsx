
import React from "react"

interface SectionCardProps {
  title: string
  children: React.ReactNode
  subtitle?: string
  className?: string
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  children, 
  subtitle,
  className = ""
}) => {
  return (
    <div className={`bg-gray-50 border border-gray-300 rounded-lg ${className}`}>
      <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
