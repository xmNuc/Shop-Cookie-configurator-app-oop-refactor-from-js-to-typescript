// const express = require('express');
export express from 'express'

class ConfiguratorRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/select-base/:baseName', this.selectBase);
    this.router.get('/add-addon/:addonName', this.selectAddon);
    this.router.get('/delete-addon/:addonName', this.deleteAddon);
  }
  selectBase = (req, res) => {
    const { baseName } = req.params;

    if (!this.cmapp.data.COOKIE_BASES[baseName]) {
      return this.cmapp.showErrorPage(res, `There is no base ${baseName}.`);
    }

    res.cookie('cookieBase', baseName).render('configurator/base-selected', {
      baseName,
    });
  };
  selectAddon = (req, res) => {
    const { addonName } = req.params;

    if (!this.cmapp.data.COOKIE_ADDONS[addonName]) {
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
  deleteAddon = (req, res) => {
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

module.exports = {
  ConfiguratorRouter,
};
