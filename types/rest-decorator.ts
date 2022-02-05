import { HttpMethod } from './http-methods';

export interface RestDecoratorInfo {
  httpMethod: HttpMethod;
  path: string;
  propertyName: string;
}
