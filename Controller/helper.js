function filterUser(usr) {
    if (!Array.isArray(usr)) {
        return {
            email: usr.email,
            firstName: usr.firstName,
            lastName: usr.lastName,
        };
    }
    return usr.map((e) => {
        return {
            email: e.email,
            firstName: e.firstName,
            lastName: e.lastName,
        };
    });
}
module.exports = { filterUser };
