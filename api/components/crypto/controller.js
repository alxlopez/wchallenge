const CoinGecko = require('coingecko-api');
const request = require('request');

const userController = require('../user');
const currencyController = require('../currency');

const error = require('../../../utils/error')

const TABLE = 'user_crypto';

module.exports = function(injectedStore) {

    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    const coinGeckoClient = new CoinGecko();

    async function globalList(pageNumber, pageSize, order, userAuth) {

        if(order) {
            order = (order == 'desc') ? CoinGecko.ORDER.COIN_NAME_DESC : CoinGecko.ORDER.COIN_NAME_ASC;
        }
        
        let activeUser = (userAuth) ? await userController.get(userAuth.id) : null;
        let preferredCurrency = (activeUser) ? await currencyController.get(activeUser[0].prefered_currency) : null;

        const coinList = await coinGeckoClient.coins.all({
            order: order || CoinGecko.ORDER.COIN_NAME_ASC,
            per_page: pageSize || 100,
            page: pageNumber || 1,
            localization: false,
            sparkline: false,
          });

          let cryptoList = [];

          for (let coin of coinList.data) {
              const cryptObject = {
                    id : coin.id,
                    symbol: coin.symbol,
                    userCurrency: preferredCurrency[0].code,
                    price: coin.market_data.current_price[preferredCurrency[0].code],
                    name: coin.name,
                    image: coin.image.thumb,
                    lastUpdate: coin.last_updated
              }
              cryptoList.push(cryptObject);
          }

          return cryptoList;
    }

    async function upsert(body, userAuth) {
        let userCryptoList = [];
        for (let coinId of body.coinIdList) {
            const userCrypto = {
                user: userAuth.id,
                crypto: coinId
            }
            userCryptoList.push(userCrypto);
            await store.upsert(TABLE, userCrypto);
        }
        return userCryptoList;
    }

    // Se crea ésta función porque no hay coinGeckoClient.coins.fetch() aunque según la documentación si existe
    function fetchCoin(coinId) {
        return new Promise( async (resolve, reject) => {
            const options = {
                url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
                json: true
            }
            request.get(options, async(err, response, body) => {
                if(err || response.statusCode != 200) throw reject(error('Query failed', 400));
                const cryptObject = {
                    id : body.id,
                    symbol: body.symbol,
                    prices: {
                        ars: body.market_data.current_price.ars,
                        usd: body.market_data.current_price.usd,
                        eur: body.market_data.current_price.eur
                     },
                    name: body.name,
                    image: body.image.thumb,
                    lastUpdate: body.last_updated
                }
                resolve(cryptObject);
            });
        });
    }

    async function list(userAuth) {
        let userCryptoList = await store.queryAll(TABLE, { user: userAuth.id });
        let coinList = [];
        for (let userCrypto of userCryptoList) {
                const coin = await fetchCoin(userCrypto.crypto);
                coinList.push(coin);
        }
        return coinList;
    }

    async function topList(n, order, userAuth) {
        if(n > 25) throw error('n cannot be greater than 25', 400);
        let finalOrder = order || 'desc';
        let activeUser = (userAuth) ? await userController.get(userAuth.id) : null;
        let preferredCurrency = (activeUser) ? await currencyController.get(activeUser[0].prefered_currency) : null;
        const userCurrency = preferredCurrency[0].code;
        const coinList = await list(userAuth);
        coinList.sort((a,b) => (a.prices[userCurrency] < b.prices[userCurrency]) ? 1 : ((a.prices[userCurrency] > b.prices[userCurrency]) ? -1 : 0));

        if(finalOrder === 'asc') {
            coinList.reverse();
        }
        
        return coinList.slice(0, n);
    }

    return {
        globalList,
        upsert,
        list,
        topList
    }

}