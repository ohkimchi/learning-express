const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api/users', require('./api/user_api'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

