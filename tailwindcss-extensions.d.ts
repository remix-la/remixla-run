// declare module 'tailwindcss/lib/util/flattenColorPalette' {
//   export default function flattenColorPalette(input: any): any;
// }
declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette<T>(input: T): Record<string, string>;
}