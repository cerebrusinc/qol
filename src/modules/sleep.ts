/**
 * A js syntax version of the pythonic `time.sleep` function to add a delay to your processes in development to mimic delays in production.
 *
 * @param ms The length of the delay in milliseconds
 * @param error If the `Promise` should reject to mimic an error
 * @returns `Promise<unknown>`; must be awaited
 */
const sleep = (ms: number, error?: boolean): Promise<unknown> => {
	if (error) return new Promise((_, reject) => setTimeout(reject, ms));
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;
