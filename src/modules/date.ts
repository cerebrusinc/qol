interface ParsedDate {
	[key: string]: {
		/**The shorthand text version of date param */
		short: string;
		/**The long text version of date param */
		long: string;
		/**The ordinal of the number version of the date param */
		ordinal: string;
		/**The number param of the date */
		number: number;
	};
}
interface DateObject {
	/**An object containing day options for the date */
	day: ParsedDate;
	/**An object containing month options for the date */
	month: ParsedDate;
	/**The `fullYear` of the date */
	year: number;
}

const parseDate = (
	day: number,
	month: number,
	year: number,
	format?: "nnn" | "sss" | "lll" | "nss" | "nsl" | "nls" | "nll",
	american?: boolean
): DateObject | void => {
	// W.I.P
};
