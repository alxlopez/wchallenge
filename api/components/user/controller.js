const { nanoid } = require('nanoid');
const auth = require('../auth');
const error = require('../../../utils/error')

const TABLE = 'user';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body) {

        let user = {
            name : body.name,
            last_name: body.lastName,
            prefered_currency: body.preferredCurrency
        }

        if(body.id) {
            user.id = body.id;
        }

        //Regular expression for password validation
        const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/;

        if(!regularExpression.test(body.password)) {
            throw error('Invalid password', 403);
        }

        const userInsertResult = await store.upsert(TABLE, user);
        
        let insertId = (userInsertResult.insertId === 0) ? user.id : userInsertResult.insertId;

        if(body.password || body.username) {
            await auth.upsert({
                id: insertId,
                username: body.username,
                password: body.password
            });
        }

        return userInsertResult;
    }

    function remove(id) {
        return store.remove(TABLE, id);
    }

    return {
        list,
        get,
        upsert,
        remove
    }
}
