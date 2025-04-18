import { ViewTabItem } from '@/types/sharing';
import { StarIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

interface MyViewTabProps {
  currentTab: ViewTabItem | null;
  onTabChange: (tab: ViewTabItem) => void;
}

export const MyViewTab = ({ currentTab, onTabChange }: MyViewTabProps) => {
  return (
    <div className="flex w-full px-2 py-2">
      <button
        className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-2 text-sm transition-colors ${
          currentTab === 'scrap'
            ? 'border-b-sight-button text-sight-button'
            : 'border-transparent text-gray-600'
        }`}
        onClick={() => onTabChange('scrap')}
      >
        <StarIcon className="h-4 w-4" />
        <span>북마크 보기</span>
      </button>
      <button
        className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-2 text-sm transition-colors ${
          currentTab === 'my'
            ? 'border-b-sight-button text-sight-button'
            : 'border-transparent text-gray-600'
        }`}
        onClick={() => onTabChange('my')}
      >
        <ChatBubbleOvalLeftIcon className="h-4 w-4 scale-x-[-1]" />
        <span>내 나눔글 보기</span>
      </button>
    </div>
  );
};
