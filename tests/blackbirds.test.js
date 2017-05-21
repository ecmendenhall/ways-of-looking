const blackbirds = require('../blackbirds');
jest.mock('fs');
const fs = require('fs');

describe('blackbirds', () => {

  test('generates an image path', () => {
    expect(blackbirds.imagePath(0, 0)).toBe('./assets/blackbirds/0/sentence0.jpg');
  });

  test('loads image data', () => {
    fs.readFileSync = jest.fn(() => {
      return 'abc123';
    })
    expect(blackbirds.loadImageData('./some/fake/path.jpg')).toBe('abc123');
  });

  test('calculates the next stanza', () => {
    expect(blackbirds.nextStanza()).toBe(0);
    expect(blackbirds.nextStanza('I')).toBe(1);
    expect(blackbirds.nextStanza('III')).toBe(3);
    expect(blackbirds.nextStanza('XIII')).toBe(0);
  });

  test('generates an image path based on the last stanza', () => {
    expect(blackbirds.nextImage('I')).toMatch(/\.\/assets\/blackbirds\/1\/sentence\d{1,2}\.jpg/);
  });

  test('generates the next post', () => {
    expect(blackbirds.nextPost('I')).toEqual({
      postContent: 'II',
      imageData: 'abc123'
    });
    expect(blackbirds.nextPost('XIII')).toEqual({
      postContent: 'I',
      imageData: 'abc123'
    });
  });
});
