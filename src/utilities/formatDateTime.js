export default function formatDateTime(timestamp) {
    const date = new Date(timestamp);
  
    // Get date in dd/mm/yyyy format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    // Get time in 12-hour hh:mm AM/PM format
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    // Combine date and time
    const formattedDate = `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes}${period}`;
  
    return formattedDate;
}
