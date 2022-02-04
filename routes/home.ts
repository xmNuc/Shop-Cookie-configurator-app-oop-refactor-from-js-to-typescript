import { Request, Response, Router } from 'express';
import { CookieMakerApp } from '..';

export class HomeRouter {
  static readonly urlPrefix = '/';
  public readonly router: Router = Router();

  constructor(private cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get('/', this.home);
  }
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
