declare module '@toast-ui/calendar' {
  import type { CalendarOptions, EventObject } from '@toast-ui/calendar/types';

  export default class Calendar {
    constructor(container: HTMLElement, options?: CalendarOptions);
    createEvents(events: EventObject[]): void;
    clear(): void; // оригинальный метод библиотеки    
    today(): void;
    next(): void;
    render(): void;
    prev(): void;
    clearGridSelections(): void;
    on(eventName: string, handler: (event: any) => void): void;
    off(eventName: string, handler?: (event: any) => void): void;
    getDate(): Date;
  }
}
