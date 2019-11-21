module.exports = (balance) =>{
  let balanceReverse = String(balance).split('').reverse().join('')
  let money = ''
  let counter = 0
  for (let i = 0; i < balanceReverse.length; i++) {
      if (counter == 2) {
          counter = 0
          if (i !== balanceReverse.length - 1) {
              money += balanceReverse[i] + '.'
          } else {
              money += balanceReverse[i]
          }
      } else {
          money += balanceReverse[i]
          counter++
      }
  }
  money = 'IDR '+money.split('').reverse().join('')
  return money
}

