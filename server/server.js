const app = require('./app');
const connectDb = require('./db/index');
const port = 3001;

app.listen(port, () => {
    console.log("Server started on PORT : ", port);
});

connectDb(); //connect to mongodb


module.exports = app;