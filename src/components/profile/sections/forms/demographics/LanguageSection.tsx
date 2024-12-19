import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Language, LanguageProficiency } from '../../../../../types/demographics';
import { LANGUAGES } from '../../../../../utils/constants/languages';

interface LanguageSectionProps {
  primaryLanguage: string;
  otherLanguages: Language[];
  onPrimaryLanguageChange: (value: string) => void;
  onOtherLanguagesChange: (languages: Language[]) => void;
}

export function LanguageSection({
  primaryLanguage,
  otherLanguages,
  onPrimaryLanguageChange,
  onOtherLanguagesChange,
}: LanguageSectionProps) {
  const [newLanguage, setNewLanguage] = React.useState<Language>({
    name: '',
    proficiency: LanguageProficiency.BASIC
  });

  const addLanguage = () => {
    if (newLanguage.name) {
      onOtherLanguagesChange([...otherLanguages, newLanguage]);
      setNewLanguage({ name: '', proficiency: LanguageProficiency.BASIC });
    }
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...otherLanguages];
    updatedLanguages.splice(index, 1);
    onOtherLanguagesChange(updatedLanguages);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Primary Language</label>
        <select
          value={primaryLanguage}
          onChange={(e) => onPrimaryLanguageChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select primary language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Languages
        </label>
        <div className="space-y-2">
          {otherLanguages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1">{lang.name}</span>
              <span className="text-sm text-gray-500">{lang.proficiency}</span>
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <select
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select language</option>
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as LanguageProficiency })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(LanguageProficiency).map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addLanguage}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}