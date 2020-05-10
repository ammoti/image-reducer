// TODO : Implement main functionality
/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import { main, CompressType } from "../dist/index";
describe("Image Reducer main test", () => {
  it("test main functionality", async () => {
    const plugins: CompressType[] = [CompressType.mozjpeg];
    const response = await main(
      "tests-dist/assets/",
      "tests-dist/assets/vahap",
      plugins
    ).then((value) => {
      return value;
    });
    console.log(response);
  });
});
