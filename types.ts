import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'bot' | 'workflow' | 'analytics' | 'code';
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: ReactNode;
  color: string;
  benefits: string[];
  useCases: string[];
  technicalSpecs: { label: string; value: string }[];
  pricing: PricingTier[];
  faq?: FaqItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface AuditResult {
  analysis: string;
  suggestions: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  PROCESS = 'process',
  CLIENTS = 'clients',
  TESTIMONIALS = 'testimonials',
  AUDIT = 'audit',
  FAQ = 'faq',
  CONTACT = 'contact'
}