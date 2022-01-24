# GITHUB API - HE

## ABOUT

This is a simple NodeJS API that allows the user to pull basic info about pull requests for a given repository.com. The React Interface will automatically convert your GitHub repository URL and pass the appropraite fields to the server (owner, repo). No modification required on your end!

The API supports 3 endpoints, one primary two for very specific calls, for a particular repository.

This application will return an array of objects containing the following data points:

- Author
- Author Page 
- Commit Count
- Pull Request Creation Date
- Title of Pull Request

## HOW TO RUN

**Local Only:**
1. Navigate to /server/ and install packages via `npm install`
2. Turn on React UI via `npm run start`
3. Navigate to /client/ and install packages via `npm install`
4. Turn on React UI via `npm start`; `npm start` supports nodemon.
5. Navigate to http://localhost:3000/ and query!

EX github URL : https://github.com/colinhacks/zod


## Important
Within /server/utils/config there is a temporary API token (with limited access) to allow 5k queries/h. This token is only valid for 30 days, **afterwhich** you should input your own token for testing.

_Enjoy!_
