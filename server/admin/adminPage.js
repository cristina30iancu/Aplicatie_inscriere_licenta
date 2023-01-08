const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Admin = require('../models/administratori');
const Cerere = require('../models/cereri');
const Profesor = require('../models/profesori');
const Solicitare = require('../models/solicitari');
const Specializare = require('../models/specializari');
const Student = require('../models/studenti');

const secret = process.env.SECRET_KEY;

AdminJS.registerAdapter(require('@adminjs/sequelize'));

// override la mesajele default din adminjs
const locale = {
  translations: {
    labels: {
      loginWelcome: 'Bine ai venit',
    },
    messages: {
      loginWelcome: 'Aplicatie de gestionare a cererilor de licenta',
    },
  },
};

const branding = {
  companyName: 'CSIE',
  // ascunde sigla autorilor
  softwareBrothers: false,
  logo: '/logo.png',
};

// custom-css pentru paginile din /admin
const assets = {
  styles: ['/adminStyle.css'],
};

const resources = [
  {
    resource: Admin,
    // se ocupa de criptarea si ascunderea parolelor administratorilor
    // codul e copiat din documentatie
    options: {
      properties: {
        parola_criptata: {
          isVisible: false,
        },
        parola: {
          type: 'string',
          isVisible: {
            list: false,
            edit: true,
            filter: false,
            show: false,
          },
        },
      },
      // verifica daca parola introdusa corespunde cu cea din baza de date
      actions: {
        new: {
          before: async (request) => {
            if (request.payload.parola) {
              request.payload = {
                ...request.payload,
                parola_criptata: await bcrypt.hash(request.payload.parola, 10),
                parola: undefined,
              };
            }
            return request;
          },
        },
      },
    },
  },
  {
    resource: Cerere,
    // ascund campul fisier pentru ca are multe randuri
    options: {
      properties: {
        fisier: {
          isVisible: {
            edit: false,
            list: false,
            filter: false,
            show: true,
          },
        },
      },
    },
  },
  Profesor,
  Solicitare,
  Specializare,
  Student,
];

// rutele suplimentare adaugate
const pages = {
  PaginaRapoarte: {
    label: 'Rapoarte',
    component: AdminJS.bundle('./ComponentRapoarte'),
  },
};

const authenticate = async (email, parola) => {
  const admin = await Admin.findOne({ where: { email: email } });
  if (admin) {
    const matched = await bcrypt.compare(parola, admin.parola_criptata);
    if (matched) {
      return admin;
    }
  }
  return false;
};

// initializare pagina admin cu modelele din sequelize
const adminJs = new AdminJS({
  resources,
  // ruta la care se afla pagina de admin
  rootPath: '/admin',
  // pagina custom de dashboard
  dashboard: {
    component: AdminJS.bundle('./MyDashboard.tsx'),
  },
  locale,
  branding,
  assets,
  pages,
});

// initializare router cu logica de autentificare
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate,
  cookiePassword: secret,
});

module.exports = [adminJs, router];
