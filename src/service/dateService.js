function isSameDay(dateString) {
    const dateToCheck = new Date(dateString);
    const now = new Date();

    return dateToCheck.getUTCFullYear() === now.getUTCFullYear() &&
        dateToCheck.getUTCMonth() === now.getUTCMonth()+1 &&
        dateToCheck.getUTCDate() === now.getUTCDate();
}


function convertDate(d) {
    const date = new Date(d);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


module.exports = { isSameDay, convertDate }