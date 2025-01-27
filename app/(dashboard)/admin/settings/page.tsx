"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&auto=format&fit=crop",
    dateAdded: "Feb 22, 2022"
  },
  {
    id: 2,
    name: "Phoenix Baker",
    email: "olivia@untitledui.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&auto=format&fit=crop",
    dateAdded: "Feb 22, 2022"
  },
  {
    id: 3,
    name: "Lana Steiner",
    email: "olivia@untitledui.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&auto=format&fit=crop",
    dateAdded: "Feb 22, 2022"
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-8">Settings</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-white rounded-lg p-6 space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop" />
                    <AvatarFallback>OR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Your photo</p>
                    <p className="text-sm text-gray-500">This will be displayed on your profile.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile number</Label>
                  <Input id="mobile" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job title</Label>
                  <Input id="jobTitle" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="organization">Organization/company</Label>
                  <Input id="organization" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="blog">Blog</Label>
                  <Input id="blog" className="mt-1" />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" className="mt-1" />
              </div>

              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <Label>City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="sf">San Francisco</SelectItem>
                      <SelectItem value="la">Los Angeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Teams</h2>
                <p className="text-sm text-gray-500">
                  Admins can add and remove users and manage organization-level settings.
                </p>
              </div>
              <Button>Add member</Button>
            </div>

            <div className="border rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="w-8 p-4">
                      <Checkbox />
                    </th>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Email address</th>
                    <th className="text-left p-4 font-medium">Date added</th>
                    <th className="w-20 p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b last:border-0">
                      <td className="p-4">
                        <Checkbox />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </td>
                      <td className="p-4">{member.email}</td>
                      <td className="p-4">{member.dateAdded}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold mb-6">Change Password</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input id="confirmPassword" type="password" className="mt-1" />
              </div>
              <Button>Update password</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}