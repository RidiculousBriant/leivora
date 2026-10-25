import { motion, useReducedMotion } from "motion/react";
import { SignupForm } from "@/components/signup-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import loginBg from "@/assets/loginBg.jpg";

export default function Signup() {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.7;

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Background Image */}
        <div className="relative hidden overflow-hidden bg-zinc-200 lg:block">
          <motion.img
            src={loginBg}
            alt="Leivora fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{
              scale: shouldReduceMotion ? 1 : 1.08,
            }}
            animate={{ scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.5,
              ease: "easeOut",
            }}
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Brand */}
          <motion.div
            className="absolute left-10 top-10 z-10"
            initial={{ y: shouldReduceMotion ? 0 : -16 }}
            animate={{ y: 0 }}
            transition={{
              duration,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <Link to="/" className="text-white">
              <span className="brand-logo text-xl tracking-[0.2em]">
                LEIVORA
              </span>
            </Link>
          </motion.div>

          {/* Image Caption */}
          <motion.div
            className="absolute bottom-120 left-10 right-10 z-10 text-white"
            initial={{ y: shouldReduceMotion ? 0 : 28 }}
            animate={{ y: 0 }}
            transition={{
              duration,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em]">
              Find your signature style
            </p>

            <h2 className="max-w-lg text-4xl font-semibold leading-tight xl:text-5xl">
              Your style, your story.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
              Join Leivora and discover timeless pieces and everyday
              essentials curated for your unique style.
            </p>
          </motion.div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-10 lg:px-12">
          {/* Back to Home */}
          <motion.div
            className="absolute left-6 top-6 sm:left-10 sm:top-10 lg:left-12"
            initial={{ x: shouldReduceMotion ? 0 : -16 }}
            animate={{ x: 0 }}
            transition={{
              duration,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <Link
              to="/"
              aria-label="Back to home"
              className="flex size-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-200"
            >
              <ArrowLeft className="size-5" />
            </Link>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            className="w-full max-w-md"
            initial={{ x: shouldReduceMotion ? 0 : 40 }}
            animate={{ x: 0 }}
            transition={{
              duration,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            {/* Mobile Branding */}
            <motion.div
              className="mb-8 lg:hidden"
              initial={{ y: shouldReduceMotion ? 0 : -12 }}
              animate={{ y: 0 }}
              transition={{
                duration,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                to="/"
                className="flex items-center justify-center"
              >
                <span className="brand-logo text-xl tracking-[0.2em]">
                  LEIVORA
                </span>
              </Link>
            </motion.div>

            <SignupForm className="w-full" />
          </motion.div>
        </div>
      </div>
    </main>
  );
}