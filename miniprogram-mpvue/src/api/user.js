import request from '../utils/request'

export function login(data) {
  return request.post(`/sign_in`, data)
}
