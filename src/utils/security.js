import bcrypt from "bcrypt";

export const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const validateHash = async (text, hashedText) => {
    return await bcrypt.compare(text, hashedText);
}
