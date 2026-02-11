import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactInfo = [
  { icon: Mail, label: 'hello@iamvicki.in', href: 'mailto:hello@iamvicki.in' },
  { icon: Phone, label: '+91 9572949137', href: 'tel:+919572949137' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919572949137' },
  { icon: Globe, label: 'iamvicki.in', href: 'https://iamvicki.in' },
  { icon: MapPin, label: 'India', href: null },
];

const serviceOptions = [
  'Business Website',
  'Portfolio Website',
  'School / College Website',
  'Full Stack Web Application',
  'Admin Dashboard',
  'Website Redesign',
  'Bug Fix / Maintenance',
  'Custom Project',
  'Not Sure (Need Consultation)'
];

const budgetOptions = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+',
  "Let's Discuss"
];

const timelineOptions = [
  'Within 1 Week',
  '2–4 Weeks',
  '1–2 Months',
  'Flexible'
];

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    budget: '',
    timeline: '',
    projectDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: '✅ Success!', description: data.message });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          serviceType: '',
          budget: '',
          timeline: '',
          projectDetails: ''
        });
      } else {
        toast({ title: '❌ Error', description: data.error || 'Failed to send inquiry' });
      }
    } catch (error) {
      toast({ title: '❌ Error', description: 'Failed to send inquiry. Please try again.' });
      console.error('Error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">Let's Build Something Powerful Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Have a project in mind? Fill out the form below and let's discuss your ideas!</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          <div className="space-y-5">
            {contactInfo.map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <c.icon className="w-5 h-5 text-primary shrink-0" />
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {c.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">{c.label}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <label className="text-sm font-medium">🧾 Basic Info</label>
              <Input 
                placeholder="Full Name *" 
                required 
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Email *" 
                type="email" 
                required 
                name="email" 
                value={formData.email}
                onChange={handleChange}
              />
              <Input 
                placeholder="Phone/WhatsApp (Optional)" 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">🛠 Service Type *</label>
              <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What service are you looking for?" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">💰 Budget Range</label>
              <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select estimated budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map(budget => (
                    <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <label className="text-sm font-medium">⏳ Expected Timeline</label>
              <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expected timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium">📝 Project Details *</label>
              <Textarea 
                placeholder="Describe your project requirements, features, references, or goals..." 
                required 
                name="projectDetails" 
                rows={5}
                value={formData.projectDetails}
                onChange={handleChange}
                className="resize-none scrollbar-hide"
              />
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>

            <Button type="submit" disabled={sending} className="w-full rounded-full gap-2 mt-6">
              <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
