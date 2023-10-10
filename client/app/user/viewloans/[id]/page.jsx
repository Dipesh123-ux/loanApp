"use client"
import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '@/actions/authContext';

const Page = ({ params }) => {
    const [repayments, setRepayments] = useState([]);
    const { getRepaymentsByLoanId, makeRepayment } = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(0);
    const modalRef = useRef(null);

    async function fetchRepayments() {
        const res = await getRepaymentsByLoanId(params.id);
        setRepayments(res);
    }
    useEffect(() => {
        fetchRepayments();
    }, [params.id]);

    const hasPendingRepayments = repayments.some((repayment) => repayment.status === 'PENDING');



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    };

    const openModal = () => {
        if (hasPendingRepayments) {
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        const pendingRepaymentAmounts = repayments
            .filter((repayment) => repayment.status === 'PENDING')
            .map((repayment) => parseFloat(repayment.amount));

        const balance = pendingRepaymentAmounts.reduce((acc, amount) => acc + amount, 0);
        setRemainingBalance(balance);
    }, [repayments]);

    const closeModal = () => {
        setIsModalOpen(false);
        setPaymentAmount('');
    };

    const handlePaymentSubmit = async () => {
        const isValidAmount = repayments.some((repayment) => parseFloat(paymentAmount) >= repayment.amount);

        if (isValidAmount) {
            const res = await makeRepayment({ amount: paymentAmount, loanId: params.id });
            fetchRepayments()
            closeModal();
        } else {
            console.log('Invalid payment amount.');
        }
    };

    return (
        <div className="p-4">
            {hasPendingRepayments && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                    onClick={openModal}
                >
                    Pay Now
                </button>
            )}

            <h1>Remaining Balance: ${remainingBalance.toFixed(2)}</h1>

            <table className="mt-4 w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">outstanding</th>
                        <th className="border px-4 py-2">Due Date</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {repayments.map((repayment, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center">{repayment.totalAmount}</td>
                            <td className="border px-4 py-2 text-center">{repayment.amount}</td>
                            <td className="border px-4 py-2 text-center">{formatDate(repayment.date)}</td>
                            <td className={`border px-4 py-2 text-center ${repayment.status === 'PENDING' ? 'text-red-500' : 'text-green-500'}`}>
                                {repayment.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
                    <div className="modal relative bg-white p-4 rounded shadow-lg" ref={modalRef}>
                        <span className="modal-close absolute top-0 right-0 mt-2 mr-2 cursor-pointer" onClick={closeModal}>
                            &times;
                        </span>
                        <h2 className="text-lg font-bold mb-4">Make Payment</h2>
                        <label className="block mb-2">
                            Payment Amount:
                            <input
                                type="number"
                                className="border rounded py-2 px-3 w-full"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                            />
                        </label>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-2"
                            onClick={handlePaymentSubmit}
                        >
                            Make Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;

