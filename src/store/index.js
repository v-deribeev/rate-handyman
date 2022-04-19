import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    allHandymen: [],
    userToken: null,
  },
  getters: {
    userToken(state) {
      return state.userToken
    },

    allHandymen(state) {
      return state.allHandymen
    },

    isUserAuthenticated(state) {
      if (state.userToken === null) {
        return false
      } else {
        return true
      }
    },
  },
  mutations: {
    // updates the token with the bearer Token
    setToken(state, payload) {
      state.userToken = payload
    },
    // clears the token (resets the state to the initial value)
    removeToken(state) {
      state.userToken = null
    },
    // mutator logic to handle state update of allHandymen
    storeAllHandymen(state, payload) {
      state.allHandymen = payload
    },
    searchWorkers(state, payload) {
      console.log('my payload', payload)
      state.allHandymen = payload
    },
    sortWorkers(state, payload) {
      console.log('sorted payload', payload)
      state.allHandymen = payload._embedded.workers
    },
  },
  actions: {
    //makes a get request and attaches auth token to the header
    async getAllHandymen({ commit }, userAccessToken) {
      try {
        const handymenData = await axios.get('/workers', {
          headers: {
            Authorization: `${userAccessToken}`,
          },
        })
        // commits the mutator to update the state of allHandymen with the received data from the response
        commit(`storeAllHandymen`, handymenData.data._embedded.workers)
      } catch (e) {
        console.log(e)
      }
    },

    async getSearchData({ commit, state }, attObject) {
      try {
        const filteredData = await axios.get(
          `/workers/search/${attObject.uri}`,
          {
            headers: {
              Authorization: `${attObject.token}`,
            },
            params: {
              [attObject.category]: attObject.keyword,
            },
          }
        )
        console.log(state)
        commit('searchWorkers', filteredData.data)
      } catch (error) {
        console.log(error, 'error')
      }
    },

    async getSortedWorkers({ commit, state }, attObject) {
      try {
        console.log('passed object', attObject)
        const sortedData = await axios.get(`/workers`, {
          headers: {
            Authorization: `${attObject.token}`,
          },
          params: {
            sort: attObject.sortingCategory + ',' + attObject.sortingOrder,
          },
        })
        console.log('haha', state)
        commit('sortWorkers', sortedData.data)
      } catch (error) {
        console.log(error, 'error')
      }
    },

    async login({ commit }, userData) {
      try {
        const loginResponseData = await axios.post('/users/login', {
          username: userData.username,
          password: userData.password,
        })
        //extracts bearer token FROM the header of the response, leaves only the token string
        const authHeader = loginResponseData.headers.authorization
        const bearerToken = authHeader.substring(7, authHeader.length)

        commit('setToken', bearerToken)
        localStorage.setItem('JWT', bearerToken)
      } catch (error) {
        console.log(error, 'login fail')
      }
    },

    // clears token from localStorage
    logout({ commit }) {
      commit('removeToken')
      localStorage.removeItem('JWT')
    },
  },
  modules: {},
})
