import { catchStatus } from "../utils/resStatus.js"

export const isSuperadmin = (req, res, next) => {
    try {
        const role = req.tokenData.roleName
        if (role !== 'superadmin') {
            return res.status(400).json({
                success: false,
                message: `You don't have the necessary permits!`
            })
        }
        next()
    } catch (error) {
        catchStatus(res, 'UNNAUTHORIZE ACCES!', error)
    }
}