export const uploadService = {
    readURL,
}

function readURL(inputFiles) {
    const prm = new Promise((resolve) => {
        const reader = new FileReader()
        console.log(reader)
        reader.onload = () => {
            const uploadedFile = reader.result
            console.log(uploadedFile)
            resolve(Promise.resolve(uploadedFile))
        }
        reader.readAsDataURL(inputFiles[0])
    })
    console.log('prm', prm)
    return prm
}
