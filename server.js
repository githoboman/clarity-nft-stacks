const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/nft-minted', (req, res) => {
  console.log('NFT Minted:', req.body);
  // Handle NFT mint event, e.g., update database, send notifications
  res.status(200).send('OK');
});

app.post('/ft-minted', (req, res) => {
  console.log('FT Minted:', req.body);
  // Handle FT mint event
  res.status(200).send('OK');
});

app.post('/tip-sent', (req, res) => {
  console.log('Tip Sent:', req.body);
  // Handle tip event
  res.status(200).send('OK');
});

app.post('/commission-paid', (req, res) => {
  console.log('Commission Paid:', req.body);
  // Handle commission event
  res.status(200).send('OK');
});

app.post('/nft001-minted', (req, res) => {
  console.log('NFT001 Minted:', req.body);
  res.status(200).send('OK');
});

app.post('/nft002-minted', (req, res) => {
  console.log('NFT002 Minted:', req.body);
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});