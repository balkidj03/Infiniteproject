import EncryptedStorage from 'react-native-encrypted-storage';

const save = async (key: string, data: any) => {
  try {
    await EncryptedStorage.setItem(key, data);
  } catch (error) {
    console.error(error);
  }
};

const get = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data !== null) {
      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const remove = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

const clear = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const Storage = {get, save, remove, clear};
