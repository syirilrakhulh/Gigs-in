module.exports = () =>{
    let password = ''
    for(let i = 0;i< 8 ;i++){
        if(i % 2 === 0){
            const character = Math.floor(Math.random()*10)
            password += character
        }else{
            const character = String.fromCharCode(Math.floor(Math.random()*26)+65)
            password += character
        }
    }
    return password
  }