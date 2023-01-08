const express = require('express');
const sequelize = require('./sequelize');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

//import modele
require('./models/specializari');
require('./models/studenti');
require('./models/profesori');
require('./models/solicitari');
require('./models/cereri');
const Admin = require('./models/administratori');

const app = express();
app.use(express.json({ limit: '20mb' }));
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000' }));
}

//rute
app.use('/user', require('./routes/userRoutes'));
app.use('/solicitare', require('./routes/solicitariRoutes'));
app.use('/cerere', require('./routes/cereriRoutes'));
app.use('/specializare', require('./routes/specializariRoutes'));
app.get('/', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));

//admin
const [adminJs, router] = require('./admin/adminPage');
app.use(adminJs.options.rootPath, router);

const port = Number.parseInt(process.env.PORT) || 3001;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    //daca nu exista niciun cont de admin se va crea unul default
    if ((await Admin.count()) === 0) {
      await Admin.create({
        email: 'admin',
        parola_criptata: await bcrypt.hash('123', 10),
      });
    }

    console.log(`Connection established on port ${port}`);
  } catch (e) {
    console.error(e);
  }
});
