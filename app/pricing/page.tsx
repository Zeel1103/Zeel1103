"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowLeft, Star, ArrowRight, Sparkles, Shield, Headphones } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'month',
      description: 'Perfect for trying out our AI medical service',
      features: [
        { name: '3 free consultations', included: true },
        { name: 'AI medical diagnosis', included: true },
        { name: 'Text-based consultations', included: true },
        { name: 'Basic health records', included: true },
        { name: 'Appointment scheduling', included: false },
        { name: 'Prescription management', included: false },
        { name: 'Health analytics dashboard', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Get Started Free',
      highlighted: false,
      gradient: '',
    },
    {
      name: 'Professional',
      price: '$29.99',
      period: 'month',
      description: 'Best for regular health monitoring & care',
      features: [
        { name: 'Unlimited consultations', included: true },
        { name: 'AI & Human doctor support', included: true },
        { name: 'Voice & text consultations', included: true },
        { name: 'Appointment scheduling', included: true },
        { name: 'Prescription management', included: true },
        { name: 'Health analytics dashboard', included: true },
        { name: 'Family sharing (3 members)', included: true },
        { name: 'Priority support', included: true }
      ],
      cta: 'Subscribe Now',
      highlighted: true,
      gradient: 'from-sky-500 to-blue-600',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For hospitals, clinics & organizations',
      features: [
        { name: 'Unlimited users', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'HIPAA compliance', included: true },
        { name: 'Multi-location support', included: true },
        { name: 'API access', included: true },
        { name: '24/7 phone support', included: true }
      ],
      cta: 'Contact Sales',
      highlighted: false,
      gradient: '',
    }
  ];

  return (
    <div className='w-full'>
      <Link href="/dashboard" className='inline-block mb-8'>
        <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Button>
      </Link>

      {/* Header */}
      <div className='mb-14 text-center'>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span className="text-sm font-semibold text-sky-600">Pricing Plans</span>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900'>
          Simple, Transparent
          <span className="gradient-text block sm:inline"> Pricing</span>
        </h1>
        <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
          Choose the plan that fits your healthcare needs. Cancel anytime, no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className='grid md:grid-cols-3 gap-6 mb-16 items-start'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-3xl transition-all duration-300 overflow-hidden ${
              plan.highlighted
                ? 'relative ring-2 ring-sky-400 shadow-xl shadow-sky-100/50 scale-[1.03]'
                : 'card-elevated'
            }`}
          >
            {plan.highlighted && (
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-white" />
                Most Popular
              </div>
            )}

            <div className={`p-8 ${plan.highlighted ? 'bg-white' : ''}`}>
              <h2 className='text-xl font-bold text-gray-900 mb-1'>{plan.name}</h2>
              <p className='text-gray-500 text-sm mb-5'>{plan.description}</p>
              
              <div className='mb-6'>
                <span className='text-4xl font-extrabold text-gray-900'>{plan.price}</span>
                {plan.price !== 'Custom' && <span className='text-gray-400 ml-1.5'>/{plan.period}</span>}
              </div>

              <Link href={plan.price === 'Custom' ? '#contact' : '/dashboard'}>
                <button className={`w-full font-semibold text-sm py-3.5 rounded-2xl transition-all ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {plan.cta}
                </button>
              </Link>
            </div>

            <div className={`px-8 pb-8 pt-4 border-t ${plan.highlighted ? 'border-gray-100 bg-white' : 'border-gray-100'}`}>
              <p className='text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-4'>What&apos;s included</p>
              <div className='space-y-3'>
                {plan.features.map((feature, fi) => (
                  <div key={fi} className='flex items-center gap-3'>
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Check className='w-3 h-3 text-emerald-500' />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <X className='w-3 h-3 text-gray-300' />
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Shield, title: "HIPAA Compliant", desc: "Enterprise-grade security for all your health data", color: "bg-emerald-50 text-emerald-500" },
          { icon: Headphones, title: "24/7 Support", desc: "Our support team is always ready to help you", color: "bg-violet-50 text-violet-500" },
          { icon: Star, title: "99.9% Uptime", desc: "Reliable service when you need it most", color: "bg-amber-50 text-amber-500" },
        ].map((badge, i) => (
          <div key={i} className="card-elevated p-6 text-center">
            <div className={`w-12 h-12 rounded-2xl ${badge.color} mx-auto mb-3 flex items-center justify-center`}>
              <badge.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{badge.title}</h4>
            <p className="text-sm text-gray-500">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className='card-elevated p-10 max-w-4xl mx-auto mb-16'>
        <h3 className='text-2xl font-bold mb-8 text-center text-gray-900'>Frequently Asked Questions</h3>
        <div className='grid md:grid-cols-2 gap-8'>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! Cancel your subscription at any time with no penalty or hidden fees.' },
            { q: 'Do you offer a free trial?', a: 'Start with our free Starter plan. Get 3 consultations with no credit card required.' },
            { q: 'Is my data secure?', a: 'All medical data is encrypted and HIPAA compliant for paid plans.' },
            { q: 'Can I upgrade or downgrade?', a: 'Change your plan anytime. Prorated adjustments at next billing cycle.' },
            { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, American Express, and popular digital payment methods.' },
            { q: 'Do you have student discounts?', a: 'Yes! Contact support@healthai.com for student and healthcare worker pricing.' },
          ].map((faq, i) => (
            <div key={i}>
              <h4 className='font-semibold text-gray-900 mb-1.5'>{faq.q}</h4>
              <p className='text-gray-500 text-sm leading-relaxed'>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className='card-elevated overflow-hidden mb-8'>
        <div className='bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 p-10 text-center'>
          <h3 className='text-2xl font-bold mb-3 text-white'>Ready to prioritize your health?</h3>
          <p className='text-sky-100 mb-6 max-w-lg mx-auto text-sm'>
            Join thousands of people taking control of their health with AI-powered medical consultations.
          </p>
          <div className='flex gap-3 justify-center'>
            <Link href="/dashboard">
              <button className='px-8 py-3 rounded-2xl font-semibold text-sky-600 bg-white hover:bg-gray-50 transition-all text-sm shadow-lg'>
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
