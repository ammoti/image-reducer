/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import { ImageReducer } from "../../dist/imagemin-reducer";
import chalk from "chalk";
describe("Imagemin-Pngquant Test", () => {
  const reducer = new ImageReducer();

  it("Should return error if inputDir not exist or not reachable", async () => {
    await expect(
      reducer.pngquantCompress("", "tests-dist/assets/uploads")
    ).rejects.toEqual(Error("Input directory not exists"));
  });

  it("Should return an array which contains compressed images information", async () => {
    const response = await reducer
      .pngquantCompress(
        "tests-dist/assets/**/*.png",
        "tests-dist/assets/uploads"
      )
      .then((value) => {
        return value;
      });
    expect(response.length).toBeGreaterThan(0);
  });
  it("Should return an array which contains compressed images information if user giving directly file name ", async () => {
    const response = await reducer
      .pngquantCompress(
        "tests-dist/assets/files/**/*.png",
        "tests-dist/assets/pngquant"
      )
      .then((value) => {
        console.log(chalk.bgRedBright(value[0].destinationPath));
        return value;
      });
    expect(response[0].destinationPath).not.toEqual("");
  });
});
