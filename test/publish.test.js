const path = require('path')

const publish = require('../lib/publish')
const { exec, findMaven } = require('../lib/util')

jest.mock('../lib/util')
findMaven.mockReturnValue('mvn')

describe('publish', () => {
  const context = {
    logger: { log: jest.fn() },
    nextRelease: { version: '1.0.0' }
  }
  const settings = path.join(__dirname, '../settings.xml')
  const args = ['deploy', '-B', '-ntp', '-DskipTests', '-s', settings]

  it('publish without profile', async () => {
    await publish({}, context)
    expect(exec).toHaveBeenCalledWith('mvn', args)
  })

  it('pubish with single profile', async () => {
    await publish({ profiles: 'release' }, context)
    expect(exec).toHaveBeenCalledWith('mvn', args.concat('-P', 'release'))
  })

  it('pubish with multiple profiles', async () => {
    await publish({ profiles: ['test', 'release'] }, context)
    expect(exec).toHaveBeenCalledWith('mvn', args.concat('-P', 'test,release'))
  })
})
