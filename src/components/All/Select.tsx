'use client'

import { ChangeEvent } from 'react'

interface SelectProps {
  options: {
    value: number
    label: string
  }[]
  placeholder: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value: number
}

export const Select = ({
  options,
  placeholder,
  onChange,
  value,
}: SelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  )
}
