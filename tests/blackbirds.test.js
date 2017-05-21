const blackbirds = require('../blackbirds');
jest.mock('axios');
const axios = require('axios');

describe('blackbirds', () => {

  test('generates an image path', () => {
    expect(blackbirds.imagePath(0, 0)).toBe('https://s3.amazonaws.com/ways-of-looking/blackbirds/0/sentence0.jpg');
  });

  test('loads image data', () => {
    axios.get = jest.fn(() => {
      return new Promise((res, rej) => {
        res({data: 'abc123'})
      })
    })
    return blackbirds.loadImageData('./some/fake/path.jpg').then((data) => {
      expect(data).toBe('YWJjMTIz'); 
    });
  });

  test('calculates the next stanza', () => {
    expect(blackbirds.nextStanza()).toBe(0);
    expect(blackbirds.nextStanza('I')).toBe(1);
    expect(blackbirds.nextStanza('III')).toBe(3);
    expect(blackbirds.nextStanza('XIII')).toBe(0);
  });

  test('generates an image path based on the last stanza', () => {
    expect(blackbirds.nextImage('I')).toMatch(/https:\/\/s3\.amazonaws\.com\/ways-of-looking\/blackbirds\/1\/sentence\d{1,2}\.jpg/);
  });

  test('generates the next post', () => {
    return Promise.all([
      blackbirds.nextPost('I').then((nextPost) => {
        expect(nextPost).toEqual({
          postContent: 'II',
          imageData: 'YWJjMTIz'
        });
      }),
      blackbirds.nextPost('XIII').then((nextPost) => {
        expect(nextPost).toEqual({
          postContent: 'I',
          imageData: 'YWJjMTIz'
        })
      })
    ]);
  });
});
