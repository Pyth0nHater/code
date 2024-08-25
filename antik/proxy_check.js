const checkProxy = require('check-proxy').check;
checkProxy({
  testHost: 'https://github.com/Pyth0nHater/test_vps/blob/main/parser/reels.js', // put your ping server url here
  proxyIP: '192.36.27.85', // proxy ip to test
  proxyPort: 12305, // proxy port to test
  localIP: '95.31.9.100', // local machine IP address to test
  connectTimeout: 6, // curl connect timeout, sec
  timeout: 10, // curl timeout, sec
  websites: [
    {
      name: 'example',
      url: 'http://www.example.com/',
      regex: /example/gim, // expected result - regex

    },
    {
      name: 'yandex',
      url: 'http://www.yandex.ru/',
      regex: /yandex/gim, // expected result - regex

    },
    {
      name: 'google',
      url: 'http://www.google.com/',
      regex: function(html) { // expected result - custom function
        return html && html.indexOf('google') != -1;
      },
    },
    {
      name: 'amazon',
      url: 'http://www.amazon.com/',
      regex: 'Amazon', // expected result - look for this string in the output
    },

  ]
}).then(function(res) {
	console.log('final result', res);
}, function(err) {
  console.log('proxy rejected', err);
});