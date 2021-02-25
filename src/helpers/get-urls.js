export { getSound, getImage }

function getSound(folder, file) {
    const host = 'https://di3xllda87oyr.cloudfront.net'
    const type = 'sounds'
    const extension = '.wav'
    const url = `${host}/${type}/${folder}/${file}${extension}`

    return url
}

function getImage(folder, file) {
    const host = 'https://di3xllda87oyr.cloudfront.net'
    const type = 'images'
    const extension = '.png'
    const url = `${host}/${type}/${folder}/${file}${extension}`

    return url
}
