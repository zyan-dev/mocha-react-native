import {get} from 'lodash';

const getCredentials = state => get(state, 'userReducer.credentials', []);

export default {
  getCredentials,
};
