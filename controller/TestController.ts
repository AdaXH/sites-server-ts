/* eslint-disable no-console */
import { PostMapping, request } from '@/common';
import { CommonObj } from '@/typings';

export default class Test {
  @PostMapping('/test')
  test(@request() body: CommonObj): CommonObj {
    console.log('this', this);
    return body;
  }
}
