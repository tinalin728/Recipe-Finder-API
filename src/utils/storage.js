export const getStoredData = (key) => {
    try {
        const storedData = localStorage.getItem(key);
        const lastFetchDate = localStorage.getItem(`${key}_date`);
        const today = new Date().toISOString().split("T")[0];

        if (storedData && lastFetchDate === today) {
            return JSON.parse(storedData);
        } else {
            localStorage.removeItem(key);
            localStorage.removeItem(`${key}_date`);
            return null;
        }
    } catch (error) {
        console.error(`Error accessing localStorage for key: ${key}`, error);
        return null;
    }
};

export const storeData = (key, data) => {
    try {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_date`, today);
    } catch (error) {
        console.error(`Error storing data in localStorage for key: ${key}`, error);
    }
};
