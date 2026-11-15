import { SavedAccount, UserProfile } from '../types/meal';

const ACCOUNTS_STORAGE_KEY = 'the_flavor_house_accounts';
const SESSION_STORAGE_KEY = 'the_flavor_house_session';
const PENDING_VERIFICATION_KEY = 'the_flavor_house_pending_verification';

// Default seeded accounts for instant demo testing
const DEFAULT_ACCOUNTS: SavedAccount[] = [
  {
    email: 'user@theflavorhouse.com',
    passwordHash: 'CleanDining2026!',
    name: 'Dr. Alex Montgomery',
    phone: '+1 (504) 555-0199',
    verified: true,
    createdAt: '2026-01-15'
  },
  {
    email: 'admin@wsms.pk',
    passwordHash: 'SuperAdmin2026!',
    name: 'Super Admin',
    phone: '+92 308 2135367',
    verified: true,
    createdAt: '2026-02-01'
  }
];

export const getStoredAccounts = (): SavedAccount[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const accounts: SavedAccount[] = JSON.parse(raw);
    return accounts;
  } catch (e) {
    return DEFAULT_ACCOUNTS;
  }
};

export const saveNewAccount = (account: SavedAccount): void => {
  const accounts = getStoredAccounts();
  // Check if exists, update or add
  const existingIdx = accounts.findIndex((a) => a.email.toLowerCase() === account.email.toLowerCase());
  if (existingIdx >= 0) {
    accounts[existingIdx] = account;
  } else {
    accounts.push(account);
  }
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
};

export const findAccount = (email: string): SavedAccount | undefined => {
  const accounts = getStoredAccounts();
  return accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
};

export const updateAccountPassword = (email: string, newPassword: string): boolean => {
  const accounts = getStoredAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  if (!acc) return false;
  acc.passwordHash = newPassword;
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  return true;
};

// Current Session
export const getActiveSession = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setActiveSession = (user: UserProfile | null): void => {
  if (!user) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } else {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  }
};

// Generate 6 digit numeric code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export interface PendingVerification {
  email: string;
  name: string;
  code: string;
  expiresAt: number;
}

export const setPendingVerification = (pending: PendingVerification): void => {
  localStorage.setItem(PENDING_VERIFICATION_KEY, JSON.stringify(pending));
};

export const getPendingVerification = (): PendingVerification | null => {
  try {
    const raw = localStorage.getItem(PENDING_VERIFICATION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const clearPendingVerification = (): void => {
  localStorage.removeItem(PENDING_VERIFICATION_KEY);
};
