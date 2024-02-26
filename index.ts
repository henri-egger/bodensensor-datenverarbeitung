import { readFileSync, writeFileSync } from "fs";
import { RawEntry, Entry } from "./types.js";
import { dayOfYear, makeAverage, toCsvString, clean } from "./helpers.js";

function buildEntryList(csv: string): RawEntry[] {
  return csv.split('\n').map((line) => {
    const values = line.split(',');
    const entry: RawEntry = {
      date: values[0],
      day: dayOfYear(values[0]),
      TB30: Number.parseFloat(clean(values[1])),
      TB60: Number.parseFloat(clean(values[2])),
      SP30: Number.parseFloat(clean(values[3])),
      SP60: Number.parseFloat(clean(values[4])),
    }
    return entry;
  })
}

function processRawEntries(rawEntries: RawEntry[]): Entry[] {
  const entries: Entry[] = [];
  for (let i = 1; i < 366; i++) {
    const dayEntries = rawEntries.filter((e) => e.day === i);
    entries.push({
      date: dayEntries[0].date.split(" ")[0],
      avgTB30: makeAverage(dayEntries, "TB30"),
      avgTB60: makeAverage(dayEntries, "TB60"),
      avgSP30: makeAverage(dayEntries, "SP30"),
      avgSP60: makeAverage(dayEntries, "SP60"),
    })
  }
  return entries;
}

const inputs = ["Dorf", "Kreit"];

inputs.forEach((e) => {
  const str = readFileSync("./input/" + e + ".csv").toString();
  const rawEntries: RawEntry[] = buildEntryList(str);
  const entries = processRawEntries(rawEntries);
  const csvStr = toCsvString(entries);
  writeFileSync("./output/" + e + "_processed.csv", csvStr);
})
