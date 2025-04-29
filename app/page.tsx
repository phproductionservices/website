"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  Zap,
  Menu,
  X,
  Phone,
  Mail,
  MapPinned,
  Headphones,
  Music,
  Video,
  Lightbulb,
  Speaker,
  Mic,
  MonitorPlay,
  Users,
  Award,
  Globe,
  CheckCircle,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const services = [
  {
    icon: Headphones,
    title: "Sound Systems",
    description: "Professional audio solutions for crystal-clear sound at any venue size"
  },
  {
    icon: Video,
    title: "Video Production",
    description: "High-quality video capture and live streaming services"
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Creative lighting solutions to enhance your event's atmosphere"
  },
  {
    icon: Speaker,
    title: "PA Systems",
    description: "Complete PA system rental and setup for any event type"
  },
  {
    icon: Mic,
    title: "Stage Management",
    description: "Professional stage setup and management services"
  },
  {
    icon: MonitorPlay,
    title: "AV Integration",
    description: "Seamless integration of audio-visual equipment for your event"
  }
];

const events = [
  {
    id: 1,
    title: "The Premier Conference",
    date: "March 15-18, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "San Diego Convention Center",
    category: "Conference",
    price: "",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    attendees: "500+"
  },
  {
    id: 2,
    title: "Summer Music Festival",
    date: "June 21-23, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Riverside Park",
    category: "Festival",
    price: "",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    attendees: "2000+"
  },
  {
    id: 3,
    title: "Tech Innovation Summit",
    date: "April 5, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Metropolitan Conference Center",
    category: "Corporate",
    price: "",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
    attendees: "300"
  },
  {
    id: 4,
    title: "Cultural Arts Festival",
    date: "May 12, 2024",
    time: "11:00 AM - 8:00 PM",
    location: "City Arts Center",
    category: "Arts",
    price: "",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=500&fit=crop",
    attendees: "1000+"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "About", action: () => scrollToSection("about") },
    { label: "Services", action: () => scrollToSection("services") },
    { label: "Events", action: () => scrollToSection("events") },
    { label: "Contact", href: "/contact" }
  ];

  const achievements = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team consists of industry veterans with decades of combined experience in event production."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in event production and technical innovation."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Successfully delivered events across multiple countries and continents."
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "ISO certified processes ensuring consistent, high-quality delivery."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
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

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) =>
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
              )}
           
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4"
              >
                {navItems.map((item, index) => (
                  <div key={index} className="py-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="block w-full text-left text-gray-600 hover:text-blue-600"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          {/* Main background image */}
          <div className="absolute inset-0 z-10">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070"
              alt="Event production"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50" />
          
          {/* Floating images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-1/4 right-20 z-30 hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400&h=300"
              alt="Event"
              className="rounded-lg shadow-2xl transform -rotate-6"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-1/4 right-40 z-30 hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400&h=300"
              alt="Event"
              className="rounded-lg shadow-2xl transform rotate-6"
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-3xl text-white"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/20 text-blue-400 text-sm">
                Professional Event Production Services
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Bringing Your Events to Life
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Expert sound, lighting, and AV solutions for any event. From intimate gatherings to large-scale productions.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={() => scrollToSection("events")}
                >
                  Our Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              
              <Button
                size="lg"
               
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                onClick={() => scrollToSection("services")}
              >
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 text-white text-center"
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="w-6 h-6 mx-auto animate-bounce" />
        </motion.div>
      </section>

      {/* Enhanced Stats Section with Background Image */}
      <section ref={statsRef} className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=2070"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Events Produced" },
              { number: "50k+", label: "Happy Attendees" },
              { number: "15+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid lg:grid-cols-2 gap-16 items-center"
            ref={aboutRef}
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600&h=800"
                  alt="Event production team"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 z-20">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Event setup"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full opacity-20"></div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h4 className="text-blue-600 font-semibold mb-4">About Us</h4>
                <h2 className="text-4xl font-bold mb-6">
                  Crafting Unforgettable Event Experiences Since 2010
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  PH Productions has been at the forefront of event production for over a decade, 
                  delivering exceptional experiences that combine technical excellence with creative innovation. 
                  Our journey began with a simple mission: to transform events into unforgettable moments.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, we're proud to be one of the UK's leading event production companies, 
                  trusted by brands, organizations, and individuals to bring their visions to life 
                  through cutting-edge technology and unparalleled expertise.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => scrollToSection("services")}
                >
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/contact">
                  <Button variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Comprehensive production solutions for any event
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <service.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        ref={projectsRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-4"
            >
              Upcoming Events
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Join us at our next exciting events
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-8"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative">
                  <div className="aspect-video">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
                <Link href={`/1`}>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                 
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">{event.price}</span>
                  
                  </div>
                
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/admin/events">
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-blue-600 hover:text-white"
              >
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Create Something Amazing?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how we can bring your vision to life
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">PH Production Services Ltd</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  <p>01782 971 014</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  <p>office@phproductionservices.co.uk</p>
                </div>
                <div className="flex items-center">
                  <MapPinned className="w-5 h-5 mr-2 text-blue-600" />
                  <p>Newcastle-under-Lyme, Newcastle ST5 1EJ, UK</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 5).map((service, index) => (
                  <li
                    key={index}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 PH Productions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}