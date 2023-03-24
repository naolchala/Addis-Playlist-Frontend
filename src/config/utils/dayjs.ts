import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const relativeDateFormat = (date: string) => dayjs(date).fromNow();

export { relativeDateFormat };
