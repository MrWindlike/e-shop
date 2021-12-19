### HTTP生命周期

当接收到一个请求后，会执行处理请求的处理函数，包含以下这些阶段：

```
HTTP Request
     ⇓
Before Hooks
     ⇓
Route Found? -----------N------------ |
     |                                |
     Y                                |
     ⇓                                |
Middleware 1                          |
     ⇓                                |          
Middleware 2 -- Response -- |         | 
     ⇓                      |         | 
    ...                     |         | 
     ⇓                      |         | 
Route Handle                |         | 
     ⇓                      |         | 
    ...                     |         | 
     ⇓                      |         | 
Middleware 2                |         | 
     ⇓                      |         | 
Middleware 1 <------------- |         | 
     ⇓                                | 
After Hooks  <----------------------- |
     ⇓
HTTP Response
```

### IoC
Ioc容器为反转控制容器，用于管理不同类之间的依赖关系，并生成实例。调用者只需从Ioc容器中拿出实例即可，而无需管理实例是如何构造出来的。

#### 为什么要用IoC
在大型项目中，类与类之间的依赖关系往往是很复杂的。在没有IoC之前，调用者必须手动处理这些类之间的依赖关系，这会有以下几点问题：
1. 需要按依赖顺序构造实例，并对实例进行一些配置
2. 创建多个不必要的实例，造成大量资源浪费
3. 更换实现类需要改动多个地方


#### 实现

```js
class IoC {
    constructor() {
        this.bindings = {}
    }

    bind(namespace, generator) {
        this.bindings[namespace] = {
            generator,
            cache: null,
            singleton: false,
        }
    }

    singleton(namespace, generator) {
        this.bindings[namespace] = {
            generator,
            cache: null,
            singleton: true,
        }
    }

    use(namespace) {
        const binding = this.bindings[namespace]

        if (binding.singleton) {
            return binding.cache = binding.cache || binding.generator()
        } else {
            return binding.generator()
        }
    }
}
```

当然，除了直接调用IoC的`use`方法，我们还可以直接使用ES模块或者CommonJS模块来引入IoC容器：
```js
// 编译前
const xxx = require('@ioc:xxx')
// 编译后
const xxx = global[Symbol.for('ioc.use')]("xxx")
```

### Provider
Provider为服务提供者，可以用于绑定IoC容器到命名空间中，也可以绑定属性或方法到`context`、`request`、`response`实例中，以此为应用提供服务。

```js
class Provider {

  register() {
    // 绑定相关IoC
  }

  boot() {
    // IoC容器已就绪
    // 可以使用IoC进行操作，比如绑定事件等
  }

  ready() {
    // App就绪
    // 可以使用marco进行扩展对象
  }

  shutdown() {
    // App关闭
    // 可以做一些清除工作
  }
}
```


### Middleware
中间件可以参与到应用程序的请求生命周期中，他们将按顺序执行来处理请求和响应。

在`adonisjs`中，是通过洋葱模型来实现中间件的，下面是一个简单实现的代码：

```js
class Middleware {
    constructor() {
        this.middlewares = []
    }

    register(middleware) {
        this.middlewares.push(middleware)
    }
}

class Runner {
    constructor(middlewares) {
        this.middlewares = middlewares
        this.handler = null
    }

    setHandler(handler) {
        this.handler = handler
    }

    invoke(i, params) {
        const middleware = this.middlewares[i]
        const next = ()=> this.invoke(i + 1, params)

        if (middleware) {
            middleware(...params, next)
        } else if (this.handler) {
            this.handler(...params)
        }
    }

    run(params) {
        this.invoke(0, params)
    }
}
```
