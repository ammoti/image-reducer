![alt text](https://i.ibb.co/ft9Sxh7/logo.jpg "Vahap Yiğit")
# image-reducer

image-reducer just a another image compression package empowered [imagemin](https://www.npmjs.com/package/imagemin). It's goal is that bring all imagemin plugin use single package. At this moment its allow just third plugin [mozjpeg, jpegtrani pngquant] I will add more plugin in the future.

![](https://github.com/ammoti/np/workflows/Build/badge.svg) [![](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Build Status

![](https://github.com/ammoti/image-reducer/workflows/Build/badge.svg)

## Install

Requires Node >=10.

From npm,

```sh
npm i image-reducer
```

From [Github Package Registry](https://github.com/ammoti/image-reducer/packages). ([Guide](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages)).

Type definitions are bundled with this package.

## Usage

Main functions taking three parameters, First one input you can give a string array or directly file path does not matter. second is destination after compression where files will be stored, and third one is the algorithm array which is compression algorithm. And return a Promise.

Currently pngquant using quality: [0.2, 0.5] and mozjpeg using 65 I will add options parameter in the future commits.

```sh
main(input: string | string[], destination: string, compressMethod: CompressType[]): Promise<CompressReport[]>;
```
### Example
I put a test file under **example** folder you can check it.

#### Contribution
All contributions and issues are welcome.

## Licence

MIT &copy; [ammoti](https://twitter.com/@usamevahap)
