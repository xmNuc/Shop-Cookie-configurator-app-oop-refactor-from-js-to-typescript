import { HttpMethod } from '../types/http-methods';
import { MyRouter } from '../types/my-router';
import { RestDecoratorInfo } from '../types/rest-decorator';

export function rest(httpMethod: HttpMethod, path: string) {
  return (target: MyRouter, propertyName: string): any => {
    // console.log('Works?');

    const ar: RestDecoratorInfo[] = Reflect.get(target, '_restApiCalls') ?? [];

    ar.push({ httpMethod, path, propertyName });

    Reflect.set(target, '_restApiCall', ar);
  };
}
