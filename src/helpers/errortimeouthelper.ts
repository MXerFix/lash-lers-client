export const errorTimeoutSet = (setE: Function, value: number, timeout: number) => {
  setE((prev: number) => value)
  setTimeout(() => {
    setE((prev: number) => 0)
  }, timeout);
}