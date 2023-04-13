const Post = require("../models/Post").Post;

let errors = {};

const insertPost = async (post, post_title, res) => {
	await Post.findOne({ title: post_title }).then((findPost) => {
		if (!findPost) {
			new Post(post)
				.save()
				.then(() => console.log("New Post Succesfully Added!"))
				.catch((error) => {
					Object.keys(error.errors).forEach((key) => {
						errors[key] = error.errors[key].message;
					});
					console.log(errors);
				});
			res.redirect("/");
		} else {
			console.log("Post Exists!");
			console.log("Post Exists!");
			res.redirect("/compose");
		}
	});
};

const displayPost = (search) => {
	if (!search) {
		return Post.find({});
	} else {
		return Post.findOne({ title: search.title });
	}
};

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Kean Diario Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"I love cats i am one wake up scratch humans leg for food then purr then i have a and relax shake treat bag see owner, run in terror but cat cat moo moo lick ears lick paws. Rub whiskers on bare skin act innocent relentlessly pursues moth refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am for human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap has closed eyes but still sees you.";

module.exports = {
	insertPost: insertPost,
	displayPost: displayPost,
	homeStartingContent: homeStartingContent,
	aboutContent: aboutContent,
	contactContent: contactContent,
	Post: Post,
};
