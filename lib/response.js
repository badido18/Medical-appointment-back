function success(message, data) {
    return data
}

function error(message) {
    return {
        message,
        data: null,
        isError: true
    }
}

module.exports = {
    success, error
}