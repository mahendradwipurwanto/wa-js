function generateApiKey(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = ''
    let separatorIndex = Math.floor(Math.random() * (length - 1))
    let separator = Math.random() < 0.5 ? '-' : '_'

    for (let i = 0; i < length; i++) {
        if (i === separatorIndex) {
            result += separator
            separator = separator === '-' ? '_' : '-'
        } else {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
    }

    return result
}

export default generateApiKey