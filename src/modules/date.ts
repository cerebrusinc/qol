export interface DateObject {
	/**An object containing day options for the date */
	day: {
		/**The shorthand text version of day */
		short: string;
		/**The long text version of day */
		long: string;
		/**The ordinal of the number version of the month day */
		ordinalMonth: string;
		/**The ordinal of the number version of the week day */
		ordinalWeek: string;
		/**The number param of the weekday */
		weekNumber: number;
		/**The number param of the monthday */
		monthNumber: number;
	};
	/**An object containing month options for the date */
	month: {
		/**The shorthand text version of date param */
		short: string;
		/**The long text version of date param */
		long: string;
		/**The ordinal of the number version of the date param */
		ordinal: string;
		/**The number param of the date */
		number: number;
	};
	/**An object containing year options for the date */
	year: {
		short: number;
		long: number;
	};
}

const dayObj: { [key: string]: string } = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
};

const monthObj: { [key: string]: string } = {
	0: "January",
	1: "February",
	2: "March",
	3: "April",
	4: "May",
	5: "June",
	6: "July",
	7: "August",
	8: "September",
	9: "October",
	10: "November",
	11: "December",
};

const ordinals: { [key: string]: string } = {
	1: "st",
	2: "nd",
	3: "rd",
	21: "st",
	22: "nd",
	23: "rd",
	31: "st",
};

/**
 * Get formated dates ready for a DB or frontend
 * @param monthDay the day of the month; `d.getDate()`
 * @param weekDay the day of the week; `d.getDay()`
 * @param month the month as a number; `d.getMonth()`
 * @param year the full year; `d.getFullYear()`
 * @param format optional; n - numeric, s - shorthand text, l - full text
 * @param american optional; whether you want the date to be formatted in the American style
 * @returns if no format is provided it will return a ParsedDate object with metadata about the date (`@interface ParsedDate`), else it will return a string in your chosen format
 */
export const parseDate = (
	monthDay: number,
	weekDay: number,
	month: number,
	year: number,
	format?:
		| "nns"
		| "nnl"
		| "sss"
		| "ssl"
		| "lll"
		| "nss"
		| "nsl"
		| "nls"
		| "nll",
	american?: boolean
): DateObject | string => {
	const obj: DateObject = {
		day: {
			long: weekDay > 6 || weekDay < 0 ? "N/A" : dayObj[String(weekDay)],
			weekNumber: weekDay > 6 || weekDay < 0 ? -1 : weekDay + 1,
			monthNumber: monthDay > 31 || monthDay < 1 ? -1 : monthDay,
			ordinalMonth:
				monthDay > 31 || monthDay < 1
					? "N/A"
					: ordinals[String(monthDay)]
					? ordinals[String(monthDay)]
					: "th",
			ordinalWeek:
				weekDay > 6 || weekDay < 0
					? "N/A"
					: ordinals[String(weekDay + 1)]
					? ordinals[String(weekDay + 1)]
					: "th",
			short:
				weekDay > 6 || weekDay < 0
					? "N/A"
					: dayObj[String(weekDay)].substring(0, 3),
		},
		month: {
			long: month > 11 || month < 0 ? "N/A" : monthObj[String(month)],
			number: month > 11 || month < 0 ? -1 : month + 1,
			ordinal:
				month > 11 || month < 0
					? "N/A"
					: ordinals[String(month + 1)]
					? ordinals[String(month + 1)]
					: "th",
			short:
				month > 11 || month < 0
					? "N/A"
					: monthObj[String(month)].substring(0, 3),
		},
		year: {
			short: parseInt(String(year).substring(2, 4)),
			long: year,
		},
	};

	if (!format) return obj;

	switch (format) {
		case "lll":
			return `${obj.day.long} ${obj.day.monthNumber}${obj.day.ordinalMonth} ${obj.month.long}, ${obj.year.long}`;
		case "nll":
			if (american)
				return `${obj.month.long} ${obj.day.monthNumber} ${obj.year.long}`;
			return `${obj.day.monthNumber} ${obj.month.long} ${obj.year.long}`;
		case "nls":
			if (american)
				return `${obj.month.long} ${obj.day.monthNumber} ${obj.year.short}`;
			return `${obj.day.monthNumber} ${obj.month.long} ${obj.year.short}`;
		case "nnl":
			if (american)
				return `${obj.month.number} ${obj.day.monthNumber} ${obj.year.long}`;
			return `${obj.day.monthNumber} ${obj.month.number} ${obj.year.long}`;
		case "nns":
			if (american)
				return `${obj.month.number} ${obj.day.monthNumber} ${obj.year.short}`;
			return `${obj.day.monthNumber} ${obj.month.number} ${obj.year.short}`;
		case "nsl":
			if (american)
				return `${obj.month.short} ${obj.day.monthNumber} ${obj.year.long}`;
			return `${obj.day.monthNumber} ${obj.month.short} ${obj.year.long}`;
		case "nss":
			if (american)
				return `${obj.month.short} ${obj.day.monthNumber} ${obj.year.short}`;
			return `${obj.day.monthNumber} ${obj.month.short} ${obj.year.short}`;
		case "ssl":
			return `${obj.day.short} ${obj.day.monthNumber} ${obj.month.short}, ${obj.year.long}`;
		case "sss":
			return `${obj.day.short} ${obj.day.monthNumber} ${obj.month.short}, ${obj.year.short}`;
	}
};
