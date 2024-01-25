export function getDayFromNow(daysAgo: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo);
}

export function getDaysArray(daysAgo: number) {
  const days = [ 'ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  const arr = new Array(7)
    .fill(0)
    .map((_, i) => getDayFromNow(i + daysAgo))
    .map((el) => days[el.getDay()] +` (${el.toLocaleDateString().replace(/.2023/, '')})`)
    .reverse();

  return arr;
}
