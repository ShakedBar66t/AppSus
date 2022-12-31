export const uploadService = {
    readURL,
}

function readURL(inputFiles) {
    const prm = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
            const uploadedFile = reader.result
            resolve(Promise.resolve(uploadedFile))
        }
        reader.readAsDataURL(inputFiles[0])
    })
    console.log('prm', prm)
    return prm
}
