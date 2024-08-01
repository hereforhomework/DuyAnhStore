import axios from 'axios';


export default {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('http://localhost:3000/login', credentials);
      console.log('Login response:', response.data);
      const { token, userId } = response.data;

      // Store token and user info in Vuex store
      commit('setUser', { token, userId });

      // Save to localStorage for persistence
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'http://localhost:3000/login';

    if (mode === 'signup') {
      url = 'http://localhost:3000/signup';
    }

    try {
      const response = await axios.post(url, {
        email: payload.email,
        password: payload.password
      });

      const responseData = response.data;

      context.commit('setUser', {
        token: responseData.token,
        userId: responseData.userId,
        tokenExpiration: responseData.tokenExpiration
      });

      // Save to localStorage for persistence
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to authenticate.';
      throw new Error(errorMessage);
    }
  },

  tryLogin({ commit }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      commit('setUser', { token, userId });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
