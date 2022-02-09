import { getDataloaders } from './graphql/loaderRegister';

require('dotenv').config();
import Koa from 'koa';
import GraphQLHTTP from 'koa-graphql';
import Router from 'koa-router';
import koaPlayground from 'graphql-playground-middleware-koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { getUser } from './auth';
import { schema } from './schema/schema';

// import { auth } from "./auth";

const app = new Koa();
const router = new Router();

// router.use(auth);

const graphqlSettingsPerReq = async (req, ctx, koaContext) => {
  const { user } = await getUser(req.header.authorization);
  const dataloaders = getDataloaders();

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      user,
      req,
      dataloaders,
    },
    formatError: (error) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = GraphQLHTTP(graphqlSettingsPerReq);

router.all('/graphql', graphqlServer);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
    // subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }),
);
app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;