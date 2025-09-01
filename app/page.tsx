'use client'
import SignUpModal from "./auth/signupModal/page"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, User } from "lucide-react"
import { motion , AnimatePresence } from "framer-motion"
import { tierPrices } from "@/utils/currency";
import { 
  Menu,
   X ,  
  School, 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  MessageSquare,
  Mail ,
  ChevronDown, ChevronUp, Check, Star, Sparkles 
} from "lucide-react";
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
  { title: "Finantial Management", 
  desc: "One platform for better Finantial Management .",
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
const tiers = [
  {
    name: "Basic",
    description: "Perfect for small schools getting started with digital management",
    icon: "🎯",
    features: [
      "Up to 500 students",
      "Attendance tracking", 
      "Report card generation", 
      "Academic bills & fees", 
      "Basic user roles (Owner, Admin, Head, Teachers, Accountant)"
    ],
    highlight: false,
    detailedFeatures: {
      'Student Management': [
        'Student profiles and enrollment',
        'Basic attendance tracking',
        'Simple grade book',
        'Parent contact information',
        'Academic history tracking'
      ],
      'Financial Management': [
        'Academic bills and fees',
        'Basic payment tracking',
        'Fee structure setup',
        'Payment receipts'
      ],
      'User Management': [
        'Owner admin access',
        'Head teacher dashboard',
        'Teacher grade input',
        'Accountant financial access',
        'Role-based permissions'
      ],
      'Reporting': [
        'Automated report cards',
        'Attendance reports',
        'Basic academic summaries',
        'Fee payment reports'
      ],
      // 'Support': [
      //   'Email support (48hr response)',
      //   'Getting started guide',
      //   'Basic training materials'
      // ]
    }
  },
  {
    name: "standard", 
    description: "Comprehensive solution for growing schools with parent engagement",
    icon: "🚀",
    features: [
      "Everything in Basic",
      "Up to 1000 students", 
      "Parent dashboard access", 
      "Student dashboard", 
      "Bulk SMS/WhatsApp/Email notifications",
      "Simple analytics and insights"
    ],
    highlight: true,
    detailedFeatures: {
      'Enhanced Communication': [
        'Parent portal with real-time updates',
        'Student self-service dashboard',
        'Bulk SMS messaging system',
        'WhatsApp integration',
        'Email campaign management',
        'Push notifications'
      ],
      'Advanced Student Management': [
        'Expanded student capacity (500+)',
        'Behavioral tracking',
        'Medical records management',
        'Academic progress monitoring',
        'Parent-teacher communication logs'
      ],
      'Analytics & Insights': [
        'Student performance analytics',
        'Attendance trend analysis',
        'Financial reporting dashboard',
        'Class performance metrics',
        'Parent engagement tracking'
      ],
      'Mobile Access': [
        'Mobile-responsive design',
        'Parent mobile app access',
        'Student mobile dashboard',
        'Teacher mobile grade entry'
      ],
      // 'Enhanced Support': [
      //   'Priority email support (24hr response)',
      //   'Phone support during business hours',
      //   'Advanced training sessions',
      //   'Setup assistance'
      // ]
    }
  },
  {
    name: "premium",
    description: "Enterprise-grade platform for large schools with advanced features",
    icon: "👑", 
    features: [
      "Everything in Standard",
      "Unlimited students",
      "Online classes & virtual learning", 
      "Multi-campus management support",
      "White-label branding options",
      "Advanced analytics & AI insights",
      "Dedicated success manager"
    ],
    highlight: false,
    detailedFeatures: {
      'Online Learning Platform': [
        'Virtual classroom integration',
        'Online assignment submission',
        'Video conferencing tools',
        'Digital resource library',
        'Online exam capabilities'
      ],
      'Multi-Campus Features': [
        'Centralized multi-school management',
        'Cross-campus reporting',
        'Unified parent portal',
        'Resource sharing between campuses',
        'Consolidated billing'
      ],
      'Enterprise Customization': [
        'White-label branding',
        'Custom domain setup',
        'Personalized color schemes',
        'Custom feature development',
        'API access for integrations'
      ],
      'Advanced Analytics': [
        'AI-powered student predictions',
        'Advanced data visualization',
        'Custom report builder',
        'Predictive analytics',
        'Performance benchmarking'
      ],
      // 'Premium Support': [
      //   '24/7 phone and chat support',
      //   'Dedicated success manager',
      //   'On-site training available',
      //   'Priority feature requests',
      //   'Custom implementation support'
      // ]
    }
  }
];
// const tiers: Tier[] = [
//   {
//     name: "Basic",
//     price: 529.2, // GHS by default
//     features: ["Attendance", "Report Cards", "Academic bills & fees", "roles(Owner,Admin,Head)","roles(Teachers,Accountant)"],
//     highlight: false
//   },
//   {
//     name: "standard",
//     price: 1069.20,
//     features: ["Everything in Basic", "Parent dashboard ", "Student Dashboard", "Bulk SMS/Whatsaap/email", "simple analystics"],
//     highlight: true
//   },
//   {
//     name: "premium",
//     price: 2149.2,
//     features: ["everything is standard", "online classes", "multi-campus support","white label", "advanced analytics", "dedicated success manager"],
//     highlight: false
//   },
// ];
  
  export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false)

  // Add these state variables to your component:
