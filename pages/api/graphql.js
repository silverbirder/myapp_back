import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { loadSchema } from "@graphql-tools/load";
import { createYoga } from "graphql-yoga";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: async () => {
    const schema = await loadSchema("./public/schema.graphql", {
      loaders: [new GraphQLFileLoader()],
    });
    const resolvers = {
      Query: {
        fruits: () => [{ name: "Apple" }, { name: "Banana" }],
      },
    };
    return addResolversToSchema({ schema, resolvers });
  },
});
