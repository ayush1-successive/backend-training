const scanner = require("sonarqube-scanner");

const userToken = 'squ_5856d7aba811ebd4acd98617218cfad0d419a142';

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: userToken,
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);
