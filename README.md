# react-daily-utilities
Daily utilities for React.js

## Usage

### Install package
```
 npm i --save-dev react-daily-utilities
```

### Use package
* Import to component (example with useLogger hook)
```
 import {useLogger} from "react-daily-utilities";
```

* Init class/function/component name for every component (default local environment)
```
 const logger = useLogger({className: <app-name>});
```

* Write log with type info | warning | error
```
 logger.log_info(data, options);
```
```
 logger.log_warn(data, options);
```
```
 logger.log_error(data, options);
```

## Development commands

```
 // watch
 yarn start

 // or
 npm run start
```

```
 // builds the dist folder
 yarn build

 // or
 npm run build
```

## Deployment to NPM

### Login to correct NPM account

```
npm login
```

### Versioning

Increase the version number as per NPM guides [https://docs.npmjs.com/about-semantic-versioning].

```
// increases the first digit i.e. from 0.5.4 to 1.0.0
npm version major

// increases the second digit i.e. from 0.0.3 to 0.1.0
npm version minor

// increases the third digit i.e. from 0.0.1 to 0.0.2
npm version patch
```

### Deployment

Run the command and the package should be up.

```
npm publish --access public
```

### Flow deploy
* Build project
* Login (if not login)
* Commit and push
* Set version
* Publish
