import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthYaerSelectProps {
    month: number;
    year: number;
    onMonthChange: (month: number) => void;
    onYaerChange: (yaer: number) => void;
}

const monthNames: readonly string[] =[
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const MonthYaerSelect = ({month, onMonthChange, onYaerChange, year}:MonthYaerSelectProps) => {

    const currentYear = new Date().getFullYear();
    const yaers: number[] = Array.from({length: 11}, (_, i) => currentYear - 5 + i)

    const handleNextMonth = ():void => {
        if(month === 12){
            onMonthChange(1);
            onYaerChange(year + 1);
        }else{
            onMonthChange(month + 1);
        }
    }

      const handlePrevMonth = ():void =>{
        if(month === 1){
            onMonthChange(12);
            onYaerChange(year - 1);
        }else{
            onMonthChange(month - 1);
        }
    }

    return (
        <div className='flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700'>
            <button type='button' 
            className='p-2 rounded-full hover:gb-gray-800 hover:text-primary-500 transition-colors cursor-pointer'
            aria-label='Mês Anterior' onClick={handlePrevMonth}>
                <ChevronLeft />
            </button>

            <div className='flex gap-4'>
                <label htmlFor='' className='sr-only'>Selecionar Mês</label>
                <select id="month-select" value={month} onChange={(event) => onMonthChange(Number(event.target.value))} className='bg-gray-800 border border-gray-700 rounded-md py1 px-3 text-sm font-medium text-fray-100 focus: outline-none focus:ring-2 focus: ring-primary-500 cursor-pointer'>
                    {monthNames.map((name, index) => (
                        <option key={name} value={index + 1}>{name}</option>
                    ))};
                </select>

                 <label htmlFor='' className='sr-only'>Selecionar Ano</label>
                <select id="year-select" value={year} onChange={(event) => onYaerChange(Number(event.target.value))}  className='bg-gray-800 border border-gray-700 rounded-md py1 px-3 text-sm font-medium text-fray-100 focus: outline-none focus:ring-2 focus: ring-primary-500 cursor-pointer'>
                    {yaers.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))};
                </select>
            </div>
            <button type='button' 
            className='p-2 rounded-full hover:gb-gray-800 hover:text-primary-500 transition-colors cursor-pointer'
            aria-label='Proximo Mês' onClick={handleNextMonth}>
                <ChevronRight />
            </button>
        </div> 
    );
};

export default MonthYaerSelect;