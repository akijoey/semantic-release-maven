const execa = require('execa')
const fs = require('fs-extra')
const xml2js = require('xml2js-es6-promise')

function exec() {
  const childProcess = execa(...arguments)
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stderr)
  return childProcess
}

function getEnv(name) {
  return process.env[name]
}

function setEnv(name, value) {
  process.env[name] = value
}

async function parsePom() {
  const path = './pom.xml'
  const stats = await fs.stat(path)
  if (!stats) {
    throw new Error('Missing pom.xml file')
  }
  const pom = await fs.readFile(path, 'utf8')
  return await xml2js(pom)
}

async function findMaven() {
  return new Promise((resolve, reject) => {
    access('mvnw', constants.F_OK, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve('mvn')
        } else {
          reject(err)
        }
      } else {
        resolve('./mvnw')
      }
    })
  })
}

module.exports = {
  exec,
  getEnv,
  setEnv,
  parsePom,
  findMaven
}
