/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import { ImageReducer } from "../../dist/imagemin-reducer";
import chalk from "chalk";
describe("Imagemin-Jpegtran Test", () => {
  const reducer = new ImageReducer();

  it("Should return an array which contains compressed images information", async () => {
    const response = await reducer
      .jpegtranCompress(
        "tests-dist/assets/**/*.jpg",
        "tests-dist/assets/jpegtran"
      )
      .then((value) => {
        console.log(chalk.bgCyanBright(value[0].destinationPath));
        return value;
      });
    expect(response.length).toEqual(1);
  });
});
