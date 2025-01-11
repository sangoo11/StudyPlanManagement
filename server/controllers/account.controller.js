const { CREATED } = require("../core/success.response");
const Account = require("../models/account.model");

class AccountController {
    // Check if account is student
    checkAccountRole = async (req, res, next) => {
        const account = await Account.findByPk(req.params.accountID);
        if (!account) throw new Error('Account id not found');

        new CREATED({
            message: "Check User Role Success",
            metadata: {
                accountID: account.id,
                accountableType: account.accountableType,
            },
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new AccountController();