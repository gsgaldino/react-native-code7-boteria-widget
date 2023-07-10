const path = require('path');
const fs = require('fs');

const filePath = path.resolve('src', 'App.tsx');
const exists = fs.existsSync(filePath);

if (exists) {
  const callback = (err, data) => {
    if (err) throw err;

    const newConfigs = {
      botId: '639b8676654a920012250d0e',
      libraryPath: '../../lib/commonjs',
    };

    const modified = data
      .replace(/[a-fA-F0-9]{24}/, newConfigs.botId)
      .replace('react-native-code7-boteria-widget', newConfigs.libraryPath);

    fs.writeFile(filePath, modified, () =>
      console.log('App.tsx - File modified successfully!')
    );
  };

  fs.readFile(filePath, { encoding: 'utf-8' }, callback);
} else {
  throw new Error('App.tsx - file not found!');
}
