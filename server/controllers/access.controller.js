const { CREATED } = require("../core/success.response");
const { StudentAccessService } = require('../services/access.service');

class AccessController {
    //handle student signup
    studentSignUp = async (req, res, next) => {
        new CREATED({
            message: "Registered OK",
            metadata: await StudentAccessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle student signin
    studentSignIn = async (req, res, next) => {
        new CREATED({
            message: "Login Success",
            metadata: await StudentAccessService.signIn(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };


    // teacherSignUp = async (req, res, next) => {

    // }
    // teacherSignIn = async (req, res, next) => {

    // }
    // adminSignIn = async (req, res, next) => {

    // }

}

module.exports = new AccessController();