require('dotenv').config();
require('fs').writeFile(
  `${__dirname}/build/envs.js`,
  `var env={'SERVER_URL':'${process.env.SERVER_URL}'};`,
  () => { return undefined; },
);
