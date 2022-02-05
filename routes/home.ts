import { Request, Response, Router } from 'express';
import { CookieMakerApp } from '..';
import { rest } from '../decorators/rest.decorators';
import { MyRouter } from '../types/my-router';

export class HomeRouter implements MyRouter {
  public readonly urlPrefix = '/';
  public readonly router: Router = Router();

  constructor(private cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    // Reflect.get(this, '_restApiCalls');
    console.log(Reflect.get(this, '_restApiCalls'));
    // this.router.get('/', this.home);
  }

  @rest('get', '/')
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
