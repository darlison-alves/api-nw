import "reflect-metadata"
import { Application } from "express";
import { InversifyExpressServer } from 'inversify-express-utils'
import { json, urlencoded } from 'body-parser'

import * as cors from 'cors';

import container from "./Infra/DI/Container";
import { connect, connection } from "mongoose";

export class App {
    public app: Application;

    constructor() {
        const server = new InversifyExpressServer(container)

        server.setConfig((app) => {
            App.config(app)
        })

        server.build().listen('8003', () => {
            console.log('Running in port 8003')
        })
    }

    private static async config(app: Application): Promise<void> {

        app.use(json());
        app.use(urlencoded({ extended: false }));
        app.use(cors.default({
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-CSRF-TOKEN", 'Platform'],
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        }));
        await this.dbConnection()
    }

    private static async dbConnection(): Promise<void> {
        try {
            await connect('mongodb://localhost:27017', { useNewUrlParser: true, dbName: 'tasks', autoReconnect: true, w: "majority" })
                .then(r => {
                    console.log("connected db...")
                })
            process.once('SIGINT', async () => {
                try {
                    console.log('closing databse connection...')
                    await connection.close()
                    console.log('connection closed')
                    process.exit(0)
                } catch (err) {
                    console.log(err)
                }
            })
        } catch (err) {
            console.log(err)
            process.exit(0)
        }

    }

}

new App();