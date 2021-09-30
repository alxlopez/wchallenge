const TABLE = 'currency';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function get(id) {
        return store.get(TABLE, id);
    }    

    return {
        get,
    }
}