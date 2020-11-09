import ccxt from "ccxt"

module.exports = (req, res) => {
  const Err = e => res.json({ err: e.message || e })
  const { query, body } = req
  const data = { ...body, ...query}

  try {
    let { ticker } = data
    if(!ticker) return Err('missing ticker')
    ticker = ticker.replace('-','/').toUpperCase()

    const client = new ccxt.kraken({
      apiKey: data.apikey,
      secret: data.secret
    })

    client.fetch_ticker(ticker).then(price => {
      res.json(price.last)
    }).catch(e=> Err(e))

  }catch(e){
    Err(e)
  }

}