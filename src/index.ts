import { ImageReducer } from "./imagemin-reducer";
import glob from "glob";
import { CompressReport } from "./models/report.response";

/**
 *
 * @param {string}filePath will return all .jpg and .png files in directory and sub directory
 */
async function getFileList(filePath: string) {
  const fileList: string[] = [];
  return new Promise((resolve, rejects) => {
    if (!filePath.endsWith("/")) filePath.concat("/");
    glob(filePath + "**/*+(.jpg|.png)", (error, matches) => {
      if (error) {
        rejects(new Error("Error message : " + error));
      }
      for (let f = 0; f < matches.length; f++) {
        const e = matches[f];
        fileList.push(e);
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
 * @return {CompressReport[]} is an array that you can see data(buffer), source and new paths
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
    const responseList: CompressReport[] = [];
    for (let f = 0; f < fileList.length; f++) {
      const file = fileList[f];
      const fileExtension = re.exec(file)[0];
      switch (fileExtension) {
        case ".jpg":
          if (compressMethod.indexOf(CompressType.mozjpeg) !== -1) {
            const mozjpeg = await reducer.mozjpegCompress(file, destination);
            mozjpeg.forEach((value) => {
              const response: CompressReport = {
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
              const response: CompressReport = {
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
              const response: CompressReport = {
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
  } catch (err) {
    throw new Error(err);
  }
}
export enum CompressType {
  mozjpeg,
  jpegtran,
  pngquant,
}
