const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const blogpost = require('./model/schema');

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/posts', async (req, res) => {
    const newPost = new blogpost(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await blogpost.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await blogpost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        await blogpost.findByIdAndDelete(req.params.id);
        res.status(200).json("Post deleted successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
