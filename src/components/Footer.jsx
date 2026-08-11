import React from 'react';
import { Github, Instagram } from 'lucide-react';

const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const quickCtaLinks = [
    {
      name: 'GITHUB',
      url: 'https://github.com/serionmon',
      icon: <Github size={14} />,
      ariaLabel: 'GitHub @serionmon',
    },
    {
      name: 'X',
      url: 'https://x.com/Serionmon',
      icon: <XIcon size={14} />,
      ariaLabel: 'X @Serionmon',
    },
    {
      name: 'INSTAGRAM',
      url: 'https://www.instagram.com/irl.rohiit/',
      icon: <Instagram size={14} />,
      ariaLabel: 'Instagram @irl.rohiit',
    },
  ];

  return (
    <footer className="section-footer">
      {/* Social CTA Section */}
      <div className="footer-cta-wrapper">
        <div className="footer-cta-content">
          <span className="footer-cta-eyebrow">BUILT SOMETHING COOL?</span>
          <p className="footer-cta-heading">LET'S CONNECT.</p>
          <div className="footer-cta-buttons">
            {quickCtaLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta-pill"
                aria-label={link.ariaLabel}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-content">
        <p className="footer-title">
          HACKER HOUSE GOA 2026 • BUILDER IDENTITY
        </p>
        <p className="footer-subtext">
          100% Client-side &amp; Privacy Preserving. Share your graphic on X using{' '}
          <a
            href="https://x.com/search?q=%23FrameInGoa"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-hashtag-link"
          >
            #FrameInGoa
          </a>
        </p>
      </div>
    </footer>
  );
}

