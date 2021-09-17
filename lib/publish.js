const path = require('path')

const { exec, findMaven } = require('./util')

function castArray(arr) {
  if (arguments.length > 0) {
    return Array.isArray(arr) ? arr : [arr]
  }
  return []
}

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease } = context
  logger.log(`Deploying version ${nextRelease.version} with maven`)

  const mvn = await findMaven()
  const settings = path.join(__dirname, '../settings.xml')
  const args = ['deploy', '-B', '-ntp', '-DskipTests', '-s', settings]

  const { profiles } = pluginConfig
  if (profiles) {
    args.push('-P', castArray(profiles).join())
  }
  await exec(mvn, args)
}
