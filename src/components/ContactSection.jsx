import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="contact-email-section-wrapper" aria-label="Email Contact">
      <div className="contact-card-email-standalone">
        <div className="contact-card-email-header">
          <div className="contact-card-title-group">
            <span className="contact-card-icon-box">
              <Mail size={20} className="contact-card-icon" />
            </span>
            <span className="contact-card-label">EMAIL ME</span>
          </div>
        </div>

        <div className="contact-card-email-body">
          <span className="contact-card-email-address">rohitbmu141@gmail.com</span>
          <a
            href="mailto:rohitbmu141@gmail.com"
            className="contact-email-btn"
            aria-label="Send email to rohitbmu141@gmail.com"
          >
            <span>SEND EMAIL</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

