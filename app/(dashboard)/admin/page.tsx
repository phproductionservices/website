"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Users, 
  Ticket, 
  ArrowRight,
  Download,
  Mail,
  BarChart2,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const salesData = [
  { name: "Mon", sales: 2400 },
  { name: "Tue", sales: 1398 },
  { name: "Wed", sales: 9800 },
  { name: "Thu", sales: 3908 },
  { name: "Fri", sales: 4800 },
  { name: "Sat", sales: 3800 },
  { name: "Sun", sales: 4300 }
];

const events = [
  {
    id: 1,
    title: "The Premier Conference",
    date: "March 15-18, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "San Diego Convention Center",
    category: "Conference",
    ticketsSold: 350,
    totalTickets: 500,
    revenue: "£43,750",
    // image : "",
     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    status: "",
    ticketTypes: [
      { type: "Early Bird", sold: 100, total: 100, price: "£99" },
      { type: "Regular", sold: 200, total: 300, price: "£129" },
      { type: "VIP", sold: 50, total: 100, price: "£299" }
    ],
    recentAttendees: [
      { name: "John Doe", email: "john@example.com", ticketType: "VIP", purchaseDate: "2024-03-01" },
      { name: "Jane Smith", email: "jane@example.com", ticketType: "Regular", purchaseDate: "2024-03-02" },
      { name: "Mike Johnson", email: "mike@example.com", ticketType: "Early Bird", purchaseDate: "2024-03-03" }
    ],
    analytics: {
      dailyViews: 1200,
      conversionRate: "3.5%",
      averageOrderValue: "£175",
      topReferrers: ["Google", "Facebook", "Direct"]
    }
  },
  {
    id: 2,
    title: "Summer Music Festival",
    date: "June 21-23, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Riverside Park",
    category: "Festival",
    ticketsSold: 1500,
    totalTickets: 2000,
    revenue: "£75,000",
    // image : "",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    status: "",
    ticketTypes: [
      { type: "General Admission", sold: 1000, total: 1500, price: "£49" },
      { type: "VIP", sold: 500, total: 500, price: "£149" }
    ],
    recentAttendees: []
  },
  {
    id: 3,
    title: "Tech Innovation Summit",
    date: "April 5, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Metropolitan Conference Center",
    category: "Corporate",
    ticketsSold: 280,
    totalTickets: 300,
    revenue: "£84,000",
    // image : "",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
    status: "",
    ticketTypes: [
      { type: "Professional", sold: 200, total: 200, price: "£299" },
      { type: "Executive", sold: 80, total: 100, price: "£499" }
    ],
    recentAttendees: []
  }
];

export default function AdminDashboard() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [showEmailModal, setShowEmailModal] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'almost sold out':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  const handleSendEmail = () => {
    setShowEmailModal(true);
  };

  const handleDownloadAttendees = () => {
    // Simulate CSV download
    const csvContent = "data:text/csv;charset=utf-8,Name,Email,Ticket Type,Purchase Date\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8">
      {!selectedEvent ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Events</h1>
            <Link href="/admin/events/create">
              <Button>Add new event</Button>
            </Link>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">£202,750</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2 text-sm text-green-500">+12.5% from last month</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Events</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2 text-sm text-blue-500">2 starting this week</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tickets Sold</p>
                  <p className="text-2xl font-bold">2,130</p>
                </div>
                <Ticket className="w-8 h-8 text-purple-500" />
              </div>
              <div className="mt-2 text-sm text-purple-500">+5.2% from last week</div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <div className="mt-2 text-sm text-orange-500">+0.8% from last month</div>
            </Card>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            {filteredEvents.map((event) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table key={event.id} className="w-full cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedEvent(event)}>
              <tbody>
                <tr>
                
                  <td rowSpan={4}className="relative w-48 p-0">
                  </td>
                  <td className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      </div>
                      <span className="text-blue-600 font-semibold">{event.revenue}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 pt-0">
                    <div className="space-y-2">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedEvent(null)}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Events
            </Button>
            <div className="flex gap-4">
              <Button variant="outline">Edit Event</Button>
              <Button variant="destructive">Cancel Event</Button>
            </div>
          </div>

          <div className="flex gap-4 border-b">
            {["overview", "attendees",].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm">{selectedEvent.date}</p>
                        <p className="text-sm">{selectedEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm">{selectedEvent.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {selectedEvent.recentAttendees.map((attendee: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-gray-500">{attendee.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{attendee.ticketType}</p>
                            <p className="text-sm text-gray-500">{attendee.purchaseDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#2563eb" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Ticket className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Total Sales</p>
                          <p className="font-semibold">{selectedEvent.revenue}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Attendance</p>
                          <p className="font-semibold">
                            {selectedEvent.ticketsSold}/{selectedEvent.totalTickets}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <BarChart2 className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Conversion Rate</p>
                          {/* <p className="font-semibold">{selectedEvent.analytics.conversionRate}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleDownloadAttendees}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Attendee List
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleSendEmail}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email to Attendees
                    </Button>
                    <Button className="w-full" variant="outline">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      View Check-in Status
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
                  <div className="space-y-4">
                    {selectedEvent.ticketTypes.map((ticket: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{ticket.type}</h4>
                            <p className="text-sm text-gray-500">Price: {ticket.price}</p>
                          </div>
                          <Badge className={getStatusColor(
                            ticket.sold === ticket.total ? 'Sold Out' : 'Available'
                          )}>
                            {ticket.sold === ticket.total ? 'Sold Out' : 'Available'}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sold</span>
                            <span>{ticket.sold}/{ticket.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 rounded-full h-2"
                              style={{ width: `${calculateProgress(ticket.sold, ticket.total)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>
                <div className="space-y-4">
                  {selectedEvent.analytics.topReferrers.map((referrer: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>{referrer}</span>
                      <span className="text-blue-600 font-medium">
                        {Math.floor(Math.random() * 1000)} visits
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Daily Page Views</p>
                    <p className="text-2xl font-bold">{selectedEvent.analytics.dailyViews}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="text-2xl font-bold">{selectedEvent.analytics.averageOrderValue}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "attendees" && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Attendee List</h3>
                <Button variant="outline" onClick={handleDownloadAttendees}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Ticket Type</th>
                      <th className="text-left p-4">Purchase Date</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEvent.recentAttendees.map((attendee: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{attendee.name}</td>
                        <td className="p-4">{attendee.email}</td>
                        <td className="p-4">{attendee.ticketType}</td>
                        <td className="p-4">{attendee.purchaseDate}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Event Settings</h3>
                <div className="space-y-4">
                  <div>
                  
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                 
                  <div>
                  
                    <Input type="number" defaultValue="10" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reminder schedule</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}