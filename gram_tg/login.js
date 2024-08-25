const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 25171031;
const apiHash = "10f7696a65a7217fad43302ea6ba1695";
const stringSession = new StringSession(""); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: "+244933310789",
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Connect!" });
})();
//1AgAOMTQ5LjE1NC4xNjcuNDEBu5nlpm+ZOcummX+UNSh4UOXDs8mRSD7vtmT/gNhNfd/+lGP41z7NymIdKoE/vDlYAgKjD8SLIEBglG/N/2Qog/Nu0m+cHYXNU2orHKDIcpp7VBlikLagnGCzU8qvMbaf0Pfyg3AYjbPnOYtSc7H1pSKPvl+cRJh2oUUJqc3NLfgLGj7RHWP7vdNvRz9rHe9Q4qbTLhbIB9MiHw0qOW+JREKQq5vEkTlQQAXcg3aZrfLbthSdptfD22r40jlQQvZvdMS83R6zRE+MM8zCC1CEja7z7bPNXuAVoiqKtdNz6CW4SRrm0d+PmTdczxrpowKGOgK9EWk24yoSg09dtrhddZg=

//1AQAOMTQ5LjE1NC4xNzUuNTIBuw60t6oeAUj74gsNDm85G4J+soWEj+X1mUG/Cqn/f/+C/dfKkOyXjYDFoA989RlCimzks2j8yxUGJRK5ZWz7yC+4V/1nMQiPHLN/cSCsXjIhWTbxjm4E+QglTIROfy91ihq4/z+CTTd1PQVXEepaJzvt+CHAh/gg9yU+qSf7sCq4Db7Ua2R8iHWvnQKOaTSmwWHAn8hZ17RWdUu3e1CCG4qgQhWyiCdnWOn49ZAo+fUhzIXo4XCbSE0XEUs8YXcb443odylLjf4PhhNkAWC3jl3UttvtmmKLq/bdh3q73yTRwMjECVG23z7K4i/ls2anvyXbO00YYxntrMCrJtjdQUE=

//instuser63
//1AQAOMTQ5LjE1NC4xNzUuNTIBu2VYkzS/pYv88QNtZwb6zUVmg1VPE24XebIJVpKAN6zVTX6vBnib//xjDeCRq2pYQygGH5rKavKzB1+6LPzkeCYzNrDDxlvmaVNc8NGGfFtOFhQo8VaM72GRWKocUsZ8kZmGQ/M3CZi6Hu4cIUuPt20HSz6kT1j9B+bUKpzX/yk/pC/b/x4SgI9xSjeB2fYTs1fpBUzlDG/XEPRTtgWsaCFrh99WianPLiWSQaABq7u05UYF/7AK/743hZIypKOu3jIl9TQZRnL2+9MA6ZmlRNQW2UYU0kRscMFN4L62C4JGad0R1bn8M4Mzy61cJZNIl4R8jhJ5Twx2wbaiN3624s8=

//instuser6
//1AQAOMTQ5LjE1NC4xNzUuNTIBu19paYDtDAhVN3BLdtOdorGRyLJdkoDHWFs1bl7qkw0XIN83dW284v8orggRVzn9sSiVsqSjaxTtAj388vj/xkcqbCblaisKQFA/beh7GrT3h3hZg84ZyoPe70U9pPV2jWSQ6iocmGw1I3aPhn1rkXDeCGYOcdp2hrBPdaGJCSI63+sARXP8M1FzVL03w8sO+ukcI9j4xu3PojbGTFQFlCR0wgrbPIV+fW0WAz712rNGEDSxTaFcc0B8r2xZ6C5npNO2++AnKufY3VoWli7Jp6IyMs6OJssc4wh5CKrFuZiuy0sZk2frmS7xqXGZOFw2vdbi9UDizEnYo0Vq3Fw5wpQ=