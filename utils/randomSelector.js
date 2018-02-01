/**
 *
 * @param {*array} randomGreetings
 */
exports.ban = (e, b) => {
  let banMessages = [
    `${b.username} was banned.`,
    `${b.username} banned 2`

  ]
  return randomize(banMessages)
}

function randomize (randomGreetings) {
  let randomNumber = Math.floor(Math.random() * randomGreetings.length)
  let greetings = randomGreetings[randomNumber]
  return greetings
}
