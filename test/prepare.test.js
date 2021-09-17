const prepare = require('../lib/prepare')
const { exec, findMaven } = require('../lib/util')

jest.mock('../lib/util')
findMaven.mockReturnValue('mvn')

describe('prepare', () => {
  const context = {
    logger: { log: jest.fn() },
    nextRelease: { version: '1.0.0' }
  }

  it('update version', async () => {
    await prepare({}, context)
    expect(exec).toHaveBeenCalledWith('mvn', [
      'versions:set',
      '-B',
      '-ntp',
      '-DgenerateBackupPoms=false',
      `-DnewVersion=1.0.0`
    ])
  })
})
