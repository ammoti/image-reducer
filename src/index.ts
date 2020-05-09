import { ImageReducer } from "./imagemin-reducer";

/**
 * Main Method for Return
 * @param {string} input is a value for input
 * @param {string} destination is a destionation part
 * @param {CompressType} compressMethod is a enum that using compress method
 * @return {Promise<imagemin.Result[]>}value should something
 */
export async function main(
  input: string | string[],
  destination: string,
  compressMethod: CompressType[]
) {
  const re = /(?:\.([^.]+))?$/;
  const inputDir: string[] =
    (typeof input !== null || typeof input !== undefined) &&
    typeof input === "string"
      ? new Array<string>(input)
      : (input as string[]);
  const reducer = new ImageReducer();
  for (const i in compressMethod) {
    if (!isNaN(Number(i))) {
      const fileExtension = re.exec(inputDir[0])[1];
      switch (fileExtension) {
        case ".jpg" || ".jpeg":
          if (Number(i) === CompressType.mozjpeg) {
            const mozjpeg = reducer.mozjpegCompress(inputDir, destination);
            return mozjpeg;
          }
          if (Number(i) === CompressType.jpegtran) {
            const jpegtran = reducer.jpegtranCompress(inputDir, destination);
            return jpegtran;
          }
          break;
        case ".png":
          if (Number(i) === CompressType.pngquant) {
            const pngquant = reducer.pngquantCompress(inputDir, destination);
            return pngquant;
          }
          break;
      }
    }
  }
}
export enum CompressType {
  mozjpeg,
  jpegtran,
  pngquant,
}
