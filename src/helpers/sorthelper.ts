export const portfolioArrayUpToDownSort = (a: {data: string}, b: {data: string}) => Number(b.data.split('-', 1)) - Number(a.data.split('-', 1))