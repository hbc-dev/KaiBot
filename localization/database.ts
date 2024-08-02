import { Sequelize } from "sequelize";

class EmptyClass {}

interface QueryInformation {
    [key: string]: any;
    type: string;
    model: typeof EmptyClass | null;
    name: { plural: string; singular: string; }
}

export const sequelize = new Sequelize({
    dialect: "sqlite",
    database: "i18n",
    storage: "i18n.sqlite",
    benchmark: true,
    logQueryParameters: true,
    async logging(_, timing, ...info: QueryInformation[]) {
        let queryInfo = info[0];

        if (queryInfo.model || queryInfo.name) {
            let modelName = queryInfo.model ? queryInfo.model.name : queryInfo.name.singular;

            console.log(`New sql query (${queryInfo.type}) in ${modelName}\nBenchmark: ${timing}s`);
        } else console.log(`Anonymous sql query: ${queryInfo.type}\nBenchmark: ${timing}s`);
    }
});