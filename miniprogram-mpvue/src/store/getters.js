const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  navList: state => state.user.navList,
  permissionList: state => state.user.permissionList
}
export default getters
