import { PostMapping, TokenValidate } from '@/common';

export default class Test {
  @PostMapping('/reload-db')
  @TokenValidate({ needSuperAdmin: true })
  test(): void {
    process.exit(0);
  }
}
