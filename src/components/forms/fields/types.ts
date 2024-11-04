interface FieldProps {
    // Required props
    onSave: () => void;

    // Optional props
    required?: boolean;
}

export interface SimpleTextProps extends FieldProps {
    // Required props
    id: string;

    // Optional props
    columns?: number;
    initialText?: string;
    maxLength?: number;
    placeholder?: string;
    resizable?: 'horizontal' | 'vertical' | 'both' | 'block' | 'inline' | 'none';
    rows?: number;
    validation?: RegExp;
}

export interface PasswordProps extends FieldProps {
    flexDirection?: 'row' | 'column';
}
