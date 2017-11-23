const keys = require('../../config/keys');

module.exports = ({ body }) => {
    return `
        <html>
        <body style="text-align:center;">
            <h3>I'd like your input!</h3>
            <p>Please answer:</p>
            <p>${body}</p>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
            </div>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
            </div>
        </body>
        <html>
    `;
};
