import React from 'react';
import { FlaskConical } from 'lucide-react';

interface HeaderLogoProps {
  labName: string;
}

export function HeaderLogo({ labName }: HeaderLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <FlaskConical className="w-8 h-8 text-blue-600" />
      <div>
        <h1 className="text-xl font-bold text-gray-900">{labName}</h1>
        <p className="text-sm text-gray-500">Research Participant Portal</p>
      </div>
    </div>
  );
}