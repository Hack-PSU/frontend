export class Duration {
  private readonly NUM_SECS_IN_DAY = 86400;
  private readonly NUM_SECS_IN_HOUR = 3600;
  private readonly NUM_SECS_IN_MINUTE = 60;

  constructor(private startDate: Date, private endDate: Date) {}

  /**
   * Returns the seconds in the interval
   */
  private get timeTill() {
    return (this.endDate.getTime() - this.startDate.getTime()) / 1000;
  }

  public get days() {
    return Math.floor(this.timeTill / this.NUM_SECS_IN_DAY);
  }

  public get hours() {
    return Math.floor((this.timeTill % this.NUM_SECS_IN_DAY) / this.NUM_SECS_IN_HOUR);
  }

  public get minutes() {
    return Math.floor(
      ((this.timeTill % this.NUM_SECS_IN_DAY) % this.NUM_SECS_IN_HOUR) / this.NUM_SECS_IN_MINUTE,
    );
  }

  public get seconds() {
    return Math.floor(
      ((this.timeTill % this.NUM_SECS_IN_DAY) % this.NUM_SECS_IN_HOUR) % this.NUM_SECS_IN_MINUTE,
    );
  }
}
