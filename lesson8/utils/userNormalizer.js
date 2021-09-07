module.exports = (userToNormalize, customToRemove = []) => {
    console.log(customToRemove);
    const defaultToRemove = ['password', '__v'];

    const normalizedUser = userToNormalize.toObject();

    [...defaultToRemove, ...customToRemove].forEach((key) => { delete normalizedUser[key]; });

    return normalizedUser;
};
