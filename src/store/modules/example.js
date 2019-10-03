const state = {
    example: []
}

const mutations = {
    SET_EXAMPLE (state, example) {
        state.example = example
    }
}

const actions = {
    async getExample() {
        const res = await 1
        return res
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
