const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const saveEmotion = (key, value) => {
  const existingData =
    JSON.parse(localStorage.getItem(key)) || {
      data: [],
      expiry: Date.now() + ONE_DAY_IN_MS,
    };

  if (Date.now() > existingData.expiry) {
    localStorage.removeItem(key);

    existingData.data = [];
    existingData.expiry = Date.now() + ONE_DAY_IN_MS;
  }

  const updatedData = [...existingData.data, value];

  const storeEmotion = {
    data: updatedData,
    expiry: Date.now() + ONE_DAY_IN_MS,
  };

  localStorage.setItem(
    key,
    JSON.stringify(storeEmotion)
  );

  return updatedData;
};

export const getEmotions = (key) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (!data) return [];

  if (Date.now() > data.expiry) {
    localStorage.removeItem(key);
    return [];
  }

  return data.data;
};