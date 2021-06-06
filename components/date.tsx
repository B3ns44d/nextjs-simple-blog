import { parseISO, format } from "date-fns";

type DateProps = {
  dateString: string;
};

export const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy/MM/dd")}</time>;
};
