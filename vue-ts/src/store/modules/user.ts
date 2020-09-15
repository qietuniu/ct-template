import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators'
import Cookies from 'js-cookie'
import store from '@/store'

export interface UserState {
  token: string
  currentTab: number
}
// @Module 标记当前为module
// module本身有几种可以配置的属性
// 1、namespaced:boolean 启/停用 分模块
// 2、stateFactory:boolean 状态工厂
// 3、dynamic:boolean 在store创建之后，再添加到store中。 开启dynamic之后必须提供下面的属性
// 4、name:string 指定模块名称
// 5、store:Vuex.Store实体 提供初始的store

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  // 在需要引用的地方单独引用该store文件即可注入。
  // 好处：灵活使用，仅仅在需要引入的地方才注入到store中去
  // 缺点：需要单独引入文件
  public token = getToken() || ''
  public currentTab = 0
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_CURRENT_TAB(currentTab: number) {
    this.currentTab = currentTab
  }

  @Action
  public Login(userInfo: { username: string; password: string }) {
    const { username, password } = userInfo
    return new Promise(resolve => {
      this.SET_TOKEN(new Date().getTime().toString())
      Cookies.set('userName', username.trim())
      setToken(new Date().getTime().toString())
      resolve()
    })
  }

  @Action
  public Logout() {
    return new Promise(resolve => {
      removeToken()
      Cookies.remove('userName')
      this.SET_TOKEN('')
      resolve()
    })
  }

  @Action
  ClickTab(currentTab: number) {
    return new Promise(resolve => {
      this.SET_CURRENT_TAB(currentTab)
      resolve()
    })
  }
}

// getModule 得到一个类型安全的store，module必须提供name属性
export const UserModule = getModule(User)

// import { UserModule } from "@/store/modules/user";
