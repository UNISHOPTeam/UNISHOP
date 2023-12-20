// export function GetQueryString(name)
// {
//     const w = location.hash.indexOf('?');
//     const query = location.hash.substring(w+1);
//     const vars = query.split("&");
//     for (let i = 0; i < vars.length; i++) {
//         const pair  = vars[i].split('=');
//         if(pair[0]===name){
//             return pair[1];
//         }
//     }
//     return false
// }
// export const GetQueryString =function (name)
// {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  unescape(r[2]); return null;
// }

export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if(window.location.hash){
    var a = ("?"+window.location.hash.split('?')[1]).substr(1).match(reg);
    if (a != null) return unescape(a[2]); return null;
  }
  var r =  window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
  }
 // 防抖
export function _debounce(fn, delay) {
    // eslint-disable-next-line no-redeclare
    var delay = delay || 200;
    let timer;
    return function () {
      const th = this;
      const args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.apply(th, args);
      }, delay);
    };
  }
  /* eslint-disable no-mixed-operators */
/**
  * 获取距离指定时间还有多少天
  * @param {String | Number | Date} dateTime 日期时间
  * @example
  * ```javascript
  *     getDistanceSpecifiedTime('2019/02/02 02:02:00');
  *     getDistanceSpecifiedTime(1549036800000);
  *     getDistanceSpecifiedTime(new Date("2019/2/2 00:00:00"));
  * ```
  */
export const getDistanceSpecifiedTime = (dateTime) => {
  // 指定日期和时间
  const EndTime = new Date(dateTime);
  // 当前系统时间
  const NowTime = new Date();
  const t = EndTime.getTime() - NowTime.getTime();
  const d = Math.floor(t / 1000 / 60 / 60 / 24);
  // const h = Math.floor(t / 1000 / 60 / 60 % 24);
  // const m = Math.floor(t / 1000 / 60 % 60);
  // const s = Math.floor(t / 1000 % 60);
  // const html = `${d} 天${h} 时${m} 分${s} 秒`;
  // console.log(html);
  // return [d, h, m, s];
  return d<=0?0:d
};

export const isTimePassed = (dateTime) => {
  // 指定日期和时间
  const EndTime = new Date(dateTime);
  // 当前系统时间
  const NowTime = new Date();
  return  (EndTime.getTime() - NowTime.getTime()) < 0 ;
};
