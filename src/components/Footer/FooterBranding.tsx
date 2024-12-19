import React from 'react';
import { FlaskConical } from 'lucide-react';

interface FooterBrandingProps {
  name: string;
  description?: string;
}

export function FooterBranding({ name, description }: FooterBrandingProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <FlaskConical className="w-6 h-6 text-blue-600" />
        <h3 className="font-semibold text-gray-900">{name}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-500 mt-2 max-w-sm">{description}</p>
      )}
    </div>
  );
}