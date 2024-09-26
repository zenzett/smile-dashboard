export const capitalizeEachWord = (name?: string) => {
	if (!name) {
		return false;
	}

	let splitName = name?.split(" ");

	if (splitName?.length > 1) {
		return `${splitName[0]?.substr(0, 1).toUpperCase()}${splitName[1]?.substr(
			0,
			1,
		).toUpperCase}`;
	} else {
		return `${splitName[0]?.substr(0, 2).toUpperCase()}`;
	}
};
