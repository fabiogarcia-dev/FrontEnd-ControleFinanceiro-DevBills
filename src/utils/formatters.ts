export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pr-BR", {
        currency: "BRL",
        style: "currency",
    }).format(value);
};