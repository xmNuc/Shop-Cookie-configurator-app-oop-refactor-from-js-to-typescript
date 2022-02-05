import { Request, Response, Router } from 'express';
import { get, rest } from '../decorators/rest.decorators';
import { MyRouter } from '../types/my-router';
import { BaseRouter } from './base';

export class HomeRouter extends BaseRouter implements MyRouter {
  public readonly urlPrefix = '/';

  @rest('get', '/xx')
  private xx = (req: Request, res: Response): void => {
    res.send('XX works');
  };

  @get('/')
  private home = (req: Request, res: Response): void => {
    const { sum, addons, base, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render('home/index', {
      cookie: {
        base,
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  };
}
