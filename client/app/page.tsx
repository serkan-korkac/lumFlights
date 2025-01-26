'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const backgrounds = [
  '/images/1.png', 
  '/images/2.png', 
  '/images/3.png', 
  '/images/4.png',
];

export default function Home() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-900 text-white">
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgrounds[currentBgIndex]}
            alt="Travel"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Explore the World with <span className="text-yellow-400">LumFlights</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mb-8">
            Seamless travel, unforgettable experiences. Your next adventure awaits.
          </p>
          <Link href="/login" className="bg-yellow-400 text-black px-8 py-4 text-lg rounded-full shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-105">
              Get Started
          </Link>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-bounce">
          <Image
            src="/images/logo.png" // Replace with airplane icon
            alt="Airplane"
            width={80}
            height={80}
          />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce delay-1000">
          <Image
            src="/images/navigation.png" // Replace with globe icon
            alt="Globe"
            width={80}
            height={80}
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 LumFlights. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
