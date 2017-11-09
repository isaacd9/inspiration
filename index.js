#!/usr/bin/env node
const https = require('https');

const wrap = require('wordwrap')(80);
const chalk = require('chalk');

const slug = process.argv.length > 2 ? process.argv[2] : '';

async function get(slug) {
  let url = `https://instagraham.io/api/${slug}`;
  return new Promise(resolve => {
    https.get(url, result => {
      if (result.statusCode !== 200) {
        process.exit(1);
      }
      let rawdata = '';
      result.on('data', data => {
        rawdata += data;
      });
      result.on('end', () => {
        resolve(JSON.parse(rawdata));
      });
    });
  });
}

async function run() {
  let data = await get(slug);
  console.log(chalk.red(wrap(`"${data.quote}" - ${data.url}`)));
}

run();

