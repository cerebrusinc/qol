import { parseDate } from "./date";

/**
 * The logger instance for a consistent logging experience.
 *
 * ```ts
 * const logger = new Logger();
 * ```
 */
class Logger {
	/**The current log id as an empty `string` */
	private _logId: string = "";
	/**Initialise the execution timestamp as `0` */
	private _execTimestamp: number = 0;
	/**Initialise a process' timestamp as `0` */
	private _procTimestamp: number = 0;
	/**Initialise the delta for the sequence as `0` */
	private _delta: number = 0;
	/**Initialise the cache for the previous call's process as an empty `string` */
	private _cache: string = "";
	/**The log id length; defaults to 5 `chars` */
	public idLength: number = 5;
	/**Whether or not the date should be logged in the amrican format */
	public americanDate: boolean = false;
	/**The time locale */
	public locale?: Intl.LocalesArgument;
	/**Other options for the log time output */
	public timeFormatOptions?: Intl.DateTimeFormatOptions;

	/**
	 * Create a new `Logger` instance and begin logging processes, their relative processing times, as well the an execution time from start to finish
	 *
	 * #### Some Use Cases
	 * - Route handler logs
	 * - Function logs
	 * - Process tracking
	 * - Chaining logs for an entire process
	 *
	 * ### Example
	 *
	 * **code**
	 *
	 * ```ts
	 * import { Logger } from "@cerebrusinc/qol";
	 * import someFunction from "./someFunction";
	 * import { express } from "express";
	 *
	 * const app = express()
	 * logger = new Logger()
	 *
	 * app.use((req, res, next) => {
	 *      logger.newLog("log", req.method, req.path);
	 *
	 *      logger.log("log", "someFunction", "Doing something...");
	 *      someFunction();
	 *      logger.procTime();
	 *
	 *      next();
	 *      logger.execTime();
	 * })
	 *
	 * // rest of your code
	 * ```
	 *
	 * **terminal output**
	 *
	 * ```sh
	 * [log • aGy5Op]: GET => /hello | 07/10/2023, 2:46:19 am
	 * [log • aGy5Op]: someFunction => Doing something... | 07/10/2023, 2:46:20 am
	 * [stats • aGy5Op]: someFunction => 53ms
	 * [exec • aGy5Op]: 121ms
	 * ```
	 *
	 * @param idLength optional: The log id length; defaults to 5 `chars`
	 * @param americanDate optional: Whether or not the date should be logged in the amrican format; defaults to `false`
	 * @param locale optional: The time locale; defaults to `undefined`
	 * @param timeFormatOptions optional: Other options for the log time output; defaults to `undefined`
	 */
	constructor(
		idLength?: number,
		americanDate?: boolean,
		locale?: Intl.LocalesArgument,
		timeFormatOptions?: Intl.DateTimeFormatOptions
	) {
		idLength ? (this.idLength = idLength) : null;
		americanDate ? (this.americanDate = americanDate) : null;
		locale ? (this.locale = locale) : null;
		timeFormatOptions ? (this.timeFormatOptions = timeFormatOptions) : null;
	}

	/**Generate an ID for logs */
	private _genLogId(): void {
		const alphabet =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const alphabetArray = alphabet.split("");

		let i = 0;
		let logId = "";

		do {
			logId +=
				alphabetArray[Math.floor(Math.random() * (alphabetArray.length - 1))];
			i++;
		} while (i < Math.floor(this.idLength));

		this._logId = logId;
	}

	/**Generate the log timestamp, Will log a `parseDate` if no time options are presented */
	private _genTimestamp(): string {
		const d = new Date();
		const pd = parseDate(
			d.getDate(),
			0,
			d.getMonth(),
			d.getFullYear(),
			"nsl",
			this.americanDate
		) as string;

		const time = d.toLocaleString(this.locale, this.timeFormatOptions);

		if (this.timeFormatOptions) {
			return `${pd} @ ${time}`;
		} else {
			return time;
		}
	}

	/**Create a new log chain; This will change the `log id` */
	public newLog(
		config: "stats" | "log" | "error",
		process: string,
		message: string
	): void {
		const d = Date.now();
		this._genLogId();
		this._execTimestamp = d;
		this._procTimestamp = d;

		console.log(
			`[${config} • ${
				this._logId
			}]: ${process} => ${message} | ${this._genTimestamp()}`
		);
	}

	/**Add a log to the log chain; This will not change the `log id` */
	public log(
		config: "stats" | "log" | "error",
		process: string,
		message: string
	): void {
		const d = Date.now();
		const oldProcTimestamp = this._procTimestamp;
		this._procTimestamp = d;

		this._delta = d - oldProcTimestamp;
		this._cache = process;

		console.log(
			`[${config} • ${
				this._logId
			}]: ${process} => ${message} | ${this._genTimestamp()}`
		);
	}

	/**Log the processing time between this call and the previous call to view their processing time */
	public procTime(): void {
		console.log(`[stats • ${this._logId}]: ${this._cache} => ${this._delta}ms`);
		this._cache = "";
	}

	/**View the entire execution time */
	public execTime(): void {
		const d = Date.now();
		const delta = d - this._execTimestamp;

		console.log(`[exec • ${this._logId}]: ${delta}ms`);

		this._logId = "";
		this._cache = "";
		this._execTimestamp = 0;
		this._procTimestamp = 0;
		this._delta = 0;
	}
}

export default Logger;
