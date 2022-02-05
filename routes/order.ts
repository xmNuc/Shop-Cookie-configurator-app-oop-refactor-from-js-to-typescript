import { Request, Response, Router } from 'express';
import { get } from '../decorators/rest.decorators';
import { MyRouter } from '../types/my-router';
import { BaseRouter } from './base';

export class OrderRouter extends BaseRouter implements MyRouter {
  public readonly urlPrefix = '/order';

  // private setUpRoutes(): void {
  //   this.router.get('/summary', this.summary);
  //   this.router.get('/thanks', this.thanks);
  // }
  @get('/summary')
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
  @get('/thanks')
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
