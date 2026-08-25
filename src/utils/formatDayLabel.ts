export function formatDayLabel(day: string): string {
  if (day === "today") {
    return "Today";
  }

  if (day === "tomorrow") {
    return "Tomorrow";
  }

  if (day === "3-days") {
    return "3 Days";
  }

  if (day === "7-days") {
    return "7 Days";
  }

  return day;
}
