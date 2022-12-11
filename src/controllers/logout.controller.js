
export const renderLogout = async (req, res) => {
    const { email: username } = await req.user;
    req.session.destroy( err =>{
        res.render('logout', {username})
    })
}
