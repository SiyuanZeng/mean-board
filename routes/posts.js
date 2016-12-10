// posts.js

var express = require('express');
var Post = require('../models/Post');

var router = express.Router();

// Index
router.get('/', function(req, res) {
	Post.find({}).sort({createdAt: -1}).exec(function(err, posts) {
		if (err) res.json(err);
		res.render('posts/index', {posts: posts});
	});
});

// New
router.get('/new', function(req, res) {	
	res.render('posts/new');
});

// Show
router.get('/:id', function(req, res) {
	Post.findOne({_id: req.params.id}, function(err, post) {
		if (err) res.json(err);
		res.render('posts/show', {post: post});
	});
});

// Edit
router.get('/:id/edit', function(req, res) {
	Post.findOne({_id: req.params.id}, function(err, post) {
		if (err) res.json(err);
		res.render('posts/edit', {post: post});
	});
});

// Create
router.post('/', function(req, res) {
	Post.create(req.body, function(err, post) {
		if (err) res.json(err);
		res.redirect('/posts');
	});
});

// Update
router.put('/:id', function(req, res) {
	req.body.updatedAt = Date.now();
	Post.findOneAndUpdate({_id: req.params.id}, req.body, function(err, post) {
		if (err) res.json(err);
		res.redirect('/posts/' + req.params.id);
	});
});

// Destory
router.delete('/:id', function(req, res) {
	Post.remove({_id: req.params.id}, function(err, post) {
		if (err) res.json(err);
		res.redirect('/posts');
	});
});

module.exports = router;