import { RawEntry, Entry } from "./types.js";

export function makeAverage(dayEntries: RawEntry[], field: string): number {
  let sum = 0;
  dayEntries.forEach((e) => sum += e[field]);
  return sum / dayEntries.length;
}

export function dayOfYear(dateString: string): number {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function toCsvString(entries: Entry[]): string {
  return entries.map((e) => {
    return e.date
      + "," + e.avgTB30.toString()
      + "," + e.avgTB60.toString()
      + "," + e.avgSP30.toString()
      + "," + e.avgSP60.toString()
  }).join('\n');
}
