// @ts-expect-error: Suppress this error
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("boards", JSON.stringify(store.getState().boards));
  return result;
};
