import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { globalIdField } from "graphql-relay";
import { objectIdResolver } from "@entria/graphql-mongo-helpers";

// import TeamType from "../team/TeamType";
// import Team from "../team/TeamModel";
import { registerTypeLoader, nodeInterface } from "../node/typeRegister";

import { load } from "./StoreLoader";
import { connectionDefinitions } from "../../graphql/connectionDefinitions";

const StoreType = new GraphQLObjectType({
  name: "Store",
  description: "Store data",
  fields: () => ({
    id: globalIdField("Store"),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: (store) => store.name,
    },
    description: {
      type: GraphQLString,
      resolve: (store) => store.description,
    },
    pictureUrl: {
      type: GraphQLString,
      resolve: (store) => store.pictureUrl,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(StoreType, load);

export default StoreType;

export const StoreConnection = connectionDefinitions({
  name: "Store",
  nodeType: StoreType,
});
