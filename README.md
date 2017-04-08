# Student Management System
Our goal is to provide software which can help executive staffs and advisors improve educational plans
as well as student management system. The system must provide services as following.
* The system must be able to provide general information of a student.
* The system must be able to provide a student’s curriculum.
* The system must be able to show the enrollment records of a student.
* The system must be able to display behavioral score records of the student.
* The system must be able to show activity and awarding records of each student.
* The system must be able to show leaving records of the student.
* The system must provide the information of each student for their advisor to give an advice for
course registration and further studying plan.
* The system must be able to provide the summary of all the students in each year.
* In addition, we need to create the system in which the staffs can edit or update the data of the students
as well as view the summary of the information in the system for further analysis.

Lastly, we would like to give special thank to [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) team as our project is built on configuration of this team.


## Table of Contents
1. [Prerequisites](#prerequisites)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Developer Tools](#developer-tools)
  1. [Routing](#routing)
1. [Testing](#testing)

## Prerequisites
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

## Getting Started
First, clone the project via any GUI you prefer or clone it via your terminal:

```bash
$ git clone https://github.com/JThanat/student-management-system/ <my-project-name>
$ cd <my-project-name>
```

Install the dependencies using [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn start      # Compile and launch (same as `npm start`)
```

If you want to watch file change in api development. You should run 

```bash
$ yarn dev      # Compile, run and watch
```

For further useful instruction, you can check it out from [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## Application Structure
We follow the application structure provided by [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit). We use the application Structure suggested in
[awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

## Development

### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from `npm`:

```bash
npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

### Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/project.config.js`.
