import React from "react";

const Dashboard: React.FC = () => {
  return (
    <section className="w-full h-[92dvh]">
      <div className="max-w-xl  mx-auto p-4  md:p-6 lg:p-12 bg-white rounded shadow-md">
        <p className="text-lg text-gray-600">Welcome to your dashboard</p>
        <p className="text-lg text-gray-600">
          This is where you'll see your personalized dashboard
        </p>
        <p className="text-lg text-gray-600">
          Feel free to customize this component as needed
        </p>
        <p className="text-lg text-gray-600">Enjoy your stay!</p>
      </div>
    </section>
  );
};

export default Dashboard;
