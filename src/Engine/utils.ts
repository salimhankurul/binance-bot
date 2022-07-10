export function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlePression = (n: number, pression: number): number => {
  const f = n.toFixed(pression + 1);

  n = parseFloat(f);

  // 11197.43573 ->>  1119743.573
  n *= Math.pow(10.0, pression);

  // 1119743.573 ->> 1119743
  n = n | 0;

  // 1119743 -> 11197.43
  n /= Math.pow(10.0, pression);

  return n;
};
