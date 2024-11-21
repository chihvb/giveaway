import React, { useState } from 'react';
import { Users, AlertCircle } from 'lucide-react';

interface NameInputProps {
  onAddNames: (names: string[]) => void;
}

export default function NameInput({ onAddNames }: NameInputProps) {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Split the input text by newlines, commas, or semicolons
    const namesList = inputText
      .split(/[\n,;]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (namesList.length === 0) {
      setError('Please enter at least one name');
      return;
    }

    onAddNames(namesList);
    setInputText('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Enter Participants</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="names" className="block text-sm font-medium mb-2">
            Enter Names (one per line, or separated by commas)
          </label>
          <textarea
            id="names"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="John Doe&#10;Jane Smith&#10;Alex Johnson"
            className="w-full h-48 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <Users className="w-5 h-5" />
          <span>Add Participants</span>
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-400">
        <p>Tips:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Enter one name per line</li>
          <li>Or separate names with commas</li>
          <li>Names will be automatically de-duplicated</li>
        </ul>
      </div>
    </div>
  );
}