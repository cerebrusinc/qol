/**
 * Send in a number and get back a parsed number... like its EXCEL!
 * @param value the number you want to be parsed
 * @param setting the delimiter for the number
 * @returns  the parsed number with delimiters as a string
 */
const numParse = (
	value: number | string,
	setting?: "space" | "comma" | "punct"
): string => {
	let divider: string;

	switch (setting) {
		case "space":
			divider = " ";
			break;
		case "comma":
			divider = ",";
			break;
		case "punct":
			divider = ".";
			break;
		default:
			divider = setting ? setting : ",";
	}

	let decimalValue: string = "";

	if (String(value).includes(".")) {
		const decIndex: number = String(value).indexOf(".");
		decimalValue = String(value).substring(decIndex, String(value).length);
	}

	const number: string = String(value).replace(decimalValue, "");

	if (setting === "punct") {
		decimalValue = decimalValue.replace(".", ",");
	}

	const arr: string[] = number.split("");
	arr.reverse();

	let parsed: string = "";
	let count: number = 0;

	for (let i = 0; i < arr.length; i++) {
		if (count === 3) {
			count = 1;
			parsed += divider;
		} else {
			count++;
		}

		parsed += arr[i];
	}

	const delimitArr: string[] = parsed.split("");
	delimitArr.reverse();

	const delimitedNum: string = delimitArr.join("") + decimalValue;

	return delimitedNum;
};

export default numParse;
