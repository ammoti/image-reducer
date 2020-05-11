/* eslint-disable no-unused-vars */
import { ImageReducer } from "./imagemin-reducer";
import glob from "glob";
import { ImageResponse } from "./models/imagemin.response";

/**
 *
 * @param {string}element File
 */
async function getFileList(element: string) {
  const fileList: string[] = [];
  return new Promise((resolve, rejects) => {
    glob(element + "files/**/*+(.jpg|.png)", (error, matches) => {
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
    let fileList: string[] = [];
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
        fileList = await getFileList(element).then((value) => {
          return value as string[];
        });
      }
    }
    const responseList: ImageResponse[] = [];
    for (let f = 0; f < fileList.length; f++) {
      const file = fileList[f];
      const fileExtension = re.exec(file)[0];
      switch (fileExtension) {
        // TODO : Buradan devam et bir den fazla defa döngüye giriyor ana döngüden çıkması
        case ".jpg":
          if (compressMethod.indexOf(CompressType.mozjpeg) !== -1) {
            const mozjpeg = await reducer.mozjpegCompress(file, destination);
            mozjpeg.forEach((value) => {
              const response: ImageResponse = {
                data: value.data,
                newPath: value.destinationPath,
                sourcePath: value.sourcePath,
              };
              responseList.push(response);
            });
          } else if (compressMethod.indexOf(CompressType.jpegtran) !== -1) {
            const jpegtran = await reducer.jpegtranCompress(file, destination);
            // TODO: return ImageResponse will added it
            jpegtran.forEach((value) => {
              const response: ImageResponse = {
                data: value.data,
                newPath: value.destinationPath,
                sourcePath: value.sourcePath,
              };
              responseList.push(response);
            });
          }
          break;
        case ".png":
          if (compressMethod.indexOf(CompressType.pngquant) !== -1) {
            const pngquant = await reducer.pngquantCompress(file, destination);
            pngquant.forEach((value) => {
              const response: ImageResponse = {
                data: value.data,
                newPath: value.destinationPath,
                sourcePath: value.sourcePath,
              };
              responseList.push(response);
            });
          }
          break;
      }
    }

    return responseList;
  } catch (error) {
    console.log("Hata", error);
  }
}
export enum CompressType {
  mozjpeg,
  jpegtran,
  pngquant,
}
