// const { request } = require('undici');

const { Octokit } = require('@octokit/core');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

octokit
    .request(`GET /repos/{owner}/{repo}`, {
        repo: 'montage',
        owner: 'bigbigDreamer',
        sha: '222dfefefesssf',
    })
    .then((res) => {
        console.log(res, 'res');
    })
    .catch((e) => {
        console.log(e, 'ee');
    });
