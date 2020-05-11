module.exports = [
    {
        name: 'dev',
        type: process.env.BDD_type,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        dropSchema: false,
        logging: false,
        cache: true,
        maxQueryExecutionTime: 100,
        entities: ['dist/src/entity/**/*.entity.{ts,js}'],
        migrations: ['dist/src/migration/**/*.{ts,js}'],
        subscribers: ['dist/src/subscriber/**/*.{ts,js}'],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
    {
        name: 'prod',
        type: process.env.BDD_type,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        dropSchema: false,
        logging: false,
        cache: true,
        maxQueryExecutionTime: 100,
        entities: ['dist/src/entity/**/*.entity.{ts,js}'],
        migrations: ['dist/src/migration/**/*.{ts,js}'],
        subscribers: ['dist/src/subscriber/**/*.{ts,js}'],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
    {
        name: 'test',
        type: process.env.BDD_type,
        host: process.env.POSTGRES_TEST_HOST,
        port: process.env.POSTGRES_TEST_PORT,
        username: process.env.POSTGRES_TEST_USER,
        password: process.env.POSTGRES_TEST_PASSWORD,
        database: process.env.POSTGRES_TEST_DB,
        synchronize: false,
        dropSchema: false,
        logging: false,
        cache: true,
        maxQueryExecutionTime: 100,
        entities: ['dist/src/entity/**/*.{ts,js}'],
        migrations: ['dist/src/migration/**/*.{ts,js}'],
        subscribers: ['dist/src/subscriber/**/*.{ts,js}'],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
];
