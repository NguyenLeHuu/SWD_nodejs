function setStatus(data) {
    data.forEach((obj) => {
        obj.status = obj.status.readInt8();
      });
}

module.exports = {
    setStatus: setStatus,
};