const [isYearly, setIsYearly] = useState(false);
const [expandedTiers, setExpandedTiers] = useState({});

// Add this function to your component:
const toggleTierExpansion = (tierName) => {
  setExpandedTiers(prev => ({
    ...prev,
    [tierName]: !prev[tierName]
  }));
};

 

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
          <Link href="/">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-lg">School Master Hub</span>
          </div>
          </Link>

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
            <h1 className=" z-12 text-3xl sm:text-5xl font-bold leading-tight max-w-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent pb-5">
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
        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Join Thousands of Educators Using School Master Hub</h3>
        <p className="text-base sm:text-lg max-w-xl mx-auto mb-8 opacity-90">
          Transform your school’s operations with our modern management system.
        </p>
        <Link href="#contact"><Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">need more info ?</Button></Link>
      </section>

      {/* Pricing */}
<section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white" id="pricing">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
      >
        Choose Your Perfect Plan
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="text-lg text-gray-600 mb-8"
      >
        Transparent pricing that grows with your school. Start your free trial today.
      </motion.p>
      
      {/* Billing Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mb-8"
      >
        <div className="bg-gray-100 p-1 rounded-full flex items-center">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              !isYearly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition relative ${
              isYearly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </motion.div>
    </div>

    {/* Pricing Tiers */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {tiers.map((tier, i) => {
        const priceData = tierPrices[currency][tier.name];
        const price = isYearly ? priceData.yearly : priceData.monthly;
        const isExpanded = expandedTiers[tier.name];
        
        return (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-lg p-8 flex flex-col justify-between border hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
              tier.highlight
                ? "border-blue-500 bg-white ring-2 ring-blue-500 ring-opacity-20"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {tier.highlight && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                <Star className="w-4 h-4 inline mr-1" />
                Most Popular
              </div>
            )}
            
            <div>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{tier.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize">{tier.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    {currencySymbols[currency]}{price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-green-600 text-sm font-medium mt-1">
                    Save {currencySymbols[currency]}{(priceData.monthly * 12 - priceData.yearly).toLocaleString()} per year
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Expandable Details */}
              <button
                onClick={() => toggleTierExpansion(tier.name)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mb-4"
              >
                <span className="text-gray-700 font-medium">
                  {isExpanded ? 'Hide' : 'View'} all features
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t pt-4 space-y-4">
                      {Object.entries(tier.detailedFeatures).map(([category, features]) => (
                        <div key={category}>
                          <h5 className="font-semibold text-gray-900 mb-2">{category}</h5>
                          <ul className="space-y-1">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-blue-500 mt-1">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
           
            <button
              onClick={() => setSignupOpen(true)}
              className={`w-full rounded-xl py-4 font-semibold shadow-md transition-all duration-200 ${
                tier.highlight
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Start Free Trial
            </button>
            <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />

          </motion.div>
        );
      })}
    </div>

    {/* Custom School System - Full Width */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
      className="rounded-2xl shadow-lg p-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 mr-3" />
          <h3 className="text-3xl font-bold">Custom School System</h3>
        </div>
        
        <p className="text-xl mb-8 text-purple-100">
          Need something unique? We'll build a tailored solution that perfectly fits your school's specific requirements and workflow.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-2">🎨 Custom Features</h4>
            <p className="text-sm text-purple-100">Unique functionalities built specifically for your processes</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-2">🔗 System Integration</h4>
            <p className="text-sm text-purple-100">Seamlessly connect with your existing tools and software</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold mb-2">🏫 Your Brand</h4>
            <p className="text-sm text-purple-100">Fully branded experience matching your school's identity</p>
          </div>
        </div>
        
        <a
          href="#contact"
          className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
        >
          Let's Build Something Amazing Together
          <span className="ml-2">→</span>
        </a>
      </div>
    </motion.div>
  </div>
</section>



      {/* contact */}
      <section className="py-24 px-4 sm:px-6 bg-white" id="contact">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-white text-center mb-20">
          Get in touch
        </h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 sm:gap-12 ">
          {/* Contact Information */}
          <motion.div 
            className="flex-1 bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contact Info</h3>
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
              <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              </div>
              <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              </div>
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
              <li><Link href="/demo">Need a school work mail ?</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/">About</Link></li>
              <li><Link href="#contact">Contact</Link></li>
              {/* <li><Link href="/terms">Terms</Link></li> */}
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
