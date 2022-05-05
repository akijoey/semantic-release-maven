# semantic-release-maven

[![npm][npm-image]][npm-url]
[![build][build-image]][build-url]
[![coverage][coverage-image]][coverage-url]
[![license][license-image]][license-url]

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a maven package.

| Step               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `verifyConditions` | Verify the environment variable and import the `gpg` secret. |
| `prepare`          | Update the `pom.xml` version.                                |
| `publish`          | Publish the maven package to the repository.                 |

## Install

`$ npm i semantic-release-maven -D`

## Usage

The plugin can be configured in the semantic-release configuration file:

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "semantic-release-maven"
  ],

  "prepare": [
    {
      "path": "semantic-release-maven"
    }
  ],
  
  "publish": [
    {
      "path": "semantic-release-maven",
      "profiles": ["release"]
    }
  ]
}
```

or if you are using YAML

```yaml
plugins:
  - "@semantic-release/commit-analyzer"
  - "@semantic-release/release-notes-generator"
  - semantic-release-maven
  
prepare:
  - path: "semantic-release-maven"
  
publish:
  - path: semantic-release-maven
    profiles:
      - release
``` 
## Configuration

### Environment variables

| Variable          | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `SERVER_USERNAME` | The username of the maven repository manager account.      |
| `SERVER_PASSWORD` | The password of the maven repository manager account.      |
| `GPG_PRIVATE_KEY` | The `gpg` private key for signing the published artifacts. |
| `GPG_PASSPHRASE`  | The passphrase of the `gpg` private key.                   |

### Options

| Options    | Description                                                     | Default |
| ---------- | --------------------------------------------------------------- | ------- |
| `serverId` | The `id` of the repository that maven tries to connect to.      | `ossrh` |
| `profiles` | List of profiles to activate when publishing the maven package. | none    |

## License

[MIT][license-url] © AkiJoey

[npm-image]: https://img.shields.io/npm/v/semantic-release-maven
[npm-url]: https://www.npmjs.com/package/semantic-release-maven
[build-image]: https://img.shields.io/github/workflow/status/akijoey/semantic-release-maven/Build
[build-url]: https://github.com/akijoey/semantic-release-maven/actions/workflows/build.yml
[coverage-image]: https://img.shields.io/codecov/c/gh/akijoey/semantic-release-maven
[coverage-url]: https://codecov.io/gh/akijoey/semantic-release-maven
[license-image]: https://img.shields.io/github/license/akijoey/semantic-release-maven
[license-url]: https://github.com/akijoey/semantic-release-maven/blob/main/LICENSE
