module.exports = (req,res,next) => {
    if(req.session.user){
        next()
    }else{
        res.redirect('/login?errors[0]=You must login first')
    }
}