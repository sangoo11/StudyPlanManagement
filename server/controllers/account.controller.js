const { CREATED } = require("../core/success.response");
const AccountService = require("../services/account.service");

class AccountController {
    // Check account type
    checkAccountRole = async (req, res, next) => {
        new CREATED({
            message: "Check Account Type Success",
            metadata: await AccountService.checkAccountRole(req.params.accountID),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Active account
    activeAccount = async (req, res, next) => {
        new CREATED({
            message: "Active Account Success",
            metadata: await AccountService.activeAccount(req.params.accountID),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Deactive account
    deactiveAccount = async (req, res, next) => {
        new CREATED({
            message: "Deactive Account Success",
            metadata: await AccountService.deactiveAccount(req.params.accountID, req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Get userID by accountID
    getUserIDByAccountID = async (req, res, next) => {
        new CREATED({
            message: "Get User ID Success",
            metadata: await AccountService.getUserIDByAccountID(req.params.accountID),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    // Get userData by accountID
    getUserDataByAccountID = async (req, res, next) => {
        new CREATED({
            message: "Get User Data Success",
            metadata: await AccountService.getUserDataByAccountID(req.params.accountID),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    editUserDataByAccountID = async (req, res, next) => {
        new CREATED({
            message: "Edit User Data Success",
            metadata: await AccountService.editUserDataByAccountID(req.params.accountID, req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };



}

module.exports = new AccountController();