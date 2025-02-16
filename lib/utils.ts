import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const createSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export function handleAxiosError(error: {
  response: { status: any; data: { message: any } };
  request: any;
}) {
  if (error.response) {
    // The server responded with a status code that falls out of the range of 2xx
    return {
      statusCode: error.response.status,
      message: error.response.data.message ?? 'An error occurred during the request',
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      statusCode: 500,
      message: 'No response from the server. Please try again later.',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      statusCode: 500,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

const SECRET_KEY = `${process.env.ENCRYPTION_SECRET_KEY}`; // Replace with your own secret key

export const encryptData = (data: any) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    console.log('Encryption failed:', error);
    return null;
  }
};

export const decryptData = (ciphertext: string | CryptoJS.lib.CipherParams) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log('Decryption failed:', error);
    return null;
  }
};

export const saveToLocalStorage = (key: string, data: any) => {
  const encryptedData = encryptData(data);
  if (encryptedData) {
    localStorage.setItem(key, encryptedData);
  }
};

export const loadFromLocalStorage = (key: string) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getInitials = (name: string) => {
  // Split the name into an array of words
  const nameParts = name?.trim().split(/\s+/);

  // Get the initials of all the names
  const initials = nameParts
    ?.map(part => part.charAt(0).toUpperCase())
    .join('');

  return initials;
};

export const customStorage = {
  getItem: (name: string) => {
    const storedValue = loadFromLocalStorage(name);
    return storedValue;
  },
  setItem: (name: string, value: any) => {
    saveToLocalStorage(name, value);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
  clear: () => {
    localStorage.clear();
  },
};