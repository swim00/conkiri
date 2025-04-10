import { create } from 'zustand';
import { sharingAPI } from '@/lib/api/sharing';
import { SharingPost } from '@/types/sharing';

interface ScrapState {
  scrappedSharingIds: Set<number>;
  addScrap: (sharingId: number) => Promise<void>;
  deleteScrap: (sharingId: number) => Promise<void>;
  toggleScrap: (sharingId: number) => Promise<void>;
  isScraped: (sharingId: number) => boolean;
  initScrappedSharings: (sharings: SharingPost[]) => void; 
}

export const useSharingScrapStore = create<ScrapState>((set, get) => ({
  scrappedSharingIds: new Set<number>(),

  // 스크랩 목록으로 초기화하는 함수
  initScrappedSharings: (sharings) => {
    const ids = sharings.map(sharing => sharing.sharingId);
    set({ scrappedSharingIds: new Set(ids) });
  },

  isScraped: (sharingId: number) => {
    return get().scrappedSharingIds.has(sharingId);
  },

  addScrap: async (sharingId: number) => {
    try {
      await sharingAPI.addScrap(sharingId);
      set((state) => ({
        scrappedSharingIds: new Set(state.scrappedSharingIds).add(sharingId),
      }));
    } catch (error) {
      console.error('Failed to add scrap:', error);
      throw error;
    }
  },

  deleteScrap: async (sharingId: number) => {
    try {
      await sharingAPI.deleteScrap(sharingId);
      set((state) => {
        const newIds = new Set(state.scrappedSharingIds);
        newIds.delete(sharingId);
        return { scrappedSharingIds: newIds };
      });
    } catch (error) {
      console.error('Failed to delete scrap:', error);
      throw error;
    }
  },

  toggleScrap: async (sharingId: number) => {
    const isCurrentlyScraped = get().isScraped(sharingId);
    try {
      if (isCurrentlyScraped) {
        await get().deleteScrap(sharingId);
      } else {
        await get().addScrap(sharingId);
      }
    } catch (error) {
      console.error('Failed to toggle scrap:', error);
      throw error;
    }
  },
}));
