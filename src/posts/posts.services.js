const { json } = require("sequelize");
const postControllers = require("./posts.controllers");

const getAllPosts = (req, res) => {
    postControllers
        .findAllPosts()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const getPostById = (req, res) => {
    const id = Number(req.params.id);
    postControllers
        .findPostById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "post not found" });
            }
        })
        .catch((err) => {
            res.status(404).json(err);
        });
};

const createNewPost = (req, res) => {
    const newPostObj = req.body;
    postControllers
        .createPost(newPostObj)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(400), json(err);
        });
};

const deletePost = (req, res) => {
    const id = req.params.id;
    postControllers
        .deletePost(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: `post whit id :${id} deleted successfully`,
                });
            } else {
                res.status(404).json({ message: "post not found" });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const patchPost = (req, res) => {
    const id = req.params.id;
    const postObj = req.body;

    postControllers
        .updatePost(id, postObj)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: `post whit id: ${id} updated successfully`,
                });
            } else {
                res.status(404).json({ message: "post not found" });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const putPost = (req, res) => {
    const id = req.params.id;
    const postObj = req.body;

    if (!postObj.content || postObj.userName || postObj.isPublished) {
        return res.status(400).json({
            message: "missing data",
            example_field: {
                content: "string",
                userName: "Jhon Doe",
                isPublished: true,
            },
        });
    }
    postControllers
        .updatePost(id, postObj)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: `post whit id: ${id} updated successfully`,
                });
            } else {
                res.status(404).json({ message: "post not found" });
            }
        })
        .catch((err) => {
            res.status(404).json(err);
        });
};

module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    deletePost,
    patchPost,
    putPost,
};
