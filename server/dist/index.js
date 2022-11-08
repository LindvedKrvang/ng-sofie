"use strict";
const App = require('./application')(async () => {
    const app = new App(8081);
    app.listen();
})();
