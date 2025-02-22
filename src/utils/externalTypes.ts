export interface FormControlValidationProps {
    // From Formica; for some reason they don't export this
    disabled: boolean;
    touched: boolean;
    validity: ValidityState;
}
