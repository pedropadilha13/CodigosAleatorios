// ORIGINAL FILES

const fs = require('node:fs');
const path = require('node:path');

// Get all videos
const videos = fs.readdirSync(__dirname);

// Get video info
const withInfo = videos.map(name => ({
  name,
  time: fs.statSync(path.join(__dirname, name)).birthtime.getTime()
}));

// Sort videos and map to names only
const sortedVideos = withInfo.sort((a, b) => a.time - b.time).map(v => v.name);

// update extensions
const uptatedNames = sortedVideos.map(v => v.split('.')[0] + '.mp4');

// get arrays with current and new names
const nameMapping = uptatedNames.map((v, i) => [v, i + 1]);

// log results
console.log(nameMapping);


// ---------------------------------------------------------------------------------------

// CONVERTED FILES

const fs = require('node:fs');
const path = require('node:path');

// resulting array from original files
const namesMapping = [];

for (const [name, newName] of namesMapping) {
  const file = path.join(__dirname, name);

  try {
    // get file stats - if !exists, error is thrown
    const stats = fs.statSync(file);
    // console.log(stats);

    // build new filename
    const newFile = path.join(__dirname, newName + '.mp4');
    // console.log(newFile);

    // rename file
    fs.renameSync(file, newFile);
  } catch { }
}
