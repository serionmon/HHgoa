import React from 'react';
import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ContactSection() {
  const contactLinks = [
    {
      name: 'GITHUB',
      handle: '@serionmon',
      url: 'https://github.com/serionmon',
      icon: <Github size={20} className="contact-card-icon" />,
      ariaLabel: 'GitHub @serionmon'
    },
    {
      name: 'X',
      handle: '@Serionmon',
      url: 'https://x.com/Serionmon',
      icon: <XIcon size={20} />,
      ariaLabel: 'X @Serionmon'
    },
    {
      name: 'INSTAGRAM',
      handle: '@irl.rohiit',
      url: 'https://www.instagram.com/irl.rohiit/',
      icon: <Instagram size={20} className="contact-card-icon" />,
      ariaLabel: 'Instagram @irl.rohiit'
    },
    {
      name: 'LINKEDIN',
      handle: 'Rohit',
      url: 'https://www.linkedin.com/in/rohit-291080429/',
      icon: <Linkedin size={20} className="contact-card-icon" />,
      ariaLabel: 'LinkedIn Rohit'
    },
    {
      name: 'EMAIL',
      handle: 'rohitbmu141@gmail.com',
      url: 'mailto:rohitbmu141@gmail.com',
      icon: <Mail size={20} className="contact-card-icon" />,
      ariaLabel: 'Email rohitbmu141@gmail.com'
    }
  ];

  return (
    <section className="contact-section-container" aria-label="Connect With The Builder">
      <div className="contact-header-wrapper">
        <span className="contact-eyebrow-stamp">✦ LET'S CONNECT</span>
        <h2 className="contact-main-heading">CONNECT WITH THE BUILDER</h2>
        <p className="contact-subtext">
          Building under the sun in Goa. Have questions, feedback, or want to collaborate? Reach out on any platform below.
        </p>
      </div>

      <div className="contact-cards-grid">
        {contactLinks.map((item) => {
          const isMail = item.url.startsWith('mailto:');
          return (
            <a
              key={item.name}
              href={item.url}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noopener noreferrer'}
              className="contact-card"
              aria-label={item.ariaLabel}
            >
              <div className="contact-card-top">
                <div className="contact-card-title-group">
                  <span className="contact-card-icon-box">{item.icon}</span>
                  <span className="contact-card-label">{item.name}</span>
                </div>
                <span className="contact-card-arrow-badge">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="contact-card-bottom">
                <span className="contact-card-username">{item.handle}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
