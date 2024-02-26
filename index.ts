import { readFileSync, writeFileSync } from "fs";
import { RawEntry, Entry } from "./types.js";
import { dayOfYear, makeAverage, toCsvString } from "./helpers.js";

const dorfStr = readFileSync(".input/Dorf.csv").toString();
const dorfRawEntries: RawEntry[] = buildEntryList(dorfStr);

const kreitStr = readFileSync(".input/Kreit.csv").toString();
const kreitRawEntries: RawEntry[] = buildEntryList(kreitStr);

function buildEntryList(csv: string): RawEntry[] {
  return csv.split('\n').map((line) => {
    const values = line.split(',');
    const entry: RawEntry = {
      date: values[0],
      day: dayOfYear(values[0]),
      TB30: Number.parseFloat(values[1]),
      TB60: Number.parseFloat(values[2]),
      SP30: Number.parseFloat(values[3]),
      SP60: Number.parseFloat(values[4]),
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

const dorfEntries = processRawEntries(dorfRawEntries);
const kreitEntries = processRawEntries(kreitRawEntries);

const dorfCsvStr = toCsvString(dorfEntries);
const kreitCsvStr = toCsvString(kreitEntries);

writeFileSync("output/dorf_processed.csv", dorfCsvStr);
writeFileSync("output/kreit_processed.csv", kreitCsvStr);
