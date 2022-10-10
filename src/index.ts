/**
 * Generate a random hex colour
 * @returns a hex colour code
 */
export const randomColour = () => {
	let h = "#";
	for (let i = 0; i < 6; i++) {
		h += Math.floor(Math.random() * 16).toString(16);
	}
	return h;
};
