const LOCAL_STORAGE_KEY = 'recentSearch';

export const LocalStorage = () => {
  const getLocalStorage = () => {
    const getData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return getData ? JSON.parse(getData) : [];
  };

  const setLocalStorage = (value: string) => {
    const setValue = value.trim();
    if (!setValue) {
      return;
    }
    const data = getLocalStorage();

    const newData = [
      setValue,
      ...data.filter((item: string) => item !== setValue),
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  const deleteLocalStorage = (value: string) => {
    const data = getLocalStorage();
    const newData = data.filter((item: string) => item !== value);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  return { getLocalStorage, setLocalStorage, deleteLocalStorage };
};
