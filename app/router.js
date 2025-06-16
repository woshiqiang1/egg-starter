'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  // 首页
  router.get('/', controller.home.index);
  // 使用 egg-router-plus 设置统一的前缀，前缀在 config/config.default.js 中配置
  const subRouter = router.namespace(app.config.apiPrefix);
  // 开发环境
  const isDev = app.config.env === 'local' || app.config.env === 'test' || app.config.env === 'unittest';

  /**
   * 用户
   */
  subRouter.post('/v1/users', controller.v1.users.create);
  subRouter.put('/v1/users', controller.v1.users.update);
  subRouter.get('/v1/users/list', controller.v1.users.findAll);
  subRouter.get('/v1/users', controller.v1.users.findOne);
  subRouter.delete('/v1/users', controller.v1.users.destroy);
  subRouter.post('/v1/users/login', controller.v1.users.login);
  subRouter.post('/v1/users/logout', controller.v1.users.logout);
  subRouter.get('/v1/users/user_info', controller.v1.users.userInfo);
  subRouter.get('/v1/users/exists_user_unique_fields', controller.v1.users.existsUserUniqueFields);
  subRouter.put('/v1/users/password', controller.v1.users.updateUserPassword);
  subRouter.put('/v1/users/department', controller.v1.users.updateUserDepartment);
  subRouter.post('/v1/users/refreshToken', controller.v1.users.refreshToken);
  subRouter.post('/v1/users/github/login', controller.v1.users.githubLogin);
  // 本地环境和测试环境下开放 mock 登录，方便开发和调试
  if (isDev) {
    subRouter.get('/v1/users/mockLogin', controller.v1.users.mockLogin);
  }
  /**
   * 角色
   */
  subRouter.post('/v1/roles', controller.v1.roles.create);
  subRouter.put('/v1/roles', controller.v1.roles.update);
  subRouter.get('/v1/roles/list', controller.v1.roles.index);
  subRouter.get('/v1/roles', controller.v1.roles.show);
  subRouter.delete('/v1/roles', controller.v1.roles.destroy);
  subRouter.put('/v1/roles/is_default', controller.v1.roles.updateIsDefault);
};
