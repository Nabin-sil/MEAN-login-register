const mongoose = require("mongoose");
const Order = require("../order/order.model");
const Post = require("../Post/post.model");



exports.posts_create = (req, res, next) => {
        let title = req.body.title;
        let content = req.body.content;
        let imagePath = req.file.imagePath;
        let post = new Post({
          title,
          content,
          imagePath
        })
        post.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created post successfully",
          createdProduct: {
            _id: result._id,
            title: result.title,
            content: result.content,
            imagePath: result.imagePath,
            request: {
              type: "POST"
         //     url: "http://localhost:3000/products/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

    }




    exports.posts_create= (req, res, next) => {
        const url = req.protocol + "://" + req.get("host")
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file.filename,
            creator: req.userData.userId,
            postDate: req.body.postDate,
        })
        post.save().
            then(post => {
                if(post){
                    res.status(201).json({
                        message: "Post added successfully",
                        post: {
                            ...post,
                            id: post._id
                        }
                    })
                }
                else{
                    res.status(500).json({ message: "Error Adding Post" });
                }
                
            })
            .catch(e => {
            })
    }