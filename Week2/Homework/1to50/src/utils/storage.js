const STORAGE_KEY = 'ranking';

// 저장된 기록 불러오기 (없으면 빈 배열)
export const getRecords = () => {
    const item = localStorage.getItem(STORAGE_KEY);
    return item !== null ? JSON.parse(item) : [];
};

// 기존 기록 뒤에 새 기록 추가해서 저장
export const saveRecord = (record) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...getRecords(), record]));
};