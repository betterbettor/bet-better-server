export const BET_ID = 1; // Match Winner
export const BOOK_MAKER_ID = '8'; // Bet365
export const LEAGUE_ID = 39; // Premier League

// API key rotation
export let getApiKey = (): string => '';

const _getApiKeyCache = (): (() => string) => {
  const keys: string[] = process.env.API_KEY?.split(',') ?? [];
  const numberOfKeys = keys.length;
  let keyIdx = 0;

  return () => {
    const key = keys[keyIdx];
    keyIdx = (keyIdx + 1) % numberOfKeys;
    return key;
  };
};

export const loadApiKeys = (): void => {
  getApiKey = _getApiKeyCache();
};
