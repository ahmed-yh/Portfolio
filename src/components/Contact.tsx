import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { profile } from '../data';
import { vars } from '../lib';
import IdBadge from './IdBadge';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkjwjgkr';

/** A letter on lined paper. The submit button is a postage stamp; success gets a postmark. */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const today = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <div className="grid gap-10">
      <div className="prose-gwern">
        <p>
          Let&apos;s work together. Whether it&apos;s a role, a project idea or just a hello, write me a letter and it lands straight in my inbox.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ink-muted">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{profile.location}</span>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>
        </p>
      </div>

      <IdBadge strap={70} base={200} />

      <p className="a-write -mb-4 -rotate-2 text-center font-hand text-2xl text-pen" style={vars({ base: 1600 })}>
        …or write me a letter ↓
      </p>

      <form onSubmit={handleSubmit} className="lined-paper a-drop relative px-6 pb-8 pt-6 sm:px-10" style={vars({ r: -1, base: 1800 })}>
        <span className="tape a-tape" aria-hidden="true" />
        <p className="mb-4 font-hand text-3xl text-pen">Dear Ahmed,</p>

        <div className="grid gap-x-8 sm:grid-cols-2">
          <label className="block">
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted">From</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="your name" className="letter-input" />
          </label>
          <label className="block">
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted">Reply to</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@somewhere.com" className="letter-input" />
          </label>
        </div>
        <label className="mt-2 block">
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted">Re:</span>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="what's this about?" className="letter-input" />
        </label>
        <label className="mt-2 block">
          <span className="sr-only">Message</span>
          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="tell me about your project or idea…" className="letter-input" />
        </label>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <p className="font-hand text-2xl text-ink-muted" aria-live="polite">
            {submitStatus === 'success' && <span className="text-pen">Letter received. I&apos;ll write back soon ✓</span>}
            {submitStatus === 'error' && <span className="text-redpen">It got lost in the mail. Try emailing me directly?</span>}
            {submitStatus === 'idle' && 'yours truly,'}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`postage font-marker text-lg disabled:cursor-wait disabled:opacity-60 ${submitStatus === 'success' ? 'a-hop' : ''}`}
          >
            <span>{isSubmitting ? 'posting…' : 'Send ✉'}</span>
            <span className="font-mono text-[0.6rem] tracking-widest">1 STAMP</span>
          </button>
        </div>

        {submitStatus === 'success' && (
          <span className="stamp stamp-round a-stamp absolute right-6 top-6 w-28 text-[0.65rem] sm:right-12" aria-hidden="true">
            sent
            <br />
            {today}
            <br />
            ★ amberg ★
          </span>
        )}
      </form>
    </div>
  );
};

export default Contact;
