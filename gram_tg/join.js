const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const session = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTIBuxleiHP/zPHQCsVnFJIvXxBJoCpf8LaAEfYmzpHxEcxAwGR5babcXC+TlBEokm3e9wEY8UNQ16m1dm/4w3lW3UFl+/IgWODkZDEUz3zX6ODvZz4cmQiNCANdY0tBsKvPoeyxsbQ+XK8wEGoxfC3glP4TCGWYYiFtmFBqU0GdW6LUGXiLKzCzgmtSAN0oyn+KMdbURQ7ZwnWcOSGjlQkzhCX+gES72a4sV/Nrv8pjuu4GamnzeTjNm3Au9cCKxd981yN9pzPjLnIY0k3TZFc8K8UagP/G1sEs5YdgHH0hbnz/8Cve3A8MBm46z1Q3aVLevE88vjfBSLFLAOpPvLtqLDE=")
const client = new TelegramClient(session, 25171031, '10f7696a65a7217fad43302ea6ba1695', {
  appVersion:"2.7.1",
  deviceModel:"PC",
  systemVersion:"Windows 10"
});

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()
 console.log(client)
  const result = await client.invoke(
    new Api.channels.JoinChannel({
      channel: "KuplyTraff",
    })
  );

  const user = await client.getMe();
  console.log(user)
  console.log(result); // prints the result
})();