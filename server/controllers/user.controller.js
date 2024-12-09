const { CREATED } = require("../core/success.response");
const { User } = require('../models');
const { ROLE } = require('../services/access.service');

class UserController {
    // Check if user is student
    checkUserRole = async (req, res, next) => {
        const user = await User.findByPk(req.params.userId);
        if (!user) throw new Error('User id not found');

        new CREATED({
            message: "Check User Role Success",
            metadata: {
                user: {
                    userId: user.id,
                    userRole: user.role,
                }
            },
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new UserController();