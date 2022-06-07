const CONFIG = {
    enviroment: process.env.REACT_APP_ENV || 'development',
    empresa: process.env.REACT_APP_EMPRESA || 'PIRAMIDE',
    endpoints: {
        portal: process.env.REACT_APP_URL_ASG || 'https://segurospiramide.com/asg-api/',
        emergencia24: process.env.REACT_APP_URL || 'https://emergencia24horas.segurospiramide.com/node/express/servicios/apiIntrasp',
        auth: process.env.REACT_APP_AUTH || 'https://emergencia24horas.segurospiramide.com/node/express/servicios/directorioActivo',
        strapi: process.env.REACT_APP_STRAPI || 'http://localhost:1337'
    }
};

export default CONFIG;