/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

 const sentMail = require("../api/controllers/sent-mail");
module.exports.routes = {
    'post /alphaway/sent-mail': sentMail
};
