

export const EnvConfiguration = () => ({
    enviroment: process.env.MODE_ENV,
    mongodb: process.env.MONGODB,
    port: process.env.PORT,
    default_limit: +(process.env.DEFAULT_LIMIT || 10)

});

