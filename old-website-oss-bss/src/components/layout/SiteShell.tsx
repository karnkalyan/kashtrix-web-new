"use client";

import React, { useState } from "react";
import { LenisProvider } from "./LenisProvider";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RequestDemoModal } from "./RequestDemoModal";
import { PageTransition } from "./PageTransition";

export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--text-primary)]">
        <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <RequestDemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />
      </div>
    </LenisProvider>
  );
};
