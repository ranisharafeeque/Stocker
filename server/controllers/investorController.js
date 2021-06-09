const db = require('../models/investorModels');
const finnhubService = require('../services/finnhubService');

const investorController = {};

// CREATE TABLE stock_watchlist (
//   id     SERIAL PRIMARY KEY,
//   symbol     VARCHAR(20) NOT NULL,
//   company      VARCHAR(5000) NOT NULL,
//   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
// );
investorController.addStock = async (req, res, next) => {
  const { symbol } = req.body;
  const profile = await finnhubService.getStockProfile(symbol);
  console.log(profile);
  const sql = `INSERT INTO stock_watchlist (symbol, company)
  VALUES('${symbol}', '${profile.name}')`;
  try {
    await db.query(sql);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in investorController.addStock',
      message: {
        err: 'investorController.addStock: ERROR: Check server logs for details',
      },
    });
  }
};
  
// investorController.StockList = async (req, res, next) => {
  
// };

module.exports = investorController;