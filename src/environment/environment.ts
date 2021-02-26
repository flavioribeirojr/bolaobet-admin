import { DevEnvironment } from './environment.dev';

export const Environment = getEnvironmentFromNodeENV();

function getEnvironmentFromNodeENV() {
    switch(process.env.NODE_ENV) {
        default:
            return DevEnvironment;
    }
}