import { BaseInput, InputProps } from './BaseInput';

export const TextInput = (props: InputProps<HTMLInputElement>) => BaseInput<HTMLInputElement>('input')(props);
