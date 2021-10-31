function getImageName(url="") {
  const split = url.split('/')[4];

  const letters = split.split('').reverse();

  let image = [];
  let foundDot = false;

  for (let letter of letters) {
    if (!foundDot) {
      if (letter === '.') {
        foundDot = true;
      }
      continue;
    }

    image.push(letter);
  }

  return String(image.reverse().join(''));
}

module.exports = { getImageName };
