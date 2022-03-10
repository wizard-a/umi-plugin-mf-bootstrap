import { IApi } from 'umi';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    let c = '';
    try {
      const path =
        api.env === 'production' ? './src/.umi/index.ts' : './src/.umi/umi.ts';
      const buffer = readFileSync(resolve(path));
      c = String(buffer);
    } catch (e) {
      console.info(
        `src/.umi/index.ts or src/.umi/umi.ts it's not defined, set empty content to tmp file`,
      );
    }
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
