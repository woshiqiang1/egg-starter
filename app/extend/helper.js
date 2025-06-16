'use strict';

const os = require('os');

module.exports.tools = {
  /**
   * findAll请求根据rule处理query值
   * @param rule 规则
   * @param queryOrigin 原请求参数
   * @param ruleOther 追加规则
   * @param findAllParamsOther 追加搜索字段
   * @param keywordLikeExcludeParams 关键字keyword模糊搜索排除字段
   * @return {{query: {where: {}}, allRule: {offset: {default: number, type: string, required: boolean}, prop_order: {values, type: string, required: boolean}, limit: {type: string, required: boolean}, order: {values: [string, string, string], type: string, required: boolean}}}}
   */
  findAllParamsDeal(options) {
    const { rule, queryOrigin, ruleOther = {}, findAllParamsOther = {}, keywordLikeExcludeParams = [] } = options;
    const _rule = lodash.cloneDeep(rule);
    const query = {
      where: {},
    };
    for (const ruleKey in _rule) {
      _rule[ruleKey].required = false;
    }
    const findAllParams = {
      keyword: {
        type: 'string',
        trim: true,
        required: false,
        max: 36,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(_rule), ''],
      },
      order: {
        type: 'enum',
        required: false,
        values: ['desc', 'asc', ''],
      },
      limit: {
        type: 'number',
        required: false,
      },
      offset: {
        type: 'number',
        required: false,
        default: 0,
      },
      ...findAllParamsOther,
    };
    const allRule = {
      ..._rule,
      ...ruleOther,
      ...findAllParams,
    };
    // 根据rule处理query，剔除非rule检查字段
    for (const queryKey in queryOrigin) {
      if (_rule.hasOwnProperty(queryKey)) {
        query.where[queryKey] = queryOrigin[queryKey];
      }
      if (allRule.hasOwnProperty(queryKey)) {
        query[queryKey] = queryOrigin[queryKey];
      }
    }
    // 如果搜索参数queryOrigin中带有keyword，且不为空字符串，则视keyword为模糊搜索
    if (queryOrigin.hasOwnProperty('keyword') && queryOrigin.keyword.trim() !== '') {
      query.where[Op.or] = [];
      for (const queryKey in _rule) {
        // 非模糊搜索排除字段的所有rule中的字段, 且数据类型为string，做模糊查询
        if (!keywordLikeExcludeParams.includes(queryKey) && _rule[queryKey].type === 'string') {
          query.where[Op.or].push({ [queryKey]: { [Op.like]: `%${queryOrigin.keyword.trim()}%` } });
        }
      }
    }

    return {
      allRule,
      query,
    };
  },
};

module.exports.body = {
  // [GET]：服务器成功返回用户请求的数据
  SUCCESS({ ctx, res = null, msg = '请求成功', code = 0 }) {
    ctx.body = {
      code,
      data: res,
      msg,
    };
    ctx.status = 200;
  },

  // [POST/PUT/PATCH]：用户新建或修改数据成功。
  CREATED_UPDATE({ ctx, res = null, msg = '新建或修改数据成功' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
    };
    ctx.status = 201;
  },

  /*
   * @description [DELETE]：用户删除数据成功。
   */
  NO_CONTENT({ ctx, res = null, msg = '删除数据成功' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
    };
    ctx.status = 204;
  },

  // [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作
  INVALID_REQUEST({
    ctx,
    res = null,
    msg = '请求有错误，服务器没有进行新建、修改、删除数据的操作',
    code = 400,
    status = 400,
  }) {
    ctx.body = {
      code,
      data: res,
      msg,
    };
    ctx.status = status;
  },

  // [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
  FORBIDDEN({ ctx, res = null, msg = '权限不足，访问被禁止' }) {
    ctx.body = {
      code: 403,
      data: res,
      msg,
    };
    ctx.status = 403;
  },

  // [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作
  NOT_FOUND({ ctx, res = null, msg = '资源未找到', status = 200 }) {
    ctx.body = {
      code: 404,
      data: res,
      msg,
    };
    ctx.status = status;
  },

  // [*] 参数发生验证错误。
  VALIDATION_FAILED({ ctx, res = null, msg = '参数发生验证错误' }) {
    ctx.body = {
      code: 422,
      data: res,
      msg,
    };
    ctx.status = 422;
  },
};
