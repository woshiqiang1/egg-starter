'use strict';

/**
 * 插件配置
 */

module.exports = {
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // sequelize: {
  //   enable: true,
  //   package: "egg-sequelize",
  // },
  // https://github.com/Yanshijie-EL/egg-swagger-doc
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  // https://github.com/eggjs/egg-cors
  // 跨域配置
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  healthy: {
    enable: true,
    package: 'egg-healthy',
  },
  mailer: {
    enable: true,
    package: 'egg-mailer',
  },
  // redis: {
  //   enable: true,
  //   package: 'egg-redis',
  // },
  // alinode: {
  //   enable: false,
  //   package: 'egg-alinode',
  //   env: ['prod'],
  // },
  // io: {
  //   enable: true,
  //   package: 'egg-socket.io',
  // },
  // oss: {
  //   enable: true,
  //   package: 'egg-oss',
  // },
};
