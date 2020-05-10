/* eslint-disable no-unused-vars */
import { ImageReducer } from "./imagemin-reducer";
import glob from "glob";

/**
 *
 * @param {string}element File
 * @return {string[]} fileList TODO:Düzeltilecek
 */
async function getFileList(element: string) {
  const fileList: string[] = [];
  return new Promise((resolve, rejects) => {
    glob(element + "**/*.jpg", (error, matches) => {
      if (error) {
        console.log("Hata", error.message);
      }
      for (let f = 0; f < matches.length; f++) {
        const element = matches[f];
        fileList.push(element);
      }
      resolve(fileList);
    });
  });
  console.log("filelist", fileList);
  return fileList;
}

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
  try {
    const inputDir: string[] =
      (typeof input !== null || typeof input !== undefined) &&
      typeof input === "string"
        ? new Array<string>(input)
        : (input as string[]);
    const reducer = new ImageReducer();
    const re = /(?:\.([^.]+))?$/;
    let fileList: string[] = ["test/"];
    for (let i = 0; i < inputDir.length; i++) {
      const element = inputDir[i].toString();
      const fileExtension = re.exec(element)[0];
      if (
        fileExtension !== undefined &&
        fileExtension !== null &&
        fileExtension !== ""
      ) {
        fileList.push(element);
      } else {
        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fileList = await getFileList(element).then((value) => {
          return value as string[];
        });
      }
    }
    for (let f = 0; f < fileList.length; f++) {
      const file = fileList[f];
      const fileExtension = re.exec(file)[0];
      for (const i in compressMethod) {
        if (!isNaN(Number(i))) {
          switch (fileExtension) {
            case ".jpg" || ".jpeg":
              if (Number(i) === CompressType.mozjpeg) {
                console.log("Gelen dosya", file);
                const mozjpeg = reducer.mozjpegCompress(file, destination);
                return mozjpeg;
              }
              if (Number(i) === CompressType.jpegtran) {
                const jpegtran = reducer.jpegtranCompress(
                  inputDir,
                  destination
                );
                return jpegtran;
              }
              break;
            case ".png":
              if (Number(i) === CompressType.pngquant) {
                const pngquant = reducer.pngquantCompress(
                  inputDir,
                  destination
                );
                return pngquant;
              }
              break;
          }
        }
      }
    }
  } catch (error) {
    console.log("Hatta", error);
  }
}
export enum CompressType {
  mozjpeg,
  jpegtran,
  pngquant,
}
