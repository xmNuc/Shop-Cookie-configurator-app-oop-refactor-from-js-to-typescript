import { Request, Response, Router } from 'express';
import { CookieMakerApp } from '..';
import { get } from '../decorators/rest.decorators';
import { MyRouter } from '../types/my-router';
import { BaseRouter } from './base';

export class ConfiguratorRouter extends BaseRouter implements MyRouter {
  public readonly urlPrefix = '/configurator';

  @get('/select-base/:baseName')
  @get('/add-addon/:addonName')
  @get('/delete-addon/:addonName')
  private selectBase = (req: Request, res: Response): void => {
    const { baseName } = req.params;

    if (!(this.cmapp.data.COOKIE_BASES as Record<string, number>)[baseName]) {
      return this.cmapp.showErrorPage(res, `There is no base ${baseName}.`);
    }

    res.cookie('cookieBase', baseName).render('configurator/base-selected', {
      baseName,
    });
  };
  private selectAddon = (req: Request, res: Response): void => {
    const { addonName } = req.params;

    if (!(this.cmapp.data.COOKIE_ADDONS as Record<string, number>)[addonName]) {
      return this.cmapp.showErrorPage(res, `There is no aaddon ${addonName}.`);
    }

    const addons = this.cmapp.getAddonsdFromReq(req);

    if (addons.includes(addonName)) {
      return this.cmapp.showErrorPage(
        res,
        `${addonName} is alredy on youre cookie. You cannot add it twice.`
      );
    }

    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  };
  private deleteAddon = (req: Request, res: Response): void => {
    const { addonName } = req.params;

    const oldAddons = this.cmapp.getAddonsdFromReq(req);

    if (!oldAddons.includes(addonName)) {
      return this.cmapp.showErrorPage(
        res,
        `Canot delete somthing isn't added to the cookie ${addonName} do not exist`
      );
    }

    const addons = oldAddons.filter((addon) => addon !== addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/deleted', {
        addonName,
      });
  };
}
