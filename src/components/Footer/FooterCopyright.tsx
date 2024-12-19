import React from 'react';

interface FooterCopyrightProps {
  labName: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
}

export function FooterCopyright({ labName, privacyPolicyUrl, termsUrl }: FooterCopyrightProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <div>© {new Date().getFullYear()} {labName}. All rights reserved.</div>
      {(privacyPolicyUrl || termsUrl) && (
        <div className="flex items-center gap-4">
          {privacyPolicyUrl && (
            <a 
              href={privacyPolicyUrl}
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
          )}
          {termsUrl && (
            <a 
              href={termsUrl}
              className="hover:text-gray-700 transition-colors"
            >
              Terms of Use
            </a>
          )}
        </div>
      )}
    </div>
  );
}