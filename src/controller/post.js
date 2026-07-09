const { v4: uuidv4 } = require("uuid");
const database = require('../services/database');
class PostController {

    static create(req, res, next) {

        return new Promise((resolve, reject) => {
            try {

                let { title, desc } = req.body;
                console.log("request body >>>",req.body);
                let postId = uuidv4();
                console.log("post Id ",postId);
                let query = `insert into posts (id,title,description) values('${postId}','${title}','${desc}')`;

                console.log("Query >>>",query);
                database.hypercallDb(query)
                    .then((postData) => {
                        console.log("Post Data >>>", postData);
                        res.status(200).send({ data: postData, message: 'Post Data Created' });
                    }).catch(error => {
                        next(error);
                    })
            } catch (error) {
                next(error);
            }
        })
    }

    static getAll(req, res, next) {

        return new Promise((resolve, reject) => {
            try {

                let query = `select * from posts`;
                database.hypercallDb(query)
                    .then((postDataList) => {
                        console.log("Post Data List >>>>", postDataList);
                        res.status(200).send({ data: postDataList, message: 'Post details' });
                    }).catch(error => {
                        next(error);
                    })
            } catch (error) {
                next(error);
            }
        })
    }

    static getById(req, res, next) {
        return new Promise((resolve, reject) => {
            try {

                let { postId } = req.params;
                let query = `select * from posts where id='${postId}'`;
                database.hypercallDb(query)
                    .then(postData => {
                        console.log("Post Data >>>", postData);
                        res.status(200).send({ data: postData, message: "Post Details" });
                    }).catch(error => {
                        next(error);
                    })
            } catch (error) {
                next(error);
            }
        })
    }

    static delete(req, res,next) {
        return new Promise((resolve, reject) => {

            try {
                let { postId } = req.params;

                let query = `delete from posts where id='${postId}'`;
                database.hypercallDb(query)
                    .then(postData => {
                        console.log("Post Data>>>>", postData);
                        res.status(200).send({ data: postData, message: "Post Deleted!" })
                    }).catch(error => {
                        next(error);
                    })
            } catch (error) {
                next(error);
            }
        })
    }

}

module.exports = PostController;
