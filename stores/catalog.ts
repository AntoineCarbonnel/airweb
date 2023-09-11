import {defineStore} from "pinia";

export const useCatalogStore = defineStore({
    id: 'catalog',
    state: () => ({
        search: '',
    }),
    actions: {
        setSearch(search: string) {
            this.search = search
        }
    },
    getters: {
        getSearch: (state) => state.search
    }
})
