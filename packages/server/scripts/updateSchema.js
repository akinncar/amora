"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const utilities_1 = require("graphql/utilities");
const schema_1 = require("../src/schema/schema");
const writeFileAsync = (0, util_1.promisify)(fs_1.default.writeFile);
const cwd = process.cwd();
(async () => {
    const configs = [
        {
            schema: schema_1.schema,
            path: path_1.default.join(cwd, './schema/schema.graphql'),
        },
    ];
    await Promise.all([
        ...configs.map(async (config) => {
            await writeFileAsync(config.path, (0, utilities_1.printSchema)(config.schema));
        }),
    ]);
    process.exit(0);
})();
