
function validate(req, res, next) { 
    const { email, password, confirmPassword } = req.body; 
    if(password !== confirmPassword) {
        return res.json({
            message: "Password & confirm password doesn't match"
        })
    } 

    const re = /\S+@\S+\.\S+/;
    const result = re.test(email); 
    if(!result) {
        res.json({ 
            message: "Wrong email"
        }) 
    } 
    
    next(); 
}



module.exports = validate; 