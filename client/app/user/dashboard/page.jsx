// components/CenteredLinks.js

import Link from 'next/link';

const CenteredLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded shadow-lg p-8">
        <Link legacyBehavior href="/user/createloan" >
          <a className="block text-center text-xl px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-white shadow-md">
            Create Loan
          </a>
        </Link>
        <Link legacyBehavior href="/user/viewloans" >
          <a className="block text-center text-xl px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hover:text-white shadow-md">
            View Loans
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CenteredLinks;
