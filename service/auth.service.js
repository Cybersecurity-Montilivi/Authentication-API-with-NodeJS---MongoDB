const login = async (username, password) => {
    //Cercar el user per username
    const user = await User.findOne({ username: username })

    //Comprovar que el password es correcte
    //Retornar la resposta

    return user.verifyPassword(password)
}

module.exports = { login }