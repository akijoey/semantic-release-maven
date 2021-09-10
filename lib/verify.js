const path = require('path')
const fs = require('fs-extra')
const AggregateError = require('aggregate-error')

const { exec, getEnv, setEnv, parsePom } = require('./util')

const errors = []

function assertEnv(name) {
  if (!getEnv(name)) {
    const message = `Environment variable ${name} is not set`
    errors.push(new Error(message))
  }
}

function assertPom(pom, name) {
  if (!pom.project[name]) {
    const message = `Missing ${name} elements in pom.xml file`
    errors.push(new Error(message))
  }
}

module.exports = async function verifyConditions(pluginConfig, context) {
  const { logger } = context
  logger.log('Validating env and pom.xml file')

  const pom = await parsePom()
  assertPom(pom, 'groupId')
  assertPom(pom, 'artifactId')
  assertPom(pom, 'version')

  setEnv('SERVER_ID', pluginConfig.serverId || 'ossrh')
  assertEnv('SERVER_USERNAME')
  assertEnv('SERVER_PASSWORD')
  assertEnv('GPG_PRIVATE_KEY')
  assertEnv('GPG_PASSPHRASE')

  if (errors.length > 0) {
    throw new AggregateError(errors)
  }

  const secret = path.join(__dirname, '../secret.asc')
  fs.writeFileSync(secret, getEnv('GPG_PRIVATE_KEY'))
  await exec('gpg', ['--import', '--batch', secret])
  fs.unlinkSync(secret)
}
