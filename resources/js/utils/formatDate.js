import moment from "moment"
export default function formatDate(date) {
        const currentDate = moment()
        const messageDate = moment(date)
        if (currentDate.year() != messageDate.year()) {
            return messageDate.format("YYYY-M-D")
        }
        else if (currentDate.month() != messageDate.month() || currentDate.day() != messageDate.day()) {
            return messageDate.format("D MMM")
        }
        else {
            return messageDate.format("HH:mm")
        }

    }