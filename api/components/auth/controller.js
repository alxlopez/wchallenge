const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        let data = await store.query(TABLE, { username: username });

        const passIsEqual = await bcrypt.compare(password, data.password);
        if(passIsEqual) {
            //Generate Token
            return auth.sign(data);
        } else {
            throw error('Invalid credentials', 403);
        }
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        console.log('authData: ', authData);
        return store.upsert(TABLE, authData);
    }

    return {
        login,
        upsert
    }
}