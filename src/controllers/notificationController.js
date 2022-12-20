const moment = require("moment")
const Notification = require("../models/notification")


// ADD_BOOKING_NOTIFICATION

exports.addNotification = async(req, res) => {
    try {
        const cnotification = `your course is successfully saved  ${moment().format('DD-MM-YYYY')}`
        const notification = new Notification()
        notification.notification = cnotification
        notification.user = req.body.userId;
        notification.save()
        return res.status(200).json({ msg: "notification saved" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET_BOOKING_NOTIFICATION

exports.getNotification = async(req, res) => {
    try {
        const getNotification = await Notification.find({ user: req.params.userId })
        return res.status(200).json({ msg: "notification getted", getNotification })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// DELETE_BOOKING_NOTIFICATION

exports.deletenotification = async(req, res) => {
    try {
        const deletenotification = await Notification.findByIdAndDelete({ req: req.params.id })
        return res.status(200).json({ msg: "notification deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "something went wrong" })
    }
}