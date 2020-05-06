import request from '@/utils/request'

export function queryPage(data) {
  return request({
    url: '/queryPage',
    method: 'post',
    data
  })
}
