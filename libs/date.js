exports.getDate = function (post_date) {
	const currentDate = Date.now();
	const today = !post_date ? new Date(currentDate) : new Date(post_date);
	const options = {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	};
	return today.toLocaleDateString("en-US", options);
};
