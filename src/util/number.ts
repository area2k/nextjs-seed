const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const normalizeAmount = (amount: number) => {
  return currencyFormatter.format(amount)
}
