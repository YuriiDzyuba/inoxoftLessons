const ActivateLink = require('./activation.model');
const User = require('../users/user.model');
const transporter = require('../../utils/emailTransporter');
const getHtml = require('./static/getHtml');
const emailActions = require('./static/emailActions');

const { FRONT_URL } = require('../../config');

const accountService = {

    addNewActivationLink: async (link, userId) => {
        await ActivateLink.create({ link, user: userId });
    },

    sendMail: async (userMail, action, context = {}) => {

        context = { ...context, frontendURL: FRONT_URL };

        const emailInfo = await transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: emailActions[action].subject,
            html: getHtml(emailActions[action], context)
        });

        return emailInfo;
    },

    modifyUserAccount: async (_id, toBan) => {
        const modifiedUser = await User.findOneAndUpdate(_id, { isBanned: toBan });
        return modifiedUser;
    },

    findActivationLink: async (link, _id) => {
        const savedlink = await ActivateLink.findOneAndDelete({ link, user: _id });
        return savedlink;
    },
};

module.exports = accountService;
