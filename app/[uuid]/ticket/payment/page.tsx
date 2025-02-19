"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          We've reserved your ticket. Please complete checkout within 06:48 to secure your tickets.
        </div>

        <h2 className="text-2xl font-bold mb-8">Payment Options</h2>

        <RadioGroup defaultValue="card" className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe">Stripe</Label>
            </div>
            <img src="/stripe.svg" alt="Stripe" className="h-6" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <img src="/paypal.svg" alt="PayPal" className="h-6" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit card</Label>
            </div>
            <div className="flex space-x-2">
              <img src="/visa.svg" alt="Visa" className="h-6" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </RadioGroup>

        <div className="mt-8 space-y-6">
          <div>
            <Label htmlFor="cardNumber">Card number</Label>
            <Input id="cardNumber" placeholder="0000 - 0000 - 0000 - 0000" className="mt-1" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Label htmlFor="expiry">MM/YY</Label>
              <Input id="expiry" placeholder="MM/YY" className="mt-1" />
            </div>
            <div className="col-span-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="CVV" className="mt-1" />
            </div>
            <div className="col-span-1">
              <Label htmlFor="postal">Postal code</Label>
              <Input id="postal" placeholder="" className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6 h-fit">
        <h3 className="font-semibold text-xl mb-6">Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>1× STANDARD SINGLE (Admits 1)</span>
            <span>£12.56</span>
          </div>
          <div className="flex justify-between">
            <span>1× STANDARD SINGLE (Admits 1)</span>
            <span>£12.56</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Fees</span>
              <span>£0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>£12.56</span>
            </div>
            <button className="text-blue-600 text-sm mb-4">Add discount code</button>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">£13.56</span>
            </div>
            <Link href="/ticket/get-ticket">
              <Button className="w-full">Get Tickets</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}