"use client"
import { useState,useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [term, setTerm] = useState('');
    const [installments, setInstallments] = useState([]);
    const [showPayments, setShowPayments] = useState(false);
    const {createLoan,user} = useContext(AuthContext);
    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const handleApply = async ()=>{
        try{
            setLoading(true);
           const response = await createLoan({amount:loanAmount,term,repayments:installments,userId:user._id});
           router.push('/user/dashboard');
           setLoading(false);
        }
        catch{
            
        }
    }


    const calculateInstallments = () => {
        if (!loanAmount || !term) {
            return;
        }

        const loanAmountFloat = parseFloat(loanAmount);
        const termInt = parseInt(term);
        const weeklyInstallment = Math.floor(loanAmountFloat / termInt);

        const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
        const currentDate = new Date();
        const installmentsData = [];

        for (let i = 1; i <= termInt; i++) {
            const installment = {
                date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
                amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(2),
            };
            installmentsData.push(installment);
        }

        setInstallments(installmentsData);
        setShowPayments(true);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

        return `${day}/${month}/${year}`;
    };

    if(loading){
        return <Loader color="rgba(0,0,0,0.6)" />
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-[75vh]">
                <div className="w-1/2 border p-4 rounded shadow-md items-center flex flex-col mx-8">
                    <div className="mb-4">
                        <label className="block mb-2">Loan Amount:</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Term (in weeks):</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={calculateInstallments}
                    >
                        Calculate
                    </button>
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-2xl mb-4">Scheduled Repayments:</h2>
                    {showPayments ? (
                        <div className="h-[300px] overflow-y-auto">
                            <ul>
                                {installments.map((installment, index) => (
                                    <li
                                        key={index}
                                        className="border p-2 mb-2 rounded shadow-md"
                                    >
                                        {`Week ${index + 1}: ${formatDate(installment.date)} - $${installment.amount}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-lg text-gray-500">
                            Click 'Calculate' to calculate the scheduled payments
                        </p>
                    )}
                </div>
            </div>
            <button onClick={handleApply} className="cursor-pointer w-40 h-10 text-center mx-auto bg-blue-500 flex items-center justify-center text-white">Apply</button>
        </>
    );
};

export default LoanCalculator;
