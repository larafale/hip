import ccxt from "ccxt"

module.exports = (req, res) => {
  const Err = e => res.json({ err: e.message || e })
  const { query, body } = req
  const data = { ...body, ...query}

  try {
    let { ticker } = data
    if(!ticker) return Err('missing ticker')
    ticker = ticker.toUpperCase()

    const client = new ccxt.kraken({
      apiKey: data.apikey,
      secret: data.secret
    })

    client.fetchBalance().then(balance => {
      res.json(balance[ticker].total)
    }).catch(e=> Err(e))

  }catch(e){
    Err(e)
  }

}