export type PartialByKeys<T, K extends keyof T> = Omit<
  Partial<Pick<T, K>> & Omit<T, K>,
  never
>;
