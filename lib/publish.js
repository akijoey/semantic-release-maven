const path = require('path')

const { exec, findMaven } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease } = context
  logger.log('Deploying version %s with maven', nextRelease.version)

  const mvn = await findMaven()
  const settings = path.join(__dirname, '../settings.xml')
  const args = ['deploy', '-B', '-DskipTests', '--settings', settings]
  if (pluginConfig.profile) {
    args.push('-P', pluginConfig.profile)
  }
  await exec(mvn, args)
}
