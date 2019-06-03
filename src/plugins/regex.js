/* eslint-disable no-param-reassign */
import _Vue from 'vue';

function install(Vue) {
  Vue.prototype.$regRules = {
    /**
     * 手机号码
     */
    mobile: /^1\d{10}$/,
    /**
     * 身份证
     */
    idcard: /^\d{15}(\d{2}[0-9xX])?$/,
    /**
     * 邮箱
     */
    email: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)+[a-zA-Z0-9]{2,}$/,
    /**
     * QQ
     */
    qq: /^[1-9]\d{4,}$/,
    /**
     * 微信
     */
    weixin: /^.*$/,
    /**
     * 金额
     */
    money: /^[0-9]+\.?[0-9]{0,2}$/,
    /**
     * 整数
     */
    integer: /^0|([1-9][0-9]*)$/,
  };
}

_Vue.use(install);
