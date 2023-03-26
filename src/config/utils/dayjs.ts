import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);

const relativeDateFormat = (date: string) => dayjs(date).fromNow();
const getTimeInMinutes = (time: string) => {
	let seconds = parseInt(time);
	let min = Math.floor(seconds / 60);
	let secs = seconds - min * 60;
	return `${min}:${secs}`;
};
export { relativeDateFormat, getTimeInMinutes };
