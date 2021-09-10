const { exec } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease } = context
  logger.log(`Updating pom.xml to version ${nextRelease.version}`)

  // const mvn = await findMaven()
  // await exec(mvn, [
  //   'versions:set',
  //   '-B',
  //   '-ntp',
  //   '-DgenerateBackupPoms=false',
  //   `-DnewVersion=${nextRelease.version}`
  // ])

  const ver = version => `<version>${version}<\\/version>`
  const script = `0,/${ver('.*')}/s/${ver('.*')}/${ver(nextRelease.version)}/`
  await exec('sed', ['-i', script, 'pom.xml'])
}

// sed -i '0,/<version>.*<\/version>/s/<version>.*<\/version>/<version>1.1.0<\/version>/' pom.xml
