const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
	title: {
		type: String,
		required: [true, "Please insert Title!"],
	},
	author: {
		type: String,
		required: [true, "Please insert Author!"],
	},
	date: {
		type: Date,
	},
	content: {
		type: String,
		required: [true, "Please insert Content!"],
	},
	titleURI: {
		type: String,
	},
});
const Post = mongoose.model("Post", postSchema);

module.exports = {
	Post: Post,
};
