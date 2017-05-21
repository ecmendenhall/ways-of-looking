const axios = require('axios');
const romanNumerals = require('roman-numerals');

function loadImageData(filepath) {
  return axios.get(filepath, {responseType: 'arraybuffer'}).then((res) => {
    return new Buffer(res.data, 'binary').toString('base64');
  });
}

function imagePath(stanza, number) {
  return `https://s3.amazonaws.com/ways-of-looking/blackbirds/${ stanza }/sentence${ number }.jpg`
}

function nextStanza(stanza) {
  if (stanza) {
    return romanNumerals.toArabic(stanza) % 13;
  } else {
    return 0;
  }
}

function nextImage(stanza) {
  let next = nextStanza(stanza);
  let imageNumber = randomInt(0, 100);
  return imagePath(next, imageNumber);
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function nextImageData(stanza) {
  return loadImageData(nextImage(stanza));
}

function nextPost(lastPost) {
  const next = nextStanza(lastPost) + 1;
  return nextImageData(lastPost).then((data) => {
    return {
      postContent: romanNumerals.toRoman(next).toString(),
      imageData: data 
    }
  });
}

module.exports = {
  imagePath: imagePath,
  loadImageData: loadImageData,
  nextStanza: nextStanza,
  nextImage: nextImage,
  nextImageData: nextImageData,
  nextPost: nextPost
}
