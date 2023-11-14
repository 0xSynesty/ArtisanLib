export function formatDateString(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Format the date components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Construct the formatted date string
    return `${day}/${month}/${year} à ${hours}h${minutes}`;
}