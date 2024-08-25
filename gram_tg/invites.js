const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const session = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEBuxEz4BX1lmKmVS0vgrWctCoCcqKCroUQcdnk+ukb3hhoEqveD1PSBYn4Ok2PNLosw/AoFyqczSZ92uZHs28/8iYTJfNIfj+5pZgl1ifUY5j+1K0bAC3bqGe0qjylBhCZ47puNIWwKgg5ttvlaFqxlA1G7jOmv/sXg1ZC2YwQDk74HtiWHfMdLTRqycnGQKY7V+IrgZoPQIpl5ZORvxmGY46Bs+hJo3fQbGiVZY1mr+y7QFvFEIV4XpNRyiZlBB5r4BAeLjfMdFm+EPPQ+/J550qbY3Q8JeMIg1XIirMsIubH6ke0I8cogUqw/YPboBX6sihLzXhamUGMSHskeF4pVyM="); // You should put your string session here
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()

  const entity = await client.getEntity("https://t.me/KuplyTraff");

  const usersArr = [
    "Lume68",
    "marakuya67",
    "yoshechkkaaahhh",
    "tonywork",
    "byprince",
    "Bab_boys",
    "Benan_89",
    "qucklyytraf",
    "sergeeeeey009",
    "crewqxt",
    "shaid_35",
    "vegaban",
    "Fudg_iq",
    "dob8655",
    "Ferkoaf",
    "topmanagerv_v",
    "WhyShini",
    "E_m1l",
    "mirageking",
    "dawsatmol",
    "hesorev",
    "gambit_abuza",
    "Arlombus",
    "hflhdobb",
    "ybttrafick",
    "Majorka_Traff",
    "Whatie",
    "Daviddoros",
    "workjecko",
    "sancheez89"
  ]
  
  for(let i = 0; i < usersArr.length-1; i++){
  const result = await client.invoke(
    new Api.channels.InviteToChannel({
      channel: entity,
      users: [usersArr[i]],
    })
  );
  console.log(result); // prints the result
  await delay(60000)
}

})();