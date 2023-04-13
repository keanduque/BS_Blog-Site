/*
 * Title : Blog Site MEN
 * Author : Kean Duque
 * Description : Blog App MEN
 */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");

const connectDB = require("./db");
const date = require("./libs/date");
const blog = require("./controllers/posts");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // postman Body x-www-form-urlencoded - JSON
app.use(express.static("public"));

//Connect to DB
connectDB()
	.then(() => {
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	})
	.catch((err) => console.log(err));

const posts = [];

//Server Routers
app.get("/", async (req, res) => {
	await blog
		.displayPost()
		.then((posts) => {
			res.render("home", {
				homeContent: blog.homeStartingContent,
				postedList: posts,
				moment: moment,
			});
		})
		.catch((err) => console.log(err));
});
app.get("/about", (req, res) => {
	res.render("about", { aboutContent: blog.aboutContent });
});
app.get("/contact", (req, res) => {
	res.render("contact", { contactContent: blog.contactContent });
});

app.get("/compose", async (req, res) => {
	await res.render("compose");
});
app.post("/compose", async (req, res) => {
	const post_title = req.body.post_title;

	const postObj = {
		title: _.lowerCase(post_title),
		author: _.capitalize(req.body.post_author),
		date: date.getDate(req.body.post_date),
		content: req.body.post_content,
		titleURI: _.kebabCase(post_title),
	};
	await blog.insertPost(postObj, post_title, res);
});

app.get("/posts/:postTitle", async (req, res) => {
	const postTitleParam = _.lowerCase(req.params.postTitle);

	await blog
		.displayPost({ title: postTitleParam })
		.then((post) => {
			const postTitle = _.lowerCase(post.title);
			if (postTitle === postTitleParam) {
				res.render("post", {
					title: _.capitalize(post.title),
					content: post.content,
				});
			}
		})
		.catch((err) => console.log(err));
});

app.get("/posts", async (req, res) => {
	await blog
		.displayPost()
		.then((posts) => {
			res.render("posts", {
				postedList: posts,
			});
		})
		.catch((err) => console.log(err));
});
