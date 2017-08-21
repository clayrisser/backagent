# blogagent _Alpha_

Backend agent for BlogDown

Please &#9733; this repo if you found it useful &#9733; &#9733; &#9733;

## Features
* Sync git with blogdown


## Setup

1. Install dependencies and initialize project

  ```sh
  git clone git@github.com:thingdown/blogagent.git
  cd blogagent && npm install
  ```

2. Start the database

  ```
  npm run data
  ```
  
3. In another terminal start trailblazer

  ```
  npm start
  ```


## Dependencies

* [Docker](https://www.docker.com/)
* [NPM](https://nodejs.org/)
* [Node](https://www.npmjs.com/)


## Usage

### Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Start the development server          |
| `npm run data`  | Run the database                      |
| `npm run lint`  | Lint the code                         |
| `npm run test`  | Test the code                         |
| `npm run build` | Build the docker container            |
| `npm run run`   | Run the docker container              |
| `npm run ssh`   | SSH into the docker container         |
| `npm run essh`  | SSH into the running docker container |
| `npm run push`  | Push the docker container             |


## Support

Submit an [issue](https://github.com/thingdown/blogagent/issues/new)


## Buy Me Coffee

A ridiculous amount of coffee was consumed in the process of building this project.

Add some fuel at [coffee.jamrizzi.com](https://coffee.jamrizzi.com/) if you'd like to keep me going!


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

[MIT License](https://github.com/thingdown/blogagent/blob/master/LICENSE)

[Jam Risser](https://jamrizzi.com) &copy; 2017


## Credits

* [Jam Risser](https://jamrizzi.com) - Author
* Built with [TrailsJS](https://trailsjs.io/)
* Loosly based on [SailsJS](http://sailsjs.com/)


## Changelog

0.0.1 (2017-08-20)
* Initial release
