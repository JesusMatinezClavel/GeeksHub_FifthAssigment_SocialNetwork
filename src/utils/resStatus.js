
// Function to throw a Response in the Catch
export const catchStatus = (res, message,error) => {
    res.status(500).json({
        success: false,
        message: message,
        error: error.message
    })
}


// Function to throw a Response in the Try
export const tryStatus = (res, message, result) => {
    res.status(200).json({
        success: true,
        message: message,
        data: result
    })
}