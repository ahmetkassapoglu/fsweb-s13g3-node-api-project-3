const userModel = require("../users/users-model")
function logger(req, res, next) {
  let time = new Date().toLocaleString
  let method = ""
  let url = ""
  console.log(`${time} - ${method} - ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    let existUser = await userModel.getById(req.params.id);
    if (!existUser){
      res.status(404).json({message:"kullanıcı bulunamadı"})
    }
    else {
      req.currentUser = existUser
      next();
    }
  } catch (error) {
    next(error)
  }

}

function validateUser(req, res, next) {
  try {
    let {name} = req.body
  if (!name){
    res.status(400).json({message:"gerekli name alanı eksik"})
  }
  else{
    next();
  }
  } catch (error) {
    next();
  }
}

function validatePost(req, res, next) {
  try {
    let text = req.body.text;
    if (!text){
      res.status(400).json({message:"gerekli text alanı eksik"})
    }
    else {
      next();
    }
  } catch (error) {
    next(error)
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  validateUserId,
  validateUser,
  validatePost
}