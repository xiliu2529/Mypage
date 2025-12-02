declare module 'date-holidays' {
  export default class Holidays {
    init(country: string): void;
    getHolidays(year: number): Array<{
      date: string;
      name: string;
      type: string;
    }>;
  }
}