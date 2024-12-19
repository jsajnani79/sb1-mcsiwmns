import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  url: string;
}

interface FooterSocialProps {
  socialLinks?: SocialLink[];
}

const SOCIAL_ICONS = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export function FooterSocial({ socialLinks }: FooterSocialProps) {
  if (!socialLinks?.length) return null;

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map(({ platform, url }) => {
        const Icon = SOCIAL_ICONS[platform];
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={`Follow us on ${platform}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}