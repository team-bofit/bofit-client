export const LocalStorage = (localStorageKey: string) => {
  const getLocalStorage = () => {
    const getData = localStorage.getItem(localStorageKey);
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
    localStorage.setItem(localStorageKey, JSON.stringify(newData));
  };

  const deleteLocalStorage = (value: string) => {
    const data = getLocalStorage();
    const newData = data.filter((item: string) => item !== value);
    localStorage.setItem(localStorageKey, JSON.stringify(newData));
  };

  return { getLocalStorage, setLocalStorage, deleteLocalStorage };
};
