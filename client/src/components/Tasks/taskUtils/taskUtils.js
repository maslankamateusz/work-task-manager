export const taskColors = [
    { status: "to-do", color: "warning" },
    { status: "planed", color: "secondary" },
    { status: "in-progress", color: "primary" },
    { status: "done", color: "success" },
];

export function getTaskColor(taskStatus) {
    const matchingColor = taskColors.find((item) => item.status === taskStatus);
    return matchingColor ? matchingColor.color : "secondary";
}

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}.${month}`;
}
