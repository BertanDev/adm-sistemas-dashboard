export function Stafftable() {
  const employees = [
    { nome: 'João Silva', dataAdmissao: '15/01/2022', salario: 5000 },
    { nome: 'Maria Oliveira', dataAdmissao: '20/08/2021', salario: 6000 },
    { nome: 'Pedro Santos', dataAdmissao: '10/02/2023', salario: 5500 },
  ]

  return (
    <div className="flex flex-col">
      <h2 className="text-gray-600 font-bold text-xl">
        Quadro de funcionários
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-6">
        <thead>
          <tr className="bg-gray-200 text-gray-800 font-bold text-left">
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Data de Admissão</th>
            <th className="py-2 px-4 border-b">Salário</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : ''
              } text-gray-600`}
            >
              <td className="py-2 px-4 border-b">{employee.nome}</td>
              <td className="py-2 px-4 border-b">{employee.dataAdmissao}</td>
              <td className="py-2 px-4 border-b">
                R$ {employee.salario.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-400 font-bold mt-4">
        Total salários:
        <span className="text-blue-400 text-lg ml-2">16.500,00</span>
      </p>
    </div>
  )
}
