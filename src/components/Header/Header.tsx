import React from 'react';
import { useLabStore } from '../../store/labStore';
import { HeaderNav } from './HeaderNav';
import { HeaderLogo } from './HeaderLogo';

interface HeaderProps {
  currentView?: string;
}

export function Header({ currentView }: HeaderProps) {
  const labInfo = useLabStore(state => state.labInfo);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <HeaderLogo labName={labInfo.name} />
          <HeaderNav currentView={currentView} />
        </div>
      </div>
    </header>
  );
}