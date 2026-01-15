"use client";
import Image from "next/image";
import Link from "next/link";
import { Bodoni_Moda, Playfair_Display } from "next/font/google";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function Hero(){
    return(
        <section className="relative w-full">
        {/* Background image */}
        <div className="relative h-[80vh] w-full">
          <Image
            src="/front.jpg" 
            alt="IZZA Hero Banner"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay so text stands out */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
  
        {/* Hero text & buttons */}
        <div className="absolute inset-0 flex items-end justify-start">
          <div className="max-w-4xl px-6 pb-6 text-left text-yellow-500">
            <h1 className={`text-3xl md:text-4xl`}>
              SOFT. CHIC. EFFORTLESS.
            </h1>


            <div className=" flex justify-start gap-4">
              <Link
                href="/hijabs"
                className={`group inline-flex items-center gap-1 text-lg text-izza-mint hover:text-izza-black transition`}
            >
              EXPLORE PRINTS
              <span
                aria-hidden
                className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
              >
                →
              </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    );
}