const app = require('./mainApp');

const port = process.env.PORT || 3000;

const targetBaseUrl = 'https://quick-credit-loanapp.herokuapp.com/docs/';

const handleRedirect = (req, res) => {
  // Req URL enables us to overwrite it with targetBaseUrl
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
};

// Fetches and Redirects all Hosts to TargetUrl
app.get('*', handleRedirect);

app.listen(port);
