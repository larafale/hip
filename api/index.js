
module.exports = (req, res) => {

  res.end(`

    API:

    /price?ticker=btc-eur
    /balance?ticker=eur&apikey=xx&secret=xx'
    /buy?ticker=btc-eur&amount=0.3&apikey=xx&secret=xx'

  `)

}