import {defineStore} from "pinia";

export type RootState = {
    products: Array<{ productId: string, quantity: number, label: string, price: number }>;
};
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        products: []
    } as RootState),
    actions: {
        addProduct(productId: string, quantity: number, label: string, price: number) {
            const product = this.products.find(product => product.productId === productId)

            if (product === undefined) {
                this.products.push({productId, quantity, label, price})
            } else {
                product.quantity += quantity
            }
        }
    },
    getters: {
        getTotalProducts: (state) => {
            return state.products.reduce((acc, product) => acc + product.quantity, 0)
        },
        getProducts: (state) => state.products,
        getTotalPrice: (state) => state.products.reduce((acc, product) => acc + (product.quantity * product.price), 0)
    }
})
