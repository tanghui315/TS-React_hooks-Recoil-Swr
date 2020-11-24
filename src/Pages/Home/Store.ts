import { atom } from "recoil"
//Options interface 
export interface Repository {
  label: string;
  value: string;
}
//OptionsState
export const OptionsState = atom<Repository[] | undefined>({
  key: "options",
  default: []
})
//SelectedState
export const SelectedState = atom<string[]>({
  key: "selectedValues",
  default: []
})

