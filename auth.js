//json web token
  // sign - function that creates a token
  // verify - funciton that checks if there's presence of token
  // decode - function that decodes the token

  const jwt = require('jsonwebtoken');
  const secret = "secret"

  module.exports.createAccessToken = (user) => {

    const data = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    }
    // jwt.sign(payload, secret, {options})
    return jwt.sign(data, secret, {});
  }

  module.exports.decode = (token) => {
   

    let slicedToken = token.slice(7, token.length)

    //console.log(slicedToken)

    return (jwt.decode(slicedToken, {complete:false}))
    
  }

  module.exports.verify = (req,res,next) => {
    let token = req.headers.authorization
    //console.log(token)

    //jwt.verify(token, secret, function)
    if(typeof token !== "undefined"){
      let slicedToken = token.slice(7, token.length)
      return jwt.verify(slicedToken, secret, (err,data)=>{
        if(err){
          res.send({auth:"failed"})
        }else{
          next()
        }
      })
    }else{
      return res.send({auth:"no token"})
    }


  }