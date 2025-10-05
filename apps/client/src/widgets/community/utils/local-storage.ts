export const LocalStorage = (localStorageKey: string) => {
  const getLocalStorage = (): string[] => {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : [];
  };

  const addLocalStorage = (value: string) => {
    const addValue = value.trim();
    if (!addValue) {
      return;
    }
    const data = getLocalStorage();
    if (data[0] === addValue) {
      return;
    }
    const duplicateData = [
      addValue,
      ...data.filter((item: string) => item !== addValue),
    ];
    localStorage.setItem(localStorageKey, JSON.stringify(duplicateData));
  };

  const deleteLocalStorage = (value: string) => {
    const data = getLocalStorage();
    const newData = data.filter((item: string) => item !== value);
    localStorage.setItem(localStorageKey, JSON.stringify(newData));
  };

  return { getLocalStorage, addLocalStorage, deleteLocalStorage };
};
