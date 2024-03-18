const scanner = require('sonarqube-scanner');

const userToken = 'squ_8491bb2f5a60b389bf2c6dfb3159cbc7276a6302';

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: userToken,
        options: {
            'sonar.sources': './src',
            'sonar.exclusions': '**/__test__/**, **/index.ts',
        },
    },
    () => process.exit(),
);
