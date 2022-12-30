export const uploadService = {
    readURL,
}

function readURL(inputFiles) {
    const prm = new Promise((resolve) => {
        const reader = new FileReader()
        console.log(reader)
        reader.onload = () => {
            const uploadedFile = reader.result
            resolve(Promise.resolve(uploadedFile))
        }
        console.log(inputFiles[0])
        reader.readAsDataURL(inputFiles[0])
    })
    return prm
}
