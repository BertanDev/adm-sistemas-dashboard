import { ChangeEvent } from 'react'
import { Dayjs } from 'dayjs'

interface DateInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: Dayjs
}

export function DateInput({ onChange, value }: DateInputProps) {
  return (
    <div className="relative">
      <input
        type="date"
        className="appearance-none block w-full bg-gray-100 border px-1 py-1 border-gray-300 placeholder-gray-500 text-gray-700 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring focus:ring-blue-200"
        onChange={onChange}
        value={value.format('YYYY-MM-DD')}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
        <svg
          className="h-2 w-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </div>
  )
}
