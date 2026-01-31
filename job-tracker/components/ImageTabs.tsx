'use client'
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

type Tab = 'organize' | 'hired' | 'boards';

const TABS_CONFIG: Record<Tab, { label: string; src: string }> = {
  organize: { label: "Organize Applications", src: "/hero-images/hero1.png" },
  hired: { label: "Get Hired", src: "/hero-images/hero2.png" },
  boards: { label: "Manage Boards", src: "/hero-images/hero3.png" },
};

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("organize");

  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            {(Object.keys(TABS_CONFIG) as Tab[]).map((tab) => (
              <Button 
                key={tab} 
                variant={activeTab === tab ? "default" : "outline"} // Visual feedback
                onClick={() => setActiveTab(tab)}
              >
                {TABS_CONFIG[tab].label}
              </Button>
            ))}
          </div>

          {/* Image Display */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            <Image
              src={TABS_CONFIG[activeTab].src}
              alt={TABS_CONFIG[activeTab].label}
              width={1200}
              height={800}
              priority // Use Next.js priority for hero images
              className="transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
