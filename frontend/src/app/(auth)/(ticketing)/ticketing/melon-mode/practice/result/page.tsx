'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTicketintPracticeResultStore } from '@/store/ticketintPracticeResult';

export default function ResultPage() {
  const router = useRouter();
  const { reactionTime } = useTicketintPracticeResultStore();

  const handleRetry = () => {
    router.push('entrance');
  };

  const home = () => {
    router.push('./');
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">결과</h1>
          <p className="mt-2 text-gray-600">당신의 반응 속도는...</p>
        </div>

        <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-white shadow-sm">
          <p className="text-6xl font-bold text-blue-600">
            {reactionTime.toFixed(3)}
          </p>
          <p className="mt-2 text-xl text-gray-600">밀리초</p>

          <p className="mt-4 text-lg text-gray-800">
            {reactionTime < 100
              ? '🦾 당신 매크로입니까?'
              : reactionTime < 200
                ? '🎯 놀라운 반응 속도입니다!'
                : reactionTime < 300
                  ? '👍 평균 이상의 반응 속도네요!'
                  : '💪 조금 더 연습해보세요!'}
          </p>
        </div>

        <button onClick={handleRetry} className="h-14 w-full text-lg">
          다시 도전하기
        </button>
        <button onClick={home} className="h-14 w-full text-lg">
          홈으로
        </button>
      </div>
    </div>
  );
}
