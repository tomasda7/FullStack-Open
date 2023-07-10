const app = require('./app')
const { info } = require('./utils/loggers')
const config = require('./utils/config')

app.listen(config.PORT, () => {
    info(`Server running on port ${config.PORT}`)
})
