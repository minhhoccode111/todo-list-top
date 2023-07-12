import { parseISO, format, isBefore } from 'date-fns';

////////// functions to use data-fns library \\\\\\\\\\
export const now = () => {
  const date = format(new Date(), 'yyyy-MM-dd');
  const time = format(new Date(), 'HH:mm:ss');
  return `${date} ${time}`;
};

export const today = () => format(new Date(), 'yyyy-MM-dd');

export const checkExpired = (dueDate) => {
  if (!dueDate) return false; // If dueDate is empty or falsy, return false
  return isBefore(parseISO(dueDate), new Date());
};
