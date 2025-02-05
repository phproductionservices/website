"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function StandPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">Book a stand</h1>
      <p className="text-center text-gray-600 mb-12">Business Market Showcase Registration Form</p>

      <form className="space-y-8">
        <div>
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" placeholder="Contact Name" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="businessName">Business / Organisation Name</Label>
          <Input id="businessName" placeholder="Business / Organisation Name" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="email">Contact Email Address</Label>
          <Input id="email" type="email" placeholder="Contact Email Address" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="phone">Contact Number</Label>
          <Input id="phone" placeholder="Contact Number" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="address">
            Please provide your Business or planned Business address including postcode
          </Label>
          <Textarea
            id="address"
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="description">Please give a description of your business</Label>
          <Textarea
            id="description"
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label className="mb-4 block">Do you have appropriate business insurance cover?</Label>
          <RadioGroup defaultValue="no">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="insurance">Insurance Policy Number and Expiry date</Label>
          <Input id="insurance" className="mt-1" />
        </div>

        <div>
          <Label className="mb-4 block">Which day would you like to showcase?</Label>
          <RadioGroup defaultValue="day1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="day1" id="day1" />
              <Label htmlFor="day1">Monday 10th March 2025</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="day2" id="day2" />
              <Label htmlFor="day2">Monday 10th March 2025</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="day3" id="day3" />
              <Label htmlFor="day3">Monday 10th March 2025</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-4 block">
            Have you received funding or support from any of the following?
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="council" />
              <Label htmlFor="council">Newcastle Under Lyme Borough Council</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="funding" />
              <Label htmlFor="funding">UK shared prosperity funding</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="county" />
              <Label htmlFor="county">Staffordshire County Council</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}