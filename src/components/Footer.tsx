import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLabStore } from '../store/labStore';

export function Footer() {
  const labInfo = useLabStore(state => state.labInfo);

  return (
    <footer className="bg-white border-t py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-6">
            <span className="font-medium">{labInfo.name}</span>
            <a href={`mailto:${labInfo.email}`} className="flex items-center gap-1 hover:text-blue-600">
              <Mail className="w-4 h-4" />
              {labInfo.email}
            </a>
            <a href={`tel:${labInfo.phone}`} className="flex items-center gap-1 hover:text-blue-600">
              <Phone className="w-4 h-4" />
              {labInfo.phone}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {labInfo.address}
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}