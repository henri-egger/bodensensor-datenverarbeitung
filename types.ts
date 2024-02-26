export interface RawEntry {
  date: string,
  day: number,
  TB30: number,
  TB60: number,
  SP30: number,
  SP60: number,
}

export interface Entry {
  date: string,
  avgTB30: number,
  avgTB60: number,
  avgSP30: number,
  avgSP60: number,
}