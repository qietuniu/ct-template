# vue2-vant-ts

## 基础安装

``` bash
vue create xxx
vue add style-resources-loader
cnpm i --save-dev vue-property-decorator vue-class-component vuex-module-decorators
cnpm i -D ts-import-plugin
```

加入自己的一些插件

``` bash
cnpm i -D axios js-cookie @types/js-cookie lib-flexible postcss-pxtorem vconsole
```

### babel. config. ts

动态引入vant的组件样式

``` javascript
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: name => `${name}/style/less` 
        }, 'vant']
    ]
};
```

### . eslintrc. js

* 开发环境与ESLint当前的解析功能不兼容需要新增'parser': 'babel-eslint'
* 代码习惯: 使用单引号和不加分号；

``` javascript
parserOptions: {
        'parser': 'babel-eslint',
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'none',
                bracketSpacing: true,
                jsxBracketSameLine: true
            },
        ],
    }
```

### vue. config. js

全局less变量引入

``` javascript
pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'less',
        patterns: [resolve('src/assets/style/var.less')]
    }
},
```

去掉预加载，处理vant与ts

``` javascript
chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.module
        .rule('ts')
        .use('ts-loader')
        .tap(options => {
            options = merge(options, {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [
                        tsImportPluginFactory({
                            libraryName: 'vant',
                            libraryDirectory: 'es',
                            style: true
                        })
                    ]
                }),
                compilerOptions: {
                    module: 'es2015'
                }
            })
            return options
        })
},
```

rem适应，引入覆盖变量。此处无法覆盖vant一些默认属性，需要重写

``` javascript
css: {
    loaderOptions: {
        postcss: {
            plugins: [
                autoprefixer(),
                pxtorem({
                    rootValue: 37.5,
                    propList: ['*'],
                    selectorBlackList: ['van-circle__layer']
                })
            ]
        },
        less: {
            modifyVars: modifyVars
        }
    }
},
```

vuex装饰器使用

``` javascript
transpileDependencies: [
    'vuex-module-decorators'
]
```

