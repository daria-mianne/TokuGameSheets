import { initTokenJobs } from './tokenJobs';

const jobInitMethods = [
    initTokenJobs
];

export const initAllJobs = () => {
    for (const initMethod of jobInitMethods) {
        initMethod();
    }
}