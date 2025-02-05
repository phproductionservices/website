"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          We've reserved your ticket. Please complete checkout within 06:48 to secure your tickets.
        </div>

        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="First name" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Last name" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="Email address" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="confirmEmail">Confirm email address</Label>
            <Input id="confirmEmail" type="email" placeholder="Confirm email address" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex gap-2 mt-1">
              <Select defaultValue="US">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="US" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="CA">CA</SelectItem>
                </SelectContent>
              </Select>
              <Input id="phone" placeholder="The Premier Conference" className="flex-1" />
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6 h-fit">
        <h3 className="font-semibold text-xl mb-6">Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>1× STANDARD SINGLE (Admits 1)</span>
            <span>$12.56</span>
          </div>
          <div className="flex justify-between">
            <span>1× STANDARD SINGLE (Admits 1)</span>
            <span>$12.56</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Fees</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>$12.56</span>
            </div>
            <button className="text-blue-600 text-sm mb-4">Add discount code</button>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">$13.56</span>
            </div>
            <Link href="/ticket/payment">
              <Button className="w-full">Get Tickets</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}