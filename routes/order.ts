import { Request, Response, Router } from 'express';
import { CookieMakerApp } from '..';
import { MyRouter } from '../types/my-router';

export class OrderRouter implements MyRouter {
  public readonly urlPrefix = '/order';
  public readonly router: Router = Router();

  constructor(private cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get('/summary', this.summary);
    this.router.get('/thanks', this.thanks);
  }
  private summary = (req: Request, res: Response): void => {
    const { sum, addons, base, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render('order/summary', {
      cookie: {
        base,
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  };
  private thanks = (req: Request, res: Response) => {
    const { sum } = this.cmapp.getCookieSettings(req);

    res
      .clearCookie('cookieBase')
      .clearCookie('cookieAddons')
      .render('order/thanks', {
        sum,
      });
  };
}
