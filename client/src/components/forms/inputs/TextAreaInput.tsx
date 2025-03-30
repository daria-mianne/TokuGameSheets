import { BaseInput, InputProps } from './BaseInput';

export const TextAreaInput = (props: InputProps<HTMLTextAreaElement>) => BaseInput<HTMLTextAreaElement>('textarea')(props);
