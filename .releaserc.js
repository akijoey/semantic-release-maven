// .releaserc.js

const config = '@akijoey/semantic-release-config'

module.exports = {
  extends: require.resolve(config),
  plugins: [...require(config).plugins, '@semantic-release/npm']
}
