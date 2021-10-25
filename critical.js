// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const critical = require('critical');

critical.generate({
  base: path.resolve(__dirname, 'dist'),
  src: 'index.html',
  target: 'index.html',
  inline: true,
  height: 640,
  width: 360,
}, (err, output) => {
  if (err) {
    console.error(err);
  } else if (output) {
    console.log('Generated critical CSS');
  }
});
