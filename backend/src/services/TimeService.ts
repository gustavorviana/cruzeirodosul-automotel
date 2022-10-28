const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 24;

export class TimeService {
    public readonly hours: number = 0;
    public readonly minutes: number = 0;
    public readonly seconds: number = 0;

    constructor(ms: number) {
        if (ms <= 0)
            return;

        while (ms >= HOUR) {
            this.hours++;
            ms -= HOUR;
        }

        while (ms >= MINUTE) {
            this.minutes++;
            ms -= MINUTE;
        }

        while (ms >= SECOND) {
            this.seconds++;
            ms -= SECOND;
        }
    }


    public get info(): string {
        let text = '';

        if (this.hours > 0)
            text = `${this.hours} h`;

        if (this.minutes > 0) {
            if (text)
                text += ' ';

            text += `${this.minutes} m`;
        }

        if (this.seconds > 0) {
            if (text)
                text += ' ';

            text += `${this.seconds} s`;
        }

        return text;
    }

}