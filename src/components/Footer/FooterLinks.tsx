import React from 'react';
import { Globe } from 'lucide-react';

interface FooterLinksProps {
  website: string;
}

export function FooterLinks({ website }: FooterLinksProps) {
  return (
    <a 
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm">Visit Website</span>
    </a>
  );
}