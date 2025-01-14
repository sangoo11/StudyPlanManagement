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
}

module.exports = new AccountController();