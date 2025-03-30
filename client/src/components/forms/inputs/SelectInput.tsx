import { BaseInput, InputProps } from "./BaseInput";

export const SelectInput = (props: InputProps<HTMLSelectElement>) => BaseInput<HTMLSelectElement>('select')(props);