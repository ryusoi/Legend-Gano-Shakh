
export type Page = 'home' | 'about' | 'cultivation' | 'science' | 'products' | 'contact' | 'reishi-decor' | 'reishi-biome' | 'reishi-cream' | 'reishi-extract' | 'investment' | 'sales' | 'health-tips' | 'myco-news' | 'blogs' | 'make-money' | 'gano-game' | 'iran-mushrooms';
export type Theme = 'light' | 'dark';

export interface GroundingChunkContent {
    uri?: string;
    title?: string;
}

export interface GroundingChunk {
    web?: GroundingChunkContent;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: GroundingChunk[];
}