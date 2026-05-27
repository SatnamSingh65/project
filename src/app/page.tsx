"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemStatement from "@/components/landing/ProblemStatement";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import Working from "@/components/landing/Working";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQs from "@/components/landing/FAQs";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemStatement />
      <FeatureShowcase />
      <Working />
      <Pricing />
      <Testimonials />
      <FAQs />
      <FinalCTA />
      <Footer />
    </>
  );
}
