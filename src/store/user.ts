import { defineStore } from 'pinia'



export const useUserStore = defineStore('user', {
    state: () => ({
        userid: '',
        username: ''
    }),
    persist: true
})