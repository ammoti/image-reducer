import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminJpegtran from "imagemin-jpegtran";
/**
 * Image Reducer class main class for this library wrap lot's of functionality of imagemin
 */
export class ImageReducer {
  /**
   * A function that using mozjpeg plugin for imagemin
   * @param {string[] | string} input can a folder  array or direct file name
   * @param {string} destination is a which directory in compressed images
   * @return {imagemin.Result[]} is a return value
   */
  async mozjpegCompress(input: string, destination: string) {
    const options: imagemin.Options = {
      plugins: [imageminMozjpeg({ quality: 65 })],
      destination: destination,
    };
    if (input.length === 0) throw new Error("Input directory not exists");
    const inputDir: string[] = [input];
    return await imagemin(inputDir, options).then((response) => {
      return response;
    });
  }
  /**
   * A function that using pngquant plugin for imagemin
   * @param {string[] | string} input can a folder  array or direct file name
   * @param {string} destination is a which directory in compressed images
   * @return {Promise<imagemin.Result[]>} is a return value
   */
  async pngquantCompress(input: string, destination: string) {
    const options: imagemin.Options = {
      plugins: [imageminPngquant({ quality: [0.2, 0.5] })],
      destination: destination,
    };
    if (input.length === 0) throw new Error("Input directory not exists");

    return await imagemin([input], options).then((response) => {
      return response;
    });
  }
  /**
   *
   * @param {string[]} input input directory for compress images using jpegtran algorithm
   * @param {string} destination destination file that will compresed
   */
  async jpegtranCompress(input: string, destination: string) {
    const options: imagemin.Options = {
      plugins: [imageminJpegtran({})],
      destination: destination,
    };
    if (input.length === 0) throw new Error("Input directory not exists");

    return await imagemin([input], options).then((response) => {
      return response;
    });
  }
}
