'use client'
import SignUpModal from "./auth/signupModal/page"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { 
  Menu,
   X ,  
  School, 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  MessageSquare } from "lucide-react";
import { useState, useEffect } from "react"
import { currencySymbols, conversionRates } from "@/utils/currency";

// import ThemeSwitcher from "@/components/ThemeSwitcher";

const features = [
  { 
    title: "Student Management", 
    desc: "Track profiles, enrollment and academic history." ,
    icon: School,
  },
  { 
    title: "Class Scheduling", 
    desc: "Create and manage curriculum timetables easily." ,
    icon : ClipboardList
  },
  { 
    title: "Attendance & Grading", 
    desc: "Automated attendance and report card generation." ,
    icon : BookOpen
  },
  { 
    title: "Parent Communication", 
    desc: "Send announcements and updates instantly." ,
    icon : MessageSquare
  },
  { title: "SaaS Multi-Tenant", 
  desc: "One platform for multiple institutions.",
  icon : Users
},
{ 
  title: "Analytics Dashboard", 
  desc: "Powerful insights for decision making.",
  icon : BarChart3
  },
];

type Tier = {
  name: string;
  price: number; // base in GHS
  features: string[];
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    name: "free",
    price: 100, // GHS by default
    features: ["Access to basic resources", "Limited student accounts", "Email support"],
    highlight: false
  },
  {
    name: "bronze",
    price: 150,
    features: ["All Free features", "Unlimited student accounts", "Progress tracking", "Priority email support"],
    highlight: true
  },
  {
    name: "gold",
    price: 300,
    features: ["All Bronze features", "Advanced analytics", "Dedicated support", "Custom integrations"],
    highlight: false
  },
];
  
  export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false)

 

  const [currency, setCurrency] = useState<keyof typeof currencySymbols>("GHS");

  useEffect(() => {
    // Try auto-detect location currency
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.currency && conversionRates[data.currency]) {
          setCurrency(data.currency);
        }
      })
      .catch(() => {
        setCurrency("GHS"); // fallback to Ghana Cedi
      });
  }, []);
  return (
<div
      className="relative min-h-screen bg-cover bg-center text-gray-900 overflow-x-hidden scroll-smooth"
      style={{ backgroundImage: "url('/blackandwhite.jpg')" }}
    >
      {/* Floating Decorative PNGs (hidden on small screens) */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none hidden sm:block">
        <img src="/space01.png" alt="Decoration 1" className="absolute top-20 left-10 w-24 animate-float-slow opacity-70" />
        <img src="/space02.png" alt="Decoration 2" className="absolute bottom-20 left-16 w-28 animate-float-slower opacity-60" />
        <img src="/space-3.png" alt="Decoration 3" className="z-10 absolute top-32 right-12 w-20 animate-float-fast opacity-80" />
        <img src="/space04.png" alt="Decoration 4" className="absolute bottom-10 right-20 w-32 animate-float-slow opacity-50" />
        <img src="/space05.png" alt="Decoration 5" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 animate-float-medium opacity-60" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-lg">School Master Hub</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            {/* <ThemeSwitcher/> */}
            <a 
              href="#pricing" 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              Get Started
            </a>
          </nav>

          {/* Hamburger Button (Mobile only) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col space-y-4 px-6 py-4 text-gray-700 font-medium">
              <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Features</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Pricing</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Contact</a>
              <a 
                href="#pricing" 
                onClick={() => setMenuOpen(false)} 
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 pt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          {/* Left Content */}
          <motion.div 
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className=" z-12 text-3xl sm:text-5xl font-bold leading-tight max-w-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent ">
              All-in-One School Management Platform
            </h1>
            <p className="text-base sm:text-xl text-gray-600 mt-6 max-w-md z-2">
              Simplify how your institution manages academics, communication and administration.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
              <Link href="#pricing"><Button size="lg">Start Free Trial</Button></Link>
              <Link href="#contact"><Button size="lg" variant="outline">need Help ?</Button></Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/copy.avif"
              alt="Hero Decoration"
              className="max-w-xs sm:max-w-sm lg:max-w-md w-full object-contain animate-float-slow"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
 <section
      id="features"
      className="min-h-screen flex items-center py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto text-center w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          Everything You Need to Run a School
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-12">
          Designed to help your school thrive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 text-left">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <f.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" /> {/* ✅ works now */}
              <h3 className="font-semibold text-lg sm:text-xl mb-2 text-black dark:text-indigo-300">
                {f.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


      {/* CTA Section */}
      <section className="py-24 text-center bg-gradient-to-r from-gray-500 to-gray-400 px-4 text-white">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Join Thousands of Educators Using School Master HUB</h3>
        <p className="text-base sm:text-lg max-w-xl mx-auto mb-8 opacity-90">
          Transform your school’s operations with our modern management system.
        </p>
        <Link href="#pricing"><Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">Start Your Free Trial</Button></Link>
      </section>

      {/* Pricing */}
<section className="py-24 px-4 sm:px-6 bg-gray-50" id="pricing">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-4xl">
        Pricing Plans
      </h2>
      <p className="mt-4 text-gray-600 text-sm sm:text-base">
        Choose a plan that fits your school’s needs.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tiers.map((tier, i) => {
        const convertedPrice = tier.price * conversionRates[currency];

        return (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between border hover:shadow-2xl transition ${
              tier.highlight
                ? "border-blue-600 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-4 text-3xl sm:text-4xl font-bold text-blue-600">
                {currencySymbols[currency]}
                {convertedPrice.toFixed(2)}
              </p>
              <ul className="mt-6 space-y-3 text-gray-600 text-sm sm:text-base">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
              <button
               onClick={() => setSignupOpen(true)}
                className={`mt-8 w-full rounded-xl py-3 font-medium shadow-md transition ${
                  tier.highlight
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Get Started

                
              </button>
                {/* signupModal */}
                <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
            
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


      {/* contact */}
      <section className="py-24 px-4 sm:px-6 bg-white" id="contact">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 sm:gap-12">
          {/* Contact Information */}
          <motion.div 
            className="flex-1 bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Get in touch</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Reach out to us through any of the channels below.
            </p>
            <ul className="space-y-4 text-gray-700 text-sm sm:text-base">
              <li>
                <strong>Email:</strong> support@school.edu
              </li>
              <li>
                <strong>Phone:</strong> +233 54 886 0191
              </li>
              <li>
                <strong>Address:</strong> Bortianor Hills, Accra, Ghana
              </li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="flex-1 bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Send us a message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-500 to-gray-400 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-4">School Master Hub</h4>
            <p className="text-sm text-white">
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
        <div className="text-center text-xs text-white mt-10">
          &copy; {new Date().getFullYear()} School Master Hub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
