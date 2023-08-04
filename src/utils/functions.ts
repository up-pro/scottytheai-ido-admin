/**
 * Get visible date and time
 * @param datetime Eg: Tue Jan 20 1970 22:21:39 GMT+0900 (Japan Standard Time)
 * @returns Eg:
 */
export const getVisibleDateTime = (datetime: Date): string => {
  const year = datetime.getUTCFullYear();
  const month = datetime.getUTCMonth() + 1;
  const date = datetime.getUTCDate();
  const hours = datetime.getUTCHours();
  const minutes = datetime.getMinutes();
  const seconds = datetime.getSeconds();

  console.log(">>>>>>> year => ", year);
  console.log(">>>>>>> month => ", month);
  console.log(">>>>>>> date => ", date);
  console.log(">>>>>>> hours => ", hours);
  console.log(">>>>>>> minutes => ", minutes);
  console.log(">>>>>>> seconds => ", seconds);

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};
