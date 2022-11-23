const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

export function formatDate(date) {
    const time = date.split("T")[1].slice(0, 5);
    date = date.slice(0, 10).split("-");

    return `${date[2]} ${months[+date[1] - 1]} ${date[0]} в ${time}`;
}
