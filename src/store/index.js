import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// modules 自动化
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modulesTemp, modulePath) => {
    // set './user.js' => 'user'
    const temp = modulesTemp
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    temp[moduleName] = value.default
    return temp
}, {})

// Vuex 数据持久化插件（刷新页面不丢失）
const createPersistedStatePlugin = createPersistedState({
    // 可选择 localStorage、sessionStorage、cookie
    storage: window.sessionStorage,
    reducer: state => ({
        // TODO 将需要持久的数据在这里配置，若需全部持久则删除 reducer
        example: state.example
    })
})

const store = new Vuex.Store({
    plugins: [createPersistedStatePlugin],
    modules
})

export default store
