'use strict';
const { v4: uuidv4 } = require('uuid');

exports.security = {
  csrf: {
    enable: false,
  },
};

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  password: '123456',
  database: 'egg-beehive-dev',
  timezone: '+08:00',
  define: {
    raw: true,
    underscored: false,
    charset: 'utf8',
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    // collate: 'utf8_general_ci',
  },
};

exports.cors = {
  // origin: [ 'http://192.168.6.150:8080' ],
  // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};

exports.redis = {
  client: {
    port: 6379,
    host: '127.0.0.1',
    password: '123123',
    db: 1,
  },
};

exports.jwt_exp = 60 * 60 * 24 * 90; // 开发环境下，jwt过期时间(秒)

exports.io = {
  init: {
    // transports: ['websocket'],
    // pingInterval: 5000,
    // allowEIO3: true,
  }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: ['connection'],
      packetMiddleware: ['packet'],
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '123123',
    db: 3,
  },
  generateId: (req) => {
    // 自定义 socket.id 生成函数
    // const data = qs.parse(req.url.split('?')[1]);
    return `${req._query.userId}_${uuidv4()}`; // custom id must be unique
  },
};

// github授权登录请求参数
exports.github = {
  access_token_url: 'https://github.com/login/oauth/access_token',
  user_info_url: 'https://api.github.com/user',
  client_id: 'The client ID you received from GitHub for your app.',
  client_secret: 'The client secret you received from GitHub for your OAuth App.',
};

exports.oss = {
  client: {
    accessKeyId: 'xxx',
    accessKeySecret: 'xxx',
    bucket: 'xxx',
    endpoint: 'oss-cn-guangzhou.aliyuncs.com',
    timeout: '60s',
  },
};
