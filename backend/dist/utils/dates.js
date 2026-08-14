export function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 = domingo
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // começa na segunda
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
export function endOfWeek(date) {
    const start = startOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}
export function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}
export function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}
//# sourceMappingURL=dates.js.map