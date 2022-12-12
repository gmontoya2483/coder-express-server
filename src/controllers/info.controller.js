import {InfoService} from "../services/info.service.js";
const infoService = new InfoService();

export const renderInfo = async (req, res) => {
    const { email: username } = await req.user;
    const info = infoService.getInfo();
    return res.render('info', {info, username});
}
