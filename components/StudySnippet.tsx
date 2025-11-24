import React from 'react';
import LinkIcon from './icons/LinkIcon';

interface StudySnippetProps {
  title: string;
  snippet: string;
  source: string;
  url: string;
  t: any;
}

const StudySnippet: React.FC<StudySnippetProps> = ({ title, snippet, source, url, t }) => {
  return (
    <div className="border rounded-xl p-6 flex flex-col h-full transform transition-transform hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
      <h3 className="text-lg font-semibold flex-grow">{title}</h3>
      <p className="text-sm mt-2 flex-grow" style={{color: 'var(--text-secondary)'}}>{snippet}</p>
      <p className="text-xs mt-4 italic opacity-70" style={{color: 'var(--text-secondary)'}}>{source}</p>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-colors self-start"
        style={{color: 'var(--text-secondary)'}}
      >
        {t.read_study}
        <LinkIcon className="w-4 h-4" />
      </a>
    </div>
  );
};

export default StudySnippet;