"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/ph.jpg";

const speakers = [
  {
    name: "Amelia Laurent",
    role: "Founder & CEO",
    company:
      "Former co-founder of Chainstack. Early start at Spotify and Clearbit",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Nicolas Ochieng",
    role: "Engineering Manager",
    company: "Lead engineering team at Figma, Proto and Product Labs",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Sienna Hewitt",
    role: "Product Manager",
    company: "Former PM for Linear. Previously Stripe and DrChrono",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    name: "Lily-Rose Charley",
    role: "Frontend Developer",
    company: "Senior Developer for Linear, Coinbase, and Postscript",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=400&auto=format&fit=crop",
  },
];

const days = [
  { number: "1", date: "Mon, Sept 24" },
  { number: "2", date: "Tues, Sept 25" },
  { number: "3", date: "Wed, Sept 26" },
  { number: "4", date: "Thur, Sept 27" },
  { number: "5", date: "Fri, Sept 28" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="logo" width={100} height={40} />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-sm font-medium">
              About us
            </a>
            <a href="#" className="text-sm font-medium">
              Events
            </a>
            <a href="#" className="text-sm font-medium">
              Speakers
            </a>
            <a href="#" className="text-sm font-medium">
              Blog
            </a>
            <a href="#" className="text-sm font-medium">
              Tickets
            </a>
          </div>
          <Button className="bg-[#2562FF]">Contact Us</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#1e1e1e] h-[700px]">
        <div className="grid grid-cols-2 h-full">
          {/* Left Content Section */}
          <div className="flex flex-col justify-center px-8 text-white">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              The Premier Professional Conference of the Year
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Delux is a gathering for thought leaders, inventors, and tech
              entrepreneurs in the heart of NYC. 12th year running, this
              conference covers all things digital and innovation.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-[#2562FF]" size="lg">Get Tickets</Button>
              <Button className="text-black" size="lg" variant="outline">
                Book a stand
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full h-[700px]">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
              alt="Conference meeting"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Conference space"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                About the Premier Conference 2023
              </h2>
              <p className="text-gray-600 mb-6">
                The Annual Professional Conference is an exciting gathering of
                industry leaders, tech innovators, and professionals from across
                the country. This year's event will feature a wide range of
                sessions and workshops designed to help attendees stay ahead of
                the curve and achieve their professional goals.
              </p>
              <p className="text-gray-600">
                This year's conference will be held at the San Diego Convention
                Center in San Diego, California. With easy access to
                transportation, nearby hotels, and a wide range of dining and
                entertainment options, SDCC is the perfect place to host our
                premier conference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            Explore our events & workshops
          </h2>
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="mb-8">
              {days.map((day) => (
                <TabsTrigger
                  key={day.number}
                  value={day.number}
                  className="flex-1"
                >
                  <div className="text-left">
                    <div className="font-semibold">Day {day.number}</div>
                    <div className="text-sm opacity-80">{day.date}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="1">
              <Card className="bg-gray-800 border-gray-700">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Marketing workshop"
                        className="rounded-lg mb-6"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        Marketing Mastery Workshop
                      </h3>
                      <p className="text-gray-400 mb-6">
                        A practical workshop focusing on the success on the
                        Newcastle Markets system. Join our workshop, where we
                        dive deep around the focus in selected services and
                        products for the coming generations.
                      </p>
                      <div className="flex flex-col space-y-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>10am - 1pm</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5" />
                          <span>New York, USA</span>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <Button>Get Tickets</Button>
                        <Button variant="outline">Book a stand</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Highlight Speakers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((speaker) => (
              <Card key={speaker.name} className="overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{speaker.role}</p>
                  <p className="text-gray-600 text-sm">{speaker.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <span className="font-bold text-xl">Actos</span>
              </div>
              <p className="text-gray-400">info@example.com</p>
              <p className="text-gray-400">+1(555) 000-0000</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Events</li>
                <li>Team</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Help Center</li>
                <li>Contact us</li>
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
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Actos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
