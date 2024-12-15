const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')


const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})