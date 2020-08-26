// 获取日期,默认当前时间
export function getDay(type, date = new Date()) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var days = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var milliseconds = date.getMilliseconds()
  month = month < 10 ? '0' + month : month
  days = days < 10 ? '0' + days : days
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  if (milliseconds < 100) {
    milliseconds = '0' + milliseconds
    if (milliseconds < 10) {
      milliseconds = '0' + milliseconds
    }
  }
  switch (type) {
    case 'dayTime':
      return (
        year.toString() +
        '-' +
        month.toString() +
        '-' +
        days.toString() +
        ' ' +
        hour.toString() +
        ':' +
        minute.toString() +
        ':' +
        second.toString()
      )
    case 'day':
      return year.toString() + '-' + month.toString() + '-' + days.toString()
    case 'month':
      return year.toString() + '-' + month.toString()
    case 'year':
      return year.toString()
    case 'milliseconds':
      return (
        year.toString() +
        month.toString() +
        days.toString() +
        hour.toString() +
        minute.toString() +
        second.toString() +
        milliseconds.toString()
      )
    default:
      return year.toString() + '-' + month.toString() + '-' + days.toString()
  }
}
// can
export function getPrevPage() {
  /* eslint-disable */
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  // const currentPage = pages[pages.length - 1]
  const prevPage = pages[pages.length - 2]
  // const options = currentPage.options
  return prevPage
}
