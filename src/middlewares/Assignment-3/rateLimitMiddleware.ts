import { type Request, type Response, type NextFunction } from "express";

export class RateLimitMiddleware {
  maxRequests: number;
  currentRequestCounter: number;
  intervalMs: number;
  startClock: number;

  constructor(maxRequests: number, intervalMs: number) {
    this.maxRequests = maxRequests;
    this.currentRequestCounter = 0;
    this.intervalMs = intervalMs;
    this.startClock = new Date().getTime();
  }

  // Check if query limit exceeded in current interval
  private readonly isInInterval = (): boolean => {
    const endClock: number = new Date().getTime();
    return endClock - this.startClock < this.intervalMs;
  };

  private readonly check = (): boolean => {
    if (this.currentRequestCounter < this.maxRequests) {
      this.currentRequestCounter++;
      return true;
    }

    if (this.isInInterval()) {
      return false;
    }

    // Reset interval + requestCounter
    this.startClock = new Date().getTime();
    this.currentRequestCounter = 1;
    return true;
  };

  fetch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (this.check()) {
      console.log("Query within interval!");
      next();
    } else {
      console.log("Query rate exceeded!");

      res.status(429).send({
        status: false,
        message: "Too many requests!",
      });
    }
  };
}
