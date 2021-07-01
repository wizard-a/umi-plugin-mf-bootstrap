import { IApi } from 'umi';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {

  api.onGenerateFiles(() => {
    const buffer= readFileSync(resolve('./src/.umi/umi.ts'))
    const c = String(buffer)
    // console.log()
    api.writeTmpFile({
      path: 'index.ts',
      content: c,
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: 'import("./index")',
    });
  });
};
