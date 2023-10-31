export const getConvertedAmount = (
  conversionRate: string | null,
  amount: string
) => {
  return conversionRate
    ? Number(parseInt(amount) * parseInt(conversionRate)).toFixed(2)
    : amount;
};
