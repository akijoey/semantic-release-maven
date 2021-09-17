const path = require('path')

const verify = require('../lib/verify')
const { exec, getEnv, parsePom } = require('../lib/util')

jest.mock('fs-extra')
jest.mock('../lib/util')
getEnv.mockReturnValue(true)
parsePom.mockResolvedValue({
  project: {
    groupId: 'com.akijoey',
    artifactId: 'test',
    version: '1.0.0'
  }
})

describe('verify', () => {
  const context = {
    logger: { log: jest.fn() },
    nextRelease: { version: '1.0.0' }
  }

  it('import gpg secret', async () => {
    await verify({}, context)
    expect(exec).toHaveBeenCalledWith('gpg', [
      '--import',
      '--batch',
      path.join(__dirname, '../secret.asc')
    ])
  })
})
