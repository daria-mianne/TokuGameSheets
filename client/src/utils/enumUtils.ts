export function getEnumKeys<T extends string, EnumValue extends string | number>(enumVar: { [key in T]: EnumValue }) {
    // Have to filter for NaN because otherwise number-based enums also give the numbers as keys
    return Object.keys(enumVar).filter((key) => isNaN(Number(key))) as Array<T>;
}