[https://github.com/kaorun343/vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

## typescript

### 基础概念

* tsconfig. json: typescript配置文件, 主要用于指定待编译的文件和定义编译选项
* shims-tsx. d. ts: 允许. tsx 结尾的文件，在 Vue 项目中编写 jsx 代码
* shims-vue. d. ts: 主要用于 TypeScript 识别. vue 文件，Ts 默认并不支持导入 vue 文件
* vue-class-component: vue-class-component是一个 Class Decorator, 也就是类的装饰器
* vue-property-decorator: vue-property-decorator是基于 vue 组织里 vue-class-component 所做的拓展import { Vue, Component, Inject, Provide, Prop, Model, Watch, Emit, Mixins } from 'vue-property-decorator'
* vuex-module-decorators: 用 typescript 写 vuex 很好用的一个库import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from 'vuex-module-decorators'

### 组件声明

创建组件的方式变成如下:

``` typescript
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Test extends Vue {
}
```

### data 对象

``` javascript
import {
    Component,
    Prop,
    Vue,
    Watch
} from 'vue-property-decorator';
@Component
export default class Test extends Vue {
    private name: string;
}
```

### Prop 声明

!: 表示一定存在，?: 表示可能不存在。这两种在语法上叫赋值断言
@Prop(options: (PropOptions | Constructor[] | Constructor) = {})

* PropOptions: 可以使用以下选项：type，default，required，validator
* Constructor[]，指定 prop 的可选类型
* Constructor，例如 String，Number，Boolean 等，指定 prop 的类型

``` javascript
@Prop({
    default: false
}) private isCollapse!: boolean;
@Prop({
    default: true
}) private isFirstLevel!: boolean;
@Prop({
    default: ""
}) private basePath!: string;
```

### method

js 下是需要在 method 对象中声明方法，现变成如下

``` typescript
public clickFunc(): void {
  console.log(this.name)
  console.log(this.msg)
}
```

### Watch 

options 包含两个属性:

* immediate?:boolean 侦听开始之后是否立即调用该回调函数 
* deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数

``` javascript
@Watch("$route", {
    immediate: true
})
private onRouteChange(route: Route) {
    const query = route.query as Dictionary < string > ;
    if (query) {
        this.redirect = query.redirect;
        this.otherQuery = this.getOtherQuery(query);
    }
}
@Watch(path: string, options: WatchOptions = {})
```

``` javascript
@Watch('arr', {
    immediate: true,
    deep: true
}) onArrChanged(newValue: number[], oldValue: number[]) {}
computed 计算属性
public get allname() {
    return 'computed ' + this.name;
}
allname 是计算后的值， name 是被监听的值
```

### 生命周期函数

``` typescript
public created(): void {
  console.log('created');
}
public mounted():void{
  console.log('mounted')
}
```

### emit 事件

@Emit(event?: string)

* @Emit  装饰器接收一个可选参数，该参数是[公式]Emit 会将回调函数名的 camelCase 转为 kebab-case，并将其作为事件名 
* @Emit  会将回调函数的返回值作为第二个参数，如果返回值是一个 Promise 对象，$emit 会在 Promise 对象被标记为 resolved 之后触发 
* @Emit  的回调函数的参数，会放在其返回值之后，一起被$emit 当做参数使用 

``` javascript
import {
    Vue,
    Component,
    Emit
} from 'vue-property-decorator'
@Component
export default class MyComponent extends Vue {
    count = 0
    @Emit()
    addToCount(n: number) {
        this.count += n
    }
    @Emit('reset')
    resetCount() {
        this.count = 0
    }
    @Emit()
    returnValue() {
        return 10
    }
    @Emit()
    onInputChange(e) {
        return e.target.value
    }
    @Emit()
    promise() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(20)
            }, 0)
        })
    }
}
```

使用 js 写法

``` javascript
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        addToCount(n) {
            this.count += n
            this.$emit('add-to-count', n)
        },
        resetCount() {
            this.count = 0
            this.$emit('reset')
        },
        returnValue() {
            this.$emit('return-value', 10)
        },
        onInputChange(e) {
            this.$emit('on-input-change', e.target.value, e)
        },
        promise() {
            const promise = new Promise(resolve => {
                setTimeout(() => {
                    resolve(20)
                }, 0)
            })
            promise.then(value => {
                this.$emit('promise', value)
            })
        }
    }
}
```

### vuex

VuexModule 用于基本属性

``` javascript
export default class TestModule extends VuexModule {}
```

VuexModule 提供了一些基本属性，包括

* namespaced
* state
* getters
* modules
* mutations
* actions
* context

#### @Module  标记当前为 module 

module 本身有几种可以配置的属性:

* namespaced:boolean 启/停用 分模块
* stateFactory:boolean 状态工厂
* dynamic:boolean 在 store 创建之后，再添加到 store 中。开启 dynamic 之后必须提供下面的属性
* name:string 指定模块名称

``` javascript
@Module({
    dynamic: true,
    store,
    name: "settings"
})
class Settings extends VuexModule implements ISettingsState {}
```

#### store

Vuex. Store 实体 提供初始的 store

#### @Mutation  标注为 mutation 

``` typescript
@Mutation  
private SET_NAME(name: string) { // 设置用户名 this.name = name; }
```

#### @Action  标注为 action 

``` typescript
@Action  
public async Login(userInfo: { username: string; password: string }) { 
  // 登录接口，拿到token 
  let { username, password } = userInfo; 
  username = username.trim(); 
  const { data } = await login({ username, password }); 
  setToken(data.accessToken); 
  this.SET_TOKEN(data.accessToken); 
}
```

#### getModule 

得到一个类型安全的 store，module 必须提供 name 属性
export const UserModule = getModule(User); 

#### 传统的 store 用法:

``` javascript
export default {
    namespaced: true,
    state: {
        foo: ""
    },
    getters: {
        getFoo(state) {
            return state.foo
        }
    },
    mutations: {
        setFooSync(state, payload) {
            state.foo = payload
        }
    },
    actions: {
        setFoo({
            commit
        }, payload) {
            commot("getFoo", payload)
        }
    }
}
```

#### 使用vuex-module-decorators:

``` javascript
import {
    VuexModule,
    Mutation,
    Action,
    getModule,
    Module
} from "vuex-module-decorators";
```

## 参考链接

[https://www.tslang.cn/](https://www.tslang.cn/)
[https://vant-contrib.gitee.io/vant/#/zh-CN/theme](https://vant-contrib.gitee.io/vant/#/zh-CN/theme)
[https://zhuanlan.zhihu.com/p/99343202](https://zhuanlan.zhihu.com/p/99343202)
[https://championswimmer.in/vuex-module-decorators/pages/overview.html#what-it-does](https://championswimmer.in/vuex-module-decorators/pages/overview.html#what-it-does)
[https://blog.csdn.net/qq_34803821/article/details/102246166](
