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
    namespace: true,
    state,
    mutations,
    actions
}
