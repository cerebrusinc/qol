const toRGB = (hex: string): number[] => {
	const r: number = parseInt(hex.substring(0, 2), 16);
	const g: number = parseInt(hex.substring(2, 4), 16);
	const b: number = parseInt(hex.substring(4, 6), 16);
	return [r, g, b];
};

const computeColour = (
	r: number,
	g: number,
	b: number,
	setting: "cmyk" | "hs*"
): number[] => {
	switch (setting) {
		case "cmyk":
			const cC: number = 1 - r / 255;
			const cM: number = 1 - g / 255;
			const cY: number = 1 - b / 255;
			const cK: number = Math.min(cC, Math.min(cM, cY));
			return [cC, cM, cY, cK];
		case "hs*":
			const cR: number = r / 255;
			const cG: number = g / 255;
			const cB: number = b / 255;
			const min: number = Math.min(cR, Math.min(cG, cB));
			const max: number = Math.max(cR, Math.max(cG, cB));
			return [cR, cG, cB, min, max];
	}
};

const toCMYK = (hex: string): string[] => {
	const [r, g, b]: number[] = toRGB(hex);

	if (r == 0 && g == 0 && b == 0) return ["0%", "0%", "0%", "100%"];

	const [cC, cM, cY, cK]: number[] = computeColour(r, g, b, "cmyk");

	const dC: number = (cC - cK) / (1 - cK);
	const dM: number = (cM - cK) / (1 - cK);
	const dY: number = (cY - cK) / (1 - cK);

	const c: number = dC * 100;
	const m: number = dM * 100;
	const y: number = dY * 100;
	const k: number = cK * 100;

	return [`${c}%`, `${m}%`, `${y}%`, `${k}%`];
};

const toHSV = (hex: string): string[] => {
	const [r, g, b]: number[] = toRGB(hex);
	const [cR, cG, cB, min, cV]: number[] = computeColour(r, g, b, "hs*");

	if (min === cV) return ["0", "0%", `${min}%`];

	const x = cR === min ? cG - cB : cB === min ? cR - cG : cB - cR;
	const y = cR === min ? 3 : cB === min ? 1 : 5;

	const h = 60 * (y - x / (cV - min));

	const cS = (cV - min) / cV;

	const s = cS * 100;
	const v = cV * 100;

	return [`${h}`, `${s}%`, `${v}%`];
};

const toHSL = (hex: string): string[] => {
	const [r, g, b]: number[] = toRGB(hex);
	const [cR, cG, cB, min, max]: number[] = computeColour(r, g, b, "hs*");

	const cL = min + max;
	const l = cL * 50;

	if (min === max) return ["0", "0%", `${l}%`];

	const x = cR === min ? cG - cB : cB === min ? cR - cG : cB - cR;
	const y = cR === min ? 3 : cB === min ? 1 : 5;

	const h = 60 * (y - x / (max - min));

	const cS =
		cL / 2 > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

	const s = cS * 100;

	return [`${h}`, `${s}%`, `${l}%`];
};

/**
 * Generate a random colour
 * @param setting optional; The format you would like the colour to be. Defaults to `hex`
 * @returns a random colour
 */
const randomColour = (
	setting?: "hex" | "rgb" | "cmyk" | "hsv" | "hsl"
): string => {
	let h: string = "";
	for (let i = 0; i < 6; i++) {
		h += Math.floor(Math.random() * 16).toString(16);
	}

	switch (setting) {
		case "hex":
			return `#${h}`;
		case "rgb":
			const rgb: number[] = toRGB(h);
			return `rgb(${rgb.toString()})`;
		case "cmyk":
			const cmyk: string[] = toCMYK(h);
			return `cmyk(${cmyk.toString()})`;
		case "hsv":
			const hsv: string[] = toHSV(h);
			return `hsv(${hsv.toString()})`;
		case "hsl":
			const hsl: string[] = toHSL(h);
			return `hsl(${hsl.toString()})`;
		default:
			return `#${h}`;
	}
};

export default randomColour;
