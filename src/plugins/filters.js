import moment from 'moment';
import Vue from 'vue';
import Enum from '@/stores/Enum';
import Provinces from 'china-division/dist/provinces.json';
import Cities from 'china-division/dist/cities.json';
import Areas from 'china-division/dist/areas.json';
/**
 * 根据值查询对应过滤后的名称
 * @param arr 需要查询的过滤名称数组
 * @param value 需要查询的值
 */
function getTypeLabel(arr, value) {
  return arr.find(x => x.value.toString() === value.toString()).label;
}

const getDatetime = {
  datetime(value) {
    const datetime = moment(value).format('YYYY-MM-DD HH:mm:ss');
    if (datetime === 'Invalid date') return '-';
    return datetime;
  },
  date(value) {
    const date = moment(value).format('YYYY-MM-DD');
    return date === 'Invalid date' ? '-' : date;
  },
  time(value) {
    const time = moment(value).format('HH:mm:ss');
    return time === 'Invalid date' ? '-' : time;
  },
};

function install(_Vue) {
  _Vue.filter('date', value => getDatetime.date(value));
  _Vue.filter('time', value => getDatetime.time(value));
  _Vue.filter('datetime', value => getDatetime.datetime(value));
  _Vue.filter('province', value => value && Provinces.find(item => item.code === value).name);
  _Vue.filter('city', value => value && Cities.find(item => item.code === value).name);
  _Vue.filter('district', value => value && Areas.find(item => item.code === value).name);
  // 枚举类型过滤器注册
  Object.keys(Enum).forEach((item) => {
    _Vue.filter(item, (value) => {
      try {
        return getTypeLabel(Enum[item], value);
      } catch (e) {
        return '-';
      }
    });
  });
}

Vue.use(install);
