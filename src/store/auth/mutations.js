export default {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      if (payload.token) {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('userId', payload.userId);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    }
  };
  