const { exec, findMaven, parsePom } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease } = context
  logger.log(`Updating pom.xml to version ${nextRelease.version}`)

  const mvn = await findMaven()
  await exec(mvn, [
    'versions:set',
    '-B',
    '-DgenerateBackupPoms=false',
    `-DnewVersion=${nextRelease.version}`
  ])
  // debug
  await exec('git', ['ls-files', '-m', '-o'])
  const pom = await parsePom()
  console.log(pom)
}
