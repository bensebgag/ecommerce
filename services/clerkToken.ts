let getTokenFn: (() => Promise<string | null>) | null = null;
let tokenProviderResolve: (() => void) | null = null;
const tokenProviderReady = new Promise<void>((resolve) => {
  tokenProviderResolve = resolve;
});

export const setTokenProvider = (fn: () => Promise<string | null>) => {
  getTokenFn = fn;
  if (tokenProviderResolve) {
    tokenProviderResolve();
    tokenProviderResolve = null;
  }
};

export const getClerkToken = async (): Promise<string | null> => {
  if (getTokenFn) {
    return await getTokenFn();
  }

  await tokenProviderReady;
  return getTokenFn ? await getTokenFn() : null;
};
