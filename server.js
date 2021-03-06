const express  = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: { maxAge: 7000000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`You're now connected to port: ${PORT}`));
});