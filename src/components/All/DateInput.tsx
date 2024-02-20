import { ChangeEvent } from "react";
import { Dayjs } from "dayjs";

interface DateInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: Dayjs;
}

export function DateInput({ onChange, value }: DateInputProps) {
  return (
    <div className="relative">
      <input
        type="date"
        className="appearance-none block w-full bg-gray-100 border border-gray-300 py-2 px-4 placeholder-gray-500 text-gray-700 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring focus:ring-blue-200"
        onChange={onChange}
        value={value.format("YYYY-MM-DD")}
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v14m0-7l-3-3m3 3l3-3"
          ></path>
        </svg>
      </div>
    </div>
  );
}
