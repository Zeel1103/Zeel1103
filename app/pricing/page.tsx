"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying out our service',
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
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$29.99',
      period: '/month',
      description: 'Best for regular health monitoring',
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
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For organizations & clinics',
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
      highlighted: false
    }
  ];

  return (
    <div className='w-full'>
      {/* Back Button */}
      <Link href="/dashboard" className='inline-block mb-8'>
        <Button variant="outline">← Back to Dashboard</Button>
      </Link>

      {/* Header */}
      <div className='mb-16 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
          Transparent Healthcare Pricing
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          Choose the perfect plan for your healthcare needs. All plans include 24/7 AI medical support. Cancel anytime, no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className='grid md:grid-cols-3 gap-8 mb-16'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl transition-all duration-300 ${
              plan.highlighted
                ? 'border-2 border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
                : 'border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl bg-white dark:bg-gray-900'
            }`}
          >
            {/* Card Header */}
            <div className='p-8 border-b border-gray-100 dark:border-gray-800'>
              {plan.highlighted && (
                <div className='mb-4 inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold'>
                  ⭐ Most Popular
                </div>
              )}

              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>{plan.name}</h2>
              <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>{plan.description}</p>
              
              <div className='mb-6'>
                <span className='text-5xl font-bold text-gray-900 dark:text-white'>{plan.price}</span>
                {plan.price !== 'Custom' && <span className='text-gray-600 dark:text-gray-400 ml-2'>/{plan.period}</span>}
              </div>

              <Link href={plan.price === 'Custom' ? '#contact' : '/dashboard'}>
                <Button 
                  className={`w-full font-medium text-base py-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                      : 'bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>

            {/* Features List */}
            <div className='p-8'>
              <p className='text-xs uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400 mb-6'>
                What's included
              </p>
              <div className='space-y-4'>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className='flex items-start gap-3'>
                    {feature.included ? (
                      <Check className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
                    ) : (
                      <X className='w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5' />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-12 max-w-4xl mx-auto border border-blue-200 dark:border-blue-800'>
        <h3 className='text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white'>Frequently Asked Questions</h3>
        
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>Can I cancel anytime?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Yes, absolutely. Cancel your subscription at any time without penalty. No long-term contracts or hidden cancellation fees.
            </p>
          </div>
          
          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>Do you offer a free trial?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Yes! Start with our Starter plan and get 3 free consultations. No credit card required to get started.
            </p>
          </div>

          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>Is my data secure?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Absolutely. All medical data is encrypted using industry-standard protocols and fully HIPAA compliant for paid plans.
            </p>
          </div>

          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>Can I upgrade or downgrade?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Yes! Change your plan anytime. Changes take effect at your next billing cycle with prorated adjustments.
            </p>
          </div>

          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>What payment methods do you accept?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              We accept all major credit cards (Visa, Mastercard, American Express) and digital payment methods.
            </p>
          </div>

          <div>
            <h4 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>Do you have student discounts?</h4>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Yes! Contact our team at support@healthai.com for special student and healthcare worker discounts.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='mt-16 text-center'>
        <h3 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>Ready to prioritize your health?</h3>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
          Join thousands of people taking control of their health with AI-powered medical consultations available 24/7.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href="/dashboard">
            <Button className='bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-base font-medium'>
              Start Your Free Trial
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" className='px-8 py-3 text-base font-medium'>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
