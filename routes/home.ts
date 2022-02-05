import { Request, Response, Router } from 'express';
import { CookieMakerApp } from '..';
import { rest } from '../decorators/rest.decorators';
import { MyRouter } from '../types/my-router';
import { RestDecoratorInfo } from '../types/rest-decorator';

export class HomeRouter implements MyRouter {
  public readonly urlPrefix = '/';
  public readonly router: Router = Router();

  constructor(private cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    const ar: RestDecoratorInfo[] = Reflect.get(this, '_restApiCalls') ?? [];
    console.log(Reflect.get(this, '_restApiCalls'));

    for (const apiOp of ar) {
      this.router[apiOp.httpMethod](
        apiOp.path,
        (this as any)[apiOp.propertyName]
      );
    }

    // this.router.get('/', this.home);
  }

  @rest('get', '/xx')
  private xx = (req: Request, res: Response): void => {
    res.send('XX works');
  };

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
