import ccxt from "ccxt"

module.exports = (req, res) => {
  const Err = e => res.json({ err: e.message || e })
  const { query, body } = req
  const data = { ...body, ...query}

  try {
    let { ticker, amount } = data
    if(!ticker) return Err('missing ticker')
    if(!amount) return Err('missing amount')
    ticker = ticker.replace('-','/').toUpperCase()

    const client = new ccxt.kraken({
      apiKey: data.apikey,
      secret: data.secret
    })

    client.createMarketBuyOrder(ticker, amount).then(order => {
      res.json(order)
    }).catch(e=> Err(e))

  }catch(e){
    Err(e)
  }

}

