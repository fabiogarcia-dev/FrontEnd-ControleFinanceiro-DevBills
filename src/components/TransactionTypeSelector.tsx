import { TransactionType } from "../types/transactions";


interface TransactionTypeSelectorProps {
    value: TransactionType;
    id?: string;
    onChange: (type: TransactionType) => void;   // Define any props if needed in the future
};


const TransactionTypeSelector = ({value, onChange, id}:TransactionTypeSelectorProps) => {
    const transactionTypeButtons =[
        {
            type: TransactionType.EXPENSE,
            label: "Despesas",
            activeClasses: 'bg-red-500 border-red-500 text-red-700 font-medium',
            inativeClasses: 'bg-transparent border-red-300 text-red-500 hover:gb-red-50',
        },
        {
            type: TransactionType.INCOME,
            label: "Receitas",
            activeClasses: 'bg-green-500 border-green-500 text-green-700 font-medium',
            inativeClasses: 'bg-transparent border-green-300 text-green-500 hover:gb-green-50',
        }
    ]
    return(
        <fieldset id={id} className="grid grid-cols-2 gap-4"> {/**/}
            {transactionTypeButtons.map(item => (
                <button key={item.type} type="button" onClick={()=> onChange(item.type)} 
                className={`cursor-pointer flex items-center justify-center border rouded-md py-2 px-2 transition-all
                ${value===item.type ? item.activeClasses : item.inativeClasses}
                `}>
                    {item.label}
                </button>
            ))}
        </fieldset>
    );
};

export default TransactionTypeSelector;