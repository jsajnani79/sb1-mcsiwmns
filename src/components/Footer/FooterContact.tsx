import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';

interface FooterContactProps {
  email: string;
  phone: string;
}

export function FooterContact({ email, phone }: FooterContactProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">Contact Us</h4>
      <div className="space-y-2">
        <a 
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </a>
        <a 
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">{phone}</span>
        </a>
      </div>
    </div>
  );
}