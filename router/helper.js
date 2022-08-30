// function gError(func) {
//     return async (req, res) => {
//         try {
//             await func(req, res);
//         } catch (e) {
//             console.error(e);
//         }
//     };
// }

function gError(func) {
    // Global Error Handling !
    return (req, res, next) => {
        func(req, res).catch((e) => {
            console.log('Global Error : ', e);
            res.status(400).json(e); // 把 error 也 send 回去？
        });
    };
}

module.exports = gError;
