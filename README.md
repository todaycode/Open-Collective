# Open Collective Frontend

[![Circle CI](https://circleci.com/gh/opencollective/frontend/tree/master.svg?style=shield)](https://circleci.com/gh/opencollective/frontend/tree/master)
[![Slack Status](https://slack.opencollective.org/badge.svg)](https://slack.opencollective.org)
[![Dependency Status](https://david-dm.org/opencollective/frontend/status.svg)](https://david-dm.org/opencollective/frontend)
[![Greenkeeper badge](https://badges.greenkeeper.io/opencollective/frontend.svg)](https://greenkeeper.io/)

![](https://d.pr/i/MOS677+)

## How to get started

Note: If you see a step below that could be improved (or is outdated), please update instructions. We rarely go through this process ourselves, so your fresh pair of eyes and your recent experience with it, makes you the best candidate to improve them for other users.

## Installation

1. Install the API

We recommend creating a new directory in your dev folder for `opencollective`

```
mkdir opencollective;
cd opencollective;
git clone git@github.com:opencollective/opencollective-api.git api;
cd api;
npm install;
```

See the [API GitHub Repo](https://github.com/opencollective/opencollective-api) for more details.

2. Install the Frontend

```
git clone git@github.com:opencollective/frontend.git frontend;
cd frontend;
npm install;
```

If you are using Ubuntu, make sure you have [GraphicsMagick](http://www.graphicsmagick.org) installed:

```
sudo apt-get install graphicsmagick
```

3. Run

```
$> npm run dev
```

This will start the Frontend on http://localhost:3000 in development environment. It will automatically update whenever a file changes (using hot module reloading).

The API comes with a sanitized version of the database that includes the following collectives:
- [http://localhost:3000/opensource](http://localhost:3000/opensource)
- [http://localhost:3000/apex](http://localhost:3000/apex)
- [http://localhost:3000/railsgirlsatl](http://localhost:3000/railsgirlsatl)
- [http://localhost:3000/tipbox](http://localhost:3000/tipbox)
- [http://localhost:3000/brusselstogether](http://localhost:3000/brusselstogether)
- [http://localhost:3000/veganizerbxl](http://localhost:3000/veganizerbxl)

## Tests

We are using [Jest](https://facebook.github.io/jest/) for testing.
You can run the tests using `npm test` or more specifically `npm run test:src`, `npm run test:server`, `npm run test:e2e`.

End-to-end tests are using [Cypress](https://www.cypress.io/). 

## Stack

We are using NodeJS.

The Frontend is using [next](https://zeit.co/next) (which includes Webpack and hot module reloading), React.

The API is using Postgres, GraphQL.

## Localize

To add a translation to a new language, copy paste the `en.json` from `frontend/src/lang` and rename the copy using the 2 or 4 letter code for your country/language (e.g. `fr-BE.json` or `fr.json`).

You will also need to copy paste the last line in `frontend/scripts/translate.js`:
```
fs.writeFileSync(LANG_DIR + 'ja.json', JSON.stringify(translatedMessages('ja'), null, 2));
```

and replace `ja` with your 2-4 letter locale code.

Then you can submit a pull request, like this one :-)
https://github.com/opencollective/frontend/pull/119

## Contributing

1. Your commits conform to the conventions established [here](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)
2. This project used [commitizen](https://github.com/commitizen/cz-cli) and [semantic-release](https://github.com/semantic-release/semantic-release) to handle npm version from CI
  + run git add first to add your changes to staging
  + use `npm run commit` to commit, and CI will do the rest.
  + if changes contain breaking change, use `BREAKING CHANGE` keyword in the comment to trigger major release
  + before push to git and trigger CI, you can dry run `npm run semantic-release` locally to make sure the version number is push as expected.
