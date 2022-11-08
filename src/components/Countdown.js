import { useState } from "react";
import { useInterval } from "react-use";
import getUnixTime from "date-fns/getUnixTime";

const now = getUnixTime(new Date());
const launchDate = (date) => getUnixTime(new Date(date));

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + " D : " : "";
  const hDisplay = h > 0 ? h + " H : " : "";
  const mDisplay = m > 0 ? m + " M : " : "";
  const sDisplay = s > 0 ? s : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}


const Countdown = ({ date }) => {
  const result = launchDate(date) - now;

  const [count, setCount] = useState(result);

  useInterval(
    () => {
      setCount(count - 1);
    },
    count > 0 ? 1000 : null
  );

  return <h1 suppressHydrationWarning>{secondsToDhms(count)}</h1>;
};

export default Countdown;
