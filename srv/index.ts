import { AppButton } from '@/buttons';
import axios from 'axios';
import config from 'config';
import express, { NextFunction, Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';
import createHttpError, { HttpError } from 'http-errors';
import * as log4js from 'log4js';
import { VieraClient, VieraKey } from 'panasonic-viera-ts';
import * as log4jconfig from './config/log4js';

type VieraId = number;
type VieraConfig = {
  id: number
  name: string,
  host: string,
  appId: string,
  encKey: string,
  sensorNo?: string,
};

// log4js
log4js.configure(log4jconfig.configures[config.get('env') as string]);
const logger = log4js.getLogger();
const accessLogger = log4js.getLogger('access');

export default (app: express.Application): void => {
  app.use(express.json());
  app.use(log4js.connectLogger(accessLogger, { level: 'INFO' }));

  const vieraEntries: VieraConfig[] = config.get('viera');

  const vieraClients: Record<VieraId, VieraClient> = {};
  for (const entry of vieraEntries) {
    vieraClients[entry.id] = new VieraClient(entry.host, {
      appId: entry.appId,
      encKey: entry.encKey
    });
  }

  const rootRouter = PromiseRouter();

  const vieraRouter = PromiseRouter({ mergeParams: true });
  rootRouter.use('/api/viera', vieraRouter);
  vieraRouter.use(express.json());

  vieraRouter.get('/', async (req, res) => {
    const vieras = [];
    for (const entry of vieraEntries) {
      vieras.push({ id: entry.id, name: entry.name });
    }
    res.json(vieras);
  });

  const vieraIdRouter = PromiseRouter({ mergeParams: true });
  vieraRouter.use('/:id', vieraIdRouter);

  vieraIdRouter.use(async (req, res, next) => {
    const id  = Number(req.params.id);
    const viera = vieraClients[id];
    if (!viera) {
      throw createHttpError(404, 'Client not found.');
    }
    await viera.connect();

    res.locals.id = id;
    res.locals.config = vieraEntries.find(entry => entry.id === res.locals.id);
    res.locals.viera = viera;
    next();
  });

  vieraIdRouter.post('/key', async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const sendKey: VieraKey = req.body.value;
    await viera.sendKey(sendKey);

    res.send();
  });

  vieraIdRouter.route('/volume').get(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const volume = await viera.getVolume();

    res.json({ value: volume });
  }).post(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const volume = Number(req.body.value);
    await viera.setVolume(volume);

    res.send();
  });

  vieraIdRouter.route('/mute').get(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const mute = await viera.getMute();

    res.json({ value: mute });
  }).post(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const volume = req.body.value;
    await viera.setMute(volume);

    res.send();
  });

  vieraIdRouter.route('/power').post(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const vieraConfig: VieraConfig = res.locals.config;

    if (req.body.withSensor) {
      await toggleSensor(viera, vieraConfig);
    }

    await viera.sendKey(VieraKey.power);
    res.send();
  }).get(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const powerOn = await viera.isPowerOn();

    res.json({ value: powerOn });
  });

  vieraIdRouter.route('/app').get(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const apps = await viera.getApps();

    const buttons: AppButton[] = apps.map(app => ({
      label: app.name,
      productId: app.productId,
      icon: app.iconUrl
    }));

    res.json(buttons);
  }).post(async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const productId = req.body.value;
    await viera.launchApp(productId);

    res.send();
  });

  vieraIdRouter.get('/name', async (req, res) => {
    const config: Record<string, string> = res.locals.config;

    res.type('json').send({ value: config.name });
  });

  vieraIdRouter.get('/deviceInfo', async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const deviceInfo = await viera.getDeviceInfo();

    res.type('xml').send(deviceInfo.toString());
  });

  vieraIdRouter.get('/actionList', async (req, res) => {
    const viera: VieraClient = res.locals.viera;
    const actionList = await viera.getActionList();

    res.type('xml').send(actionList.toString());
  });

  app.use('/', rootRouter);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);

    if (res.headersSent) {
      return next(error);
    }

    if (error instanceof HttpError) {
      res.status(error.statusCode);
      res.send({ message: error.message });
    } else {
      res.status(500);
      res.send({ message: 'エラーが発生しました。' });
    }
  });
};

async function toggleSensor(viera: VieraClient, vieraConfig: VieraConfig): Promise<void> {
  if (!vieraConfig.sensorNo) return;

  const isPowerOn = await viera.isPowerOn();
  const sensorUrl: string = config.get('httpSensor.url');
  const command = !isPowerOn ? 'open' : 'close';

  void axios.get(`${sensorUrl}/${vieraConfig.sensorNo}/${command}`);
}
