/**
 * @description Get the expiry time for a database item.
 */
export function getExpiryTime() {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const seconds = 60;
  return (currentTimeStamp + (seconds * 1000) / 1000).toString();
}
