const { renderToString } = require('react-dom/server');

const ImageService = require('./serverBundle.js');

console.log(ImageService)


const sendHTML = (req, res) => {
  const HTML = `
    <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Cabin:400,400i,500,500i,600,600i,700,700i|Open+Sans|Roboto" rel="stylesheet">
          <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,300" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="circular-font/style.css"/>
        </head>
        <body>
          <div id="image-service">${renderToString(ImageService)}</div>
          <script src="bundle.js"></script>
        </body>
      </html>
  `
  console.log(HTML)
  res.send(HTML);
};

module.exports = {
  sendHTML,
}