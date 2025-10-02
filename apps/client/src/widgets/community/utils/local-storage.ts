const LOCAL_STORAGE_KEY = 'recentSearch';

export const LocalStorage = () => {
  const getLocalStorage = () => {
    const getData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return getData ? JSON.parse(getData) : [];
  };

  const setLocalStorage = (value: string) => {
    const data = getLocalStorage();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([value, ...data]));
  };

  const deleteLocalStorage = (value: string) => {
    const data = getLocalStorage();
    const newData = data.filter((item: string) => item !== value);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  return { getLocalStorage, setLocalStorage, deleteLocalStorage };
};
