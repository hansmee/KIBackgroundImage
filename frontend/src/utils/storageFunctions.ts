export const getSotrageImgs = (): string[] => {
  const existedImgs = localStorage.getItem('instaImgs');
  if (existedImgs !== null) {
    const existedImgsArr = JSON.parse(existedImgs ?? []);
    if (Array.isArray(existedImgsArr)) return existedImgsArr;
  }
  return [];
};
