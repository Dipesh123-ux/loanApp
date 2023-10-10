"use client"
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Link from 'next/link'


const page = () => {
    const [loans, setLoans] = useState([]);
    const { getLoansByUserId } = useContext(AuthContext);

    let user;

    if (typeof localStorage !== 'undefined') {
        user = JSON.parse(localStorage.getItem('user'));
    }

    async function getLoans() {
        const res = await getLoansByUserId(user._id);
        console.log(res);
        setLoans(res);
    }

    useEffect(() => {
        getLoans();
    }, []);
    return (
        <div className='mt-5'> <h2 className="text-2xl mb-4">Your Loans</h2>
            <ul>
                {loans.map((loan) => (
                    <li
                        key={loan._id}
                        className="bg-white rounded p-4 shadow-md mb-4 flex items-center justify-between m-5"
                    >
                        <div>
                            <p>
                                <strong>Amount:</strong> ${loan.amount}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Term:</strong> {loan.term} weeks
                            </p>
                        </div>
                        <div>
                            {loan.state === 'PENDING' && (
                                <>
                                    <button
                                        className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
                                        disabled={true}
                                    >
                                        PENDING
                                    </button>

                                </>
                            )}
                            {loan.state === 'APPROVED' && (
                                <Link href={`/user/viewloans/${loan._id}`} className="text-white px-2 py-1 rounded cursor-pointer bg-green-500">Approved</Link>
                            )}
                            {loan.state === 'PAID' && (
                                <p className="text-blue-500">Paid</p>
                            )}
                            {loan.state === 'REJECT' && (
                                <p className="text-white px-2 py-1 rounded  bg-red-500">Rejected</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul></div>
    )
}

export default page