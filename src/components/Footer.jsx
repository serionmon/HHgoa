import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/serionmon',
      icon: <Github size={14} />,
      ariaLabel: 'GitHub profile @serionmon',
      title: 'GitHub: @serionmon',
      isExternal: true,
    },
    {
      name: 'X',
      url: 'https://x.com/Serionmon',
      icon: <XIcon size={14} />,
      ariaLabel: 'X profile @Serionmon',
      title: 'X: @Serionmon',
      isExternal: true,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/irl.rohiit/',
      icon: <Instagram size={14} />,
      ariaLabel: 'Instagram profile @irl.rohiit',
      title: 'Instagram: @irl.rohiit',
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohit-38a9b6428/',
      icon: <Linkedin size={14} />,
      ariaLabel: 'LinkedIn profile of Rohit',
      title: 'LinkedIn: Rohit',
      isExternal: true,
    },
    {
      name: 'Email',
      url: 'mailto:rohitbmu141@gmail.com',
      icon: <Mail size={14} />,
      ariaLabel: 'Send email to rohitbmu141@gmail.com',
      title: 'Email: rohitbmu141@gmail.com',
      isExternal: false,
    },
  ];

  return (
    <footer className="section-footer">
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

        <div className="footer-connect">
          <span className="footer-connect-label">CONNECT WITH US:</span>
          <div className="footer-social-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="social-pill-link"
                aria-label={link.ariaLabel}
                title={link.title}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


