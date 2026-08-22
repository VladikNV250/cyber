export const uahFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'decimal',
  minimumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return `${uahFormatter.format(price)} ₴`;
}
