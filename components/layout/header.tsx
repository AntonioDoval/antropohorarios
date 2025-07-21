import React from "react"

export function Header() {
  return (
    <header className="bg-white py-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center">
            {/* Círculo con ANT */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#c44928] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none">ANT</span>
            </div>

            {/* Texto principal, aligned horizontally centered to the right */}
            <div className="flex flex-col justify-center items-start ml-4"> {/* Use margin left for spacing */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#c44928] leading-tight text-left">
                Ciencias Antropológicas
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#c44928] text-left">
                <span className="font-bold">.UBA</span><span className="font-normal">FILO</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}