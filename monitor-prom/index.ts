import express, { type NextFunction, type Request, type Response } from "express";
import promClient from "prom-client";

const reqCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total numbr of HTTP requests",
  labelNames: ['method', 'route', 'status_code']
});

const reqActiveGauge = new promClient.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

const reqDurationHistogram = new promClient.Histogram({
  name: "request_duration",
  help: "Response Time",
  labelNames: ["method", "route", "status_code"],
  buckets: [0, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
})

const reqCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path !== "/metrics") {
    const startTime = Date.now();
    reqActiveGauge.inc();
    res.on("finish", () => {
      const resDura = Date.now() - startTime;

      console.log(`Response time is ${resDura}ms`);
      reqCounter.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode
      });

      reqActiveGauge.dec();

      reqDurationHistogram.observe({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode
      }, resDura);
    })
  }
  next();
}


const app = express();

app.use(reqCountMiddleware);

app.get('/', (req, res) => {
  res.json({
    message: "Namaste, welcome",
  });
});

app.get('/cpu', async (req, res) => {
  await new Promise(s => setTimeout(s, Math.random() * 10000));
  res.json({
    message: "Did something, nothing",
  });
});

app.get('/metrics', async (req, res) => {
  const metrics = await promClient.register.metrics();
  res.set("Content-Type", promClient.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => console.log(`Listening at 3000`));