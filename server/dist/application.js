"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const awilix_express_1 = require("awilix-express");
const awilix_1 = require("awilix");
const express = require("express");
const cors = require("cors");
class App {
    constructor(httpPort) {
        this.app = express();
        this.app.use(express.json());
        const container = this.setupDependencyInjection();
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use((0, awilix_express_1.scopePerRequest)(container));
        // this.app.use(loadControllers('controller/*.controller.ts', { cwd: __dirname }))
        this.httpPort = httpPort;
    }
    listen() {
        this.app.listen(this.httpPort, () => {
            console.log("APP LISTENING ON PORT:", this.httpPort);
        });
    }
    setupDependencyInjection() {
        const container = (0, awilix_1.createContainer)({
            injectionMode: awilix_1.InjectionMode.CLASSIC,
        });
        container.register({});
        return container;
    }
}
exports.App = App;
