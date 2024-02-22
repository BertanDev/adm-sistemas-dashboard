'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { DateInput } from '../All/DateInput'
import { Select } from '../All/Select'
import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import { AllGroupsProfit } from './graphics/all-groups-profit'
import dayjs, { Dayjs } from 'dayjs'

export function ProfitGroupProducts() {
  const [productGroups, setProductGroups] = useState<
    Array<{ value: number; label: string }>
  >([])
  const [currentGroup, setCurrentGroup] = useState(0)
  const [initialDate, setInitialDate] = useState<Dayjs>(
    dayjs().subtract(30, 'day'),
  )
  const [finishDate, setFinishDate] = useState<Dayjs>(dayjs())

  const token = getAuthTokenClient()

  const toggleGroup = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentGroup(Number(e.target.value))
  }

  const handleChangeInitialDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setInitialDate(selectedDate)
  }

  const handleChangeFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setFinishDate(selectedDate)
  }

  useEffect(() => {
    async function getGroups() {
      const response = await api.get('/get-all-goups-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { data } = response

      const newArray = data.map((item: { CODI: number; DESCR: string }) => {
        return {
          value: item.CODI,
          label: item.DESCR,
        }
      })

      setProductGroups(newArray)
    }

    getGroups()
  }, [])

  useEffect(() => {
    const today = dayjs()
    const todayLess30days = today.subtract(30, 'day')
    setInitialDate(todayLess30days)
    setFinishDate(today)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-600 font-semibold text-xl">
        Lucro por grupo de produtos
      </h2>
      <div className="flex items-center gap-4">
        <DateInput onChange={handleChangeInitialDate} value={initialDate} />
        <DateInput onChange={handleChangeFinishDate} value={finishDate} />
        <Select
          placeholder="Todos os grupos"
          options={productGroups}
          value={currentGroup}
          onChange={toggleGroup}
        />
      </div>
      <AllGroupsProfit initialDate={initialDate} finishDate={finishDate} />
    </div>
  )
}
