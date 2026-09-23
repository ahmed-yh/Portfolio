import { useState, type CSSProperties, type MouseEvent } from 'react';
import { Check, Copy, Linkedin, MessageCircle, Phone } from 'lucide-react';
import Scribble from './Scribble';
import { photos, profile } from '../data';
import { vars } from '../lib';

/**
 * Contact card as a sketchbook pass on a lanyard (after cestclair.me's ID badge):
 * the strap hangs from above, the card swings in on its clip and keeps swaying.
 */
export default function IdBadge({ strap = 90, base = 0 }: { strap?: number; base?: number }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string) => (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.querySelector('span');
    navigator.clipboard
      ?.writeText(value)
      .then(() => setCopied(value))
      .catch(() => {
        // clipboard refused (some app views): select it so it can be copied by hand
        if (text) window.getSelection()?.selectAllChildren(text);
      });
  };

  const copyRow = (value: string, label: string, Icon: typeof Phone) => (
    <button type="button" onClick={copy(value)} className="badge-row group" aria-label={copied === value ? `${label} copied` : `Copy ${label} ${value}`}>
      <span className="break-all">{value}</span>
      {copied === value ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-[#2F4A8A]" aria-hidden="true" />
      ) : (
        <Icon className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
      )}
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <span className="badge-strap" style={{ height: strap }} aria-hidden="true" />

      <div className="a-swing sway relative" style={{ ...vars({ r: -1, base }), '--amp': '2.4deg' } as CSSProperties}>
        {/* clip + ring */}
        <svg className="absolute left-1/2 top-0 z-20 h-12 w-8 -translate-x-1/2 -translate-y-9" viewBox="0 0 32 48" aria-hidden="true">
          <defs>
            <linearGradient id="steel" x1="0" x2="1">
              <stop offset="0" stopColor="#8E8E93" />
              <stop offset="0.45" stopColor="#F2F2F4" />
              <stop offset="1" stopColor="#7A7A80" />
            </linearGradient>
          </defs>
          <rect x="9" y="0" width="14" height="30" rx="5" fill="url(#steel)" stroke="#6B6459" strokeWidth="0.8" />
          <rect x="13.5" y="20" width="5" height="5" rx="1.5" fill="#3D3A33" />
          <circle cx="16" cy="38" r="6" fill="none" stroke="url(#steel)" strokeWidth="3" />
        </svg>

        {/* star charm dangling off the ring */}
        <span className="badge-charm absolute left-1/2 top-3 z-20 -ml-2 flex flex-col items-center" aria-hidden="true">
          <span className="h-5 border-l-2 border-dotted border-[#8E8E93]" />
          <Scribble type="star" color="#C4A77D" className="h-5 w-5 drop-shadow" />
        </span>

        <div className="badge-sleeve">
          <div className="badge-card">
            <div className="flex justify-between border-b border-[#2D2A24]/15 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#6B6459]">
              <span>sketchbook pass</span>
              <span>ID N° 2026</span>
            </div>

            <div className="mt-3 flex gap-4">
              <div className="aspect-[4/5] w-20 shrink-0 self-start overflow-hidden rounded-md shadow-sm sm:w-32">
                <img src={photos.badge} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-[50%_38%]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-type text-2xl leading-[1.05] sm:text-[1.7rem]">
                  Ahmed Yassine
                  <br />
                  HACHEM
                </p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#6B6459]">open to work · AI engineer</p>

                <div className="mt-2">
                  {copyRow(profile.email, 'email', Copy)}
                  {copyRow(profile.phone, 'phone number', Phone)}
                  <a href={profile.whatsappLink} target="_blank" rel="noopener noreferrer" className="badge-row group" aria-label={`WhatsApp ${profile.whatsapp}`}>
                    <span className="break-all">{profile.whatsapp}</span>
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="badge-row group">
                    <span className="break-all">in/ahmed-yh</span>
                    <Linkedin className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-2 font-hand text-lg leading-tight text-[#2F4A8A]" aria-live="polite">
                  {copied ? 'copied! talk soon ✦' : 'whatsapp friendly :) ✆'}
                </p>
              </div>
            </div>

            <span className="stamp a-stamp absolute -bottom-1 left-3 text-[0.6rem] text-[#8A6F42]" style={vars({ base: base + 1300 })}>
              ✦ verified human ✦
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
