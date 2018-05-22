
const types = {
    // 这里是定义组件的方法 名
    MENU_EXTENSION: 'MENU_EXTENSION',
}


const state = {
    // 这里是组件的状态
    // 存储用户的信息
    user_info: {}
}

const getters = {
    // 这里一般写一些过滤 state 的方法
    menuitems: state => state.is_menu_extension,
}

const mutations = {
    // 这里写改变组件状态的方法 这里的方法一般是用commit 的方法来提交调用的
    [types.LOAD_ROUTERS](state) {
        state.isLoadRoutes = !state.isLoadRoutes;
    }
}

const actions = {
    // 这里一般是定义 异步 改变组件的方法 一般是用dispatch 的方法来提交调用的 (可以是ajax请求数据)
    addMenu: ({ commit }, menuItems) => {
        if (menuItems.length > 0) {
            commit(types.ADD_MENU, menuItems)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}

