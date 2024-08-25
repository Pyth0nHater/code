const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require('fs');

const session = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNDEBu71UwzuUY/PG84r8LGk8uFlGh4hpedqCzkU4x6ivBr1lDTBNSTmQRCiHEuIpQdJqbwUqAB1YGJvm/IZVnEMJxYrePja0XnYsHzrU4wxvGYGENybMMXn5MRytZfHZ7tiSI9bOTyjObK+OZ37LrzbksGnyrL1SeQPAEud6HOEsEWYETJhA6y727VYF8asP3UXEzDzwk/NBzw6DrlUP+K6qY8EEKip+nVXDdyzWFWiOJrZdNxJP2pslTs/CD2ij357LbYdD9Catmr7z17gXHRPE0s0QoT7k4q37g4Ginx2m+KeC91C4s6hbmglYzRjnZ19RsUcqU9MC9TovfjoGVS1WpQQ=");
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {});

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()

  const entity = await client.getEntity("https://t.me/kupitrafic");

  const countResult = await client.invoke(
    new Api.channels.GetParticipants({
      channel: entity,
      filter: new Api.ChannelParticipantsRecent({}),
      offset: 0,
      limit: 1,
      hash: BigInt("-4156887774564"),
    })
  );

  const count = countResult.count;

  const result = await client.invoke(
    new Api.channels.GetParticipants({
      channel: entity,
      filter: new Api.ChannelParticipantsRecent({}),
      offset: 0,
      limit: count,
      hash: BigInt("-4156887774564"),
    })
  );

  const usernames = result.users
    .filter(user => user.username) // Filter out users without a username
    .map(user => user.username);

  fs.writeFileSync('usernames.json', JSON.stringify(usernames, null, 2));

  console.log("Usernames saved to usernames.json");
})();
