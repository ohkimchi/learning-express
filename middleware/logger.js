const moment = require('moment')

const logger = (req, res, next) => {
  console.log(moment().format())
  next()
}

module.exports = logger
