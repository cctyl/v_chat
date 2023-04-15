
function getIp(req) {
    let ipstr = req.socket.remoteAddress
    let split = ipstr.split(':');
    return split[split.length-1]
}

module.exports = {
    getIp
}
