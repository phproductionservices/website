"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin, ArrowRight, Zap, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const speakers = [
  {
    name: "Amelia Laurent",
    role: "Founder & CEO",
    company: "Former co-founder of Chainstack. Early start at Spotify and Clearbit",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Nicolas Ochieng",
    role: "Engineering Manager",
    company: "Lead engineering team at Figma, Proto and Product Labs",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Sienna Hewitt",
    role: "Product Manager",
    company: "Former PM for Linear. Previously Stripe and DrChrono",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Lily-Rose Charley",
    role: "Frontend Developer",
    company: "Senior Developer for Linear, Coinbase, and Postscript",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=400&auto=format&fit=crop",
  },
];

const days = [
  { number: "1", date: "Mon, Sept 24" },
  { number: "2", date: "Tues, Sept 25" },
  { number: "3", date: "Wed, Sept 26" },
  { number: "4", date: "Thur, Sept 27" },
  { number: "5", date: "Fri, Sept 28" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [speakersRef, speakersInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const navItems = [
    { label: "About us", action: () => scrollToSection('about') },
    { label: "Events", href: "/admin/events" },
    { label: "Speakers", action: () => scrollToSection('speakers') },
    { label: "Tickets", href: "/ticket" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/PH.png"
                alt="PH Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                item.href ? (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button 
                    key={index}
                    onClick={item.action}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Link href="/contact">
                <Button className="bg-[#2562FF] hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <motion.div className="container mx-auto px-4 py-6 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={menuItemVariants}
                    className="border-b border-gray-100 last:border-0"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block py-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="block w-full text-left py-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg font-medium"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  custom={navItems.length}
                >
                  <Link href="/contact">
                    <Button 
                      className="w-full bg-[#2562FF] hover:bg-blue-700 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#1e1e1e] min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#1e1e1e] to-[#1e1e1e]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="flex flex-col justify-center text-white"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-600/10 border border-blue-500/20"
              >
                <span className="text-blue-400">2024 Premier Tech Conference</span>
              </motion.div>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
              >
                The Premier Professional Conference of the Year
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-300 mb-8"
              >
                Delux is a gathering for thought leaders, inventors, and tech
                entrepreneurs in the heart of NYC. 12th year running, this
                conference covers all things digital and innovation.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
               <Link href="/ticket">
                <Button 
                  className="bg-[#2562FF] hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto" 
                  size="lg"
                >
                  Get Tickets <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                {/* <Link href="/ticket/stand">
                  <Button 
                    className="text-white border-white hover:bg-white text-black hover:text-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto" 
                    size="lg" 
                    variant="outline"
                  >
                    Book a stand
                  </Button>
                </Link> */}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full min-h-[400px] lg:min-h-[700px] mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e1e] via-transparent to-transparent w-[20%] z-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent h-[20%] bottom-0 z-20"></div>
              
              <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-l-[3rem]">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                  alt="Conference meeting"
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 z-30"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Next Event</p>
                      <p className="text-sm text-gray-300">March 15-18, 2024</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 text-black w-full sm:w-auto"
                  >
                    Get Ticket Now
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Reveal on Scroll */}
      <section id="about" ref={aboutRef} className="bg-gray-50 py-32 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Conference space"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-4xl font-bold mb-6">
                About the Premier Conference 2023
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                The Annual Professional Conference is an exciting gathering of
                industry leaders, tech innovators, and professionals from across
                the country. This year's event will feature a wide range of
                sessions and workshops designed to help attendees stay ahead of
                the curve and achieve their professional goals.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                This year's conference will be held at the San Diego Convention
                Center in San Diego, California. With easy access to
                transportation, nearby hotels, and a wide range of dining and
                entertainment options, SDCC is the perfect place to host our
                premier conference.
              </p>
              <Button className="mt-6" variant="outline">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Speakers Section with Card Animations */}
      <section id="speakers" ref={speakersRef} className="py-32 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={speakersInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-bold mb-16 text-center"
          >
            Meet Our Speakers
          </motion.h2>
          <motion.div 
            initial="hidden"
            animate={speakersInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{speaker.role}</p>
                    <p className="text-gray-600 text-sm">{speaker.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer with Gradient */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">PH Productions</span>
              </div>
              <p className="text-gray-400">info@example.com</p>
              <p className="text-gray-400">01782 971 014</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <Link href="/admin/events" className="hover:text-white transition-colors cursor-pointer">
                    Events
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('speakers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Speakers
                  </button>
                </li>
                <li>
                  <Link href="/ticket" className="hover:text-white transition-colors cursor-pointer">
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Terms</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Subscribe Now</h4>
              <p className="text-gray-400 mb-4">
                Express to join our community! Stay informed & inspired. Enter
                your email below to join our community.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 Actos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}