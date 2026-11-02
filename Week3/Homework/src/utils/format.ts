export const formatDate = (date: string) => {
  if (!date) return '개봉일 미정';
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return '상영시간 미정';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

export const formatMoney = (amount: number) => {
  if (!amount) return '정보 없음';
  return `$${amount.toLocaleString('en-US')}`;
};

export const formatLanguage = (code: string) => {
  return new Intl.DisplayNames(['ko'], { type: 'language' }).of(code) ?? code;
};
