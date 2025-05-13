const { CREATED } = require("../core/success.response");
const { AccessService } = require('../services/access.service');

class AccessController {
    //handle signup
    SignUp = async (req, res, next) => {
        new CREATED({
            message: "Registered OK",
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle signin
    SignIn = async (req, res, next) => {
        new CREATED({
            message: "Login Success",
            metadata: await AccessService.signIn(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle send code
    SendCode = async (req, res, next) => {
        new CREATED({
            message: "Send Code Success",
            metadata: await AccessService.sendCode(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle verify code
    VerifyCode = async (req, res, next) => {
        new CREATED({
            message: "Verify Code Success",
            metadata: await AccessService.verifyCode(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    //handle create account
    CreateAccount = async (req, res, next) => {
        new CREATED({
            message: "Create Account Success",
            metadata: await AccessService.createAccount(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new AccessController();