
import React from 'react';
import ContentPage from './ContentPage';
import type { Page } from '../../types';

interface ContainerCultivationPageProps {
  t: any;
  navigate: (page: Page) => void;
}

const ContainerCultivationPage: React.FC<ContainerCultivationPageProps> = ({ t, navigate }) => {
  const imageUrls = [
    "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/a7995ca7-478c-4360-a8cc-56da83d558b6.webp",
    "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/reishi-logs-2__62576.jpg",
  ];

  return (
    <ContentPage
      title={t.cultivation_container_title}
      text={t.cultivation_container_text}
      imageUrls={imageUrls}
    >
        <div className="mt-12 text-center p-6 rounded-2xl border" style={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
            <p style={{color: 'var(--text-secondary)'}}>
                Discover the traditional method that unlocks Ganoderma's full potential.
            </p>
            <button
                onClick={() => navigate('cultivation')}
                className="mt-4 inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
            >
                Explore Log Cultivation
            </button>
        </div>
    </ContentPage>
  );
};

export default ContainerCultivationPage;
