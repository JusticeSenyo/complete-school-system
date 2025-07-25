'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  { title: "Student Management", desc: "Track profiles, enrollment, and academic history." },
  { title: "Class Scheduling", desc: "Create and manage curriculum timetables easily." },
  { title: "Attendance & Grading", desc: "Automated attendance and report card generation." },
  { title: "Parent Communication", desc: "Send announcements and updates instantly." },
  { title: "SaaS Multi-Tenant", desc: "One platform for multiple institutions." },
  { title: "Analytics Dashboard", desc: "Powerful insights for decision making." },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center text-gray-900 overflow-x-hidden"
    style={{ backgroundImage: "url('/blackandwhite.jpg')" }}
    >
      {/* Floating Decorative PNGs */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <img src="/space01.png" alt="Decoration 1" className="absolute top-10 left-10 w-24 animate-float-slow opacity-70" />
        <img src="/space02.png" alt="Decoration 2" className="absolute bottom-20 left-16 w-28 animate-float-slower opacity-60" />
        <img src="/space-3.png" alt="Decoration 3" className="absolute top-32 right-12 w-20 animate-float-fast opacity-80" />
        <img src="/space04.png" alt="Decoration 4" className="absolute bottom-10 right-20 w-32 animate-float-slow opacity-50" />
        <img src="/space05.png" alt="Decoration 5" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 animate-float-medium opacity-60" />
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-lg">school master HTMLButtonElement</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="hover:underline">Features</Link>
            <Link href="#pricing" className="hover:underline">Pricing</Link>
            <Link href="#contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="space-x-4">
            <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
            <Link href="/auth/signup"><Button>Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          <div className="flex-1 text-left">
            <h1 className="text-5xl font-bold leading-tight max-w-xl">
              All-in-One School Management Platform
            </h1>
            <p className="text-xl text-gray-600 mt-6 max-w-md">
              Simplify how your institution manages academics, communication, and administration.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/auth/signup"><Button size="lg">Start Free Trial</Button></Link>
              <Link href="/demo"><Button size="lg" variant="outline">View Demo</Button></Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/copy.avif"
              alt="Hero Decoration"
              className="max-w-xs md:max-w-sm lg:max-w-md w-full object-contain animate-float-slow"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Everything You Need to Run a School</h2>
          <p className="text-lg text-gray-600 mb-12">Designed to help your school thrive.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border bg-white shadow-sm backdrop-blur"
              >
                <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-white">
        <h3 className="text-3xl font-semibold mb-4">Join Thousands of Educators Using school master HTMLButtonElement</h3>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Transform your school’s operations with our modern management system.
        </p>
        <Link href="/auth/signup"><Button size="lg">Start Your Free Trial</Button></Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-4">school master HTMLButtonElement</h4>
            <p className="text-sm text-gray-600">
              Complete school management software for modern educational institutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="/demo">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} school master HTMLButtonElement. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
