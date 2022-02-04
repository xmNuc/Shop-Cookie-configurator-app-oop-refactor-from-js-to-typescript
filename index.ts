import * as express from 'express';
import { json, static as expressStatic } from 'express';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'express-handlebars';
import { HomeRouter } from './routes/home';
import { ConfiguratorRouter } from './routes/configurator';
import { OrderRouter } from './routes/order';
import { handlebarsHelpers } from './utils/handlenars-helpers';
import { COOKIE_BASES, COOKIE_ADDONS } from './data/cookies-data';

export class CookieMakerApp {
  constructor() {
    this._loadData();
    this._configureApp();
    this._setRoutes();
    this._run();
  }

  _configureApp() {
    this.app = express();

    this.app.use(json());
    this.app.use(expressStatic('public'));
    this.app.use(cookieParser());

    this.app.engine(
      '.hbs',
      hbs({
        extname: '.hbs',
        helpers: handlebarsHelpers,
      })
    );
    this.app.set('view engine', '.hbs');
  }

  _setRoutes() {
    this.app.use('/', new HomeRouter(this).router);
    this.app.use('/configurator', new ConfiguratorRouter(this).router);
    this.app.use('/order', new OrderRouter(this).router);
  }

  _run() {
    this.app.listen(3000, 'localhost', () => {
      console.log(`Server is started on http//localhost:3000`);
    });
  }
  showErrorPage(res, descryption) {
    return res.render('error', { descryption });
  }

  getAddonsdFromReq(req) {
    const { cookieAddons } = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }
  getCookieSettings(req) {
    const { cookieBase: base } = req.cookies;

    const addons = this.getAddonsdFromReq(req);

    const allBases = Object.entries(this.data.COOKIE_BASES);
    const allAddons = Object.entries(this.data.COOKIE_ADDONS);

    const sum =
      (base ? handlebarsHelpers.findPrice(allBases, base) : 0) +
      addons.reduce((prev, curr) => {
        return prev + handlebarsHelpers.findPrice(allAddons, curr);
      }, 0);

    return {
      //Selected stuff
      addons,
      base,

      //Calculations
      sum,

      //All possibilities
      allBases,
      allAddons,
    };
  }
  _loadData() {
    this.data = {
      COOKIE_BASES,
      COOKIE_ADDONS,
    };
  }
}

new CookieMakerApp();
