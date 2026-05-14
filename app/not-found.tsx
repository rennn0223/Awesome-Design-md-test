"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-surface-dark px-6">
      {/* 404 Number */}
      <div className="relative z-10 text-center">
        <h1 className="text-[clamp(8rem,25vw,16rem)] font-black leading-none text-on-dark/20 select-none">
          404
        </h1>

        <div className="flex flex-col gap-4 items-center mt-8">
          <p className="font-mono text-primary-dark text-lg tracking-widest">
            PAGE NOT FOUND
          </p>
          <p className="text-body-md text-on-dark-mute max-w-sm">
            The page has been removed or is temporarily unavailable.
          </p>

          <Link
            href="/"
            className="button-outline"
          >
            RETURN TO HOME
          </Link>
        </div>
      </div>
    </section>
  );
}