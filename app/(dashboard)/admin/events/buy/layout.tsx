"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EventBuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/events" className="text-sm flex items-center text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to events
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/admin/events" className="text-gray-500 hover:text-gray-900">
                    Events
                  </Link>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <span className="text-gray-900">The Premier Conference</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}