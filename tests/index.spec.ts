// TODO : Implement main functionality
/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import { main, CompressType } from "../dist/index";
describe("Image Reducer main test", () => {
  it("test main functionality", async () => {
    const plugins: CompressType[] = [
      CompressType.mozjpeg,
      CompressType.pngquant,
    ];
    const response = await main(
      "tests-dist/assets/",
      "tests-dist/compressed/vahap",
      plugins
    ).then((value) => {
      return value;
    });
    expect(response).toHaveLength(3);
  });
});
