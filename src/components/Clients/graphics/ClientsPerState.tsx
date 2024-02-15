'use client'

import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ClientsPerState() {
    const [states, setStates] = useState<Array<{TOTAL_REGISTROS: number, UF: string}>>([])
    
    const token = getAuthTokenClient()

    useEffect(() => {
        async function getData() {
            const response = await api.get('/count-clients-per-state', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setStates(response.data)
        }

        getData()
    }, [])

    const total = states.map(item => item.TOTAL_REGISTROS);
    const ufs = states.map(item => `${item.UF} - ${item.TOTAL_REGISTROS}`);

    return (
        <div className='text-gray-700 text-base'>
            <Chart 
            options={{
                chart: {
                type: 'pie',
                },
                title: {
                    text: 'Clientes por estado',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                    fontSize:  '16px',
                    fontWeight:  'bold',
                    fontFamily:  undefined,
                    color:  ''
                    },
                },
                dataLabels: {
                enabled: true,
                },
                labels: ufs,
                grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 370
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }]
            }}
            series={total}
            type="pie"
            width={450}
            height={450}
            />
        </div>
    )
}