// const express = require('express');
import express from 'express';

export class HomeRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/', this.home);
  }
  home = (req, res) => {
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

const home = new HomeRouter();

const homeRouter = express.Router();
