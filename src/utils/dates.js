export const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(dateOne, dateTwo) {
	const dateOneInMilli = dateOne.getTime();
	const dateTwoInMilli = dateTwo.getTime();

	let differenceInMilli;
	let differenceInDays;

	if (dateOneInMilli > dateTwoInMilli) {
		differenceInMilli = dateOneInMilli - dateTwoInMilli;
	} else {
		differenceInMilli = dateTwoInMilli - dateOneInMilli;
	}

	differenceInDays = Math.floor(differenceInMilli / ONE_DAY_IN_MILLISECONDS);

	return differenceInDays;
}
