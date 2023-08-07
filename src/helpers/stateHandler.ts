export const handleSettings = (e: React.MouseEvent | React.ChangeEvent, setState: Function, state: boolean | string | number) => {
  e.preventDefault()
  setState(state)
}
