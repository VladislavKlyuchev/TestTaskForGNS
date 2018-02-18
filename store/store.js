import Vue from 'vue';
import Vuex from 'vuex';
import jsonData from '../test.json';

Vue.use(Vuex);
export const store = {
    state: {
        tableData: jsonData
    }
}