/* eslint-disable require-jsdoc */
// eslint-disable-next-line camelcase
const imagemin_reducer = require("../dist/index");

const resultTest = imagemin_reducer.main(
  "tests/assets/files/",
  "./test-compressed",
  [imagemin_reducer.CompressType.pngquant,imagemin_reducer.CompressType.mozjpeg]
);
async function main() {
  const response = await resultTest.then((value) => {
    return value;
  });
  console.log(response);
}
main();