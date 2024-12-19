import React from 'react';
import { FooterBranding } from './FooterBranding';
import { FooterContact } from './FooterContact';
import { FooterLocation } from './FooterLocation';
import { FooterLinks } from './FooterLinks';
import { FooterSocial } from './FooterSocial';
import { FooterCopyright } from './FooterCopyright';
import { useLabStore } from '../../store/labStore';

export function Footer() {
  const labInfo = useLabStore(state => state.labInfo);

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branding & Description */}
          <div className="space-y-4">
            <FooterBranding name={labInfo.name} description={labInfo.description} />
            <FooterSocial socialLinks={labInfo.socialLinks} />
          </div>

          {/* Contact & Links */}
          <div className="space-y-4">
            <FooterContact email={labInfo.email} phone={labInfo.phone} />
            <FooterLinks website={labInfo.website} />
          </div>

          {/* Location & Hours */}
          <div className="space-y-4">
            <FooterLocation 
              address={labInfo.address} 
              googleMapsUrl={labInfo.googleMapsUrl}
              hours={labInfo.hours}
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <FooterCopyright 
            labName={labInfo.name}
            privacyPolicyUrl={labInfo.privacyPolicyUrl}
            termsUrl={labInfo.termsUrl}
          />
        </div>
      </div>
    </footer>
  );
}