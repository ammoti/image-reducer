/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import { ImageReducer } from "../../dist/imagemin-reducer";
import chalk from "chalk";
describe("Imagemin-Mozjpeg Test", () => {
  const reducer = new ImageReducer();

  it("Should return error if inputDir not exist or not reachable", async () => {
    await expect(
      reducer.mozjpegCompress("", "tests-dist/assets/uploads")
    ).rejects.toEqual(Error("Input directory not exists"));
  });

  it("Should return an array which contains compressed images information", async () => {
    const response = await reducer
      .mozjpegCompress("tests-dist/assets/**/.jpg", "tests-dist/assets/mozjpeg")
      .then((value) => {
        return value;
      });
    expect(response.length).toEqual(0);
  });
  it("Should return an array which contains compressed images information if user giving directly file name ", async () => {
    const response = await reducer
      .mozjpegCompress("tests-dist/assets/**/*.jpg", "tests-dist/assets/mozjpeg")
      .then((value) => {
        console.log(chalk.bgCyanBright(value[0].destinationPath));
        return value;
      });
    expect(response.length).toBeGreaterThan(1);
    expect(response[0].destinationPath).not.toEqual("");
  });
});
