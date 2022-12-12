
export const renderChat = async (req, res) => {
    const { email: username } = await req.user;
    res.render('chat', {username} )
}
