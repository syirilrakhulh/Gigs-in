
const bcrypt = require('bcrypt');

module.exports = (password,passwordHashed) => {
    return bcrypt.compareSync(password, passwordHashed);
}
