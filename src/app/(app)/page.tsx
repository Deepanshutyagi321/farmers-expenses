'use client';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Header */}
      {/* <header className="bg-green-700 py-6 shadow-md">
        <h1 className="text-5xl font-bold text-center text-white">Farmers Expense Tracker</h1>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <section className="max-w-2xl mt-2">
          <h2 className="text-4xl font-semibold mb-6">Save Daily Expenses with Plot Management</h2>
          <p className="text-lg text-gray-700 mb-12">
            Our platform helps farmers track and optimize their daily expenses by managing them on a per-plot basis. From seed purchases to fertilizer usage, keep everything organized and make smarter decisions to improve farm productivity and save money.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mb-12">
          {/* Feature 1 */}
          <article className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Track Daily Expenses</h3>
            <p className="text-gray-600">Input your daily expenses for each plot and maintain a comprehensive record of your costs.</p>
          </article>

          {/* Feature 2 */}
          <article className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Visualize Plot Data</h3>
            <p className="text-gray-600">Gain insights into your plots expenses, allowing you to see where your money is being spent and identify areas for cost-saving.</p>
          </article>

          {/* Feature 3 */}
          <article className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Optimize Resources</h3>
            <p className="text-gray-600">Use data-driven insights to make informed decisions on seed, fertilizer, and labor usage, improving efficiency and reducing waste.</p>
          </article>
        </section>

        {/* Call to Action */}
        <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-white mt-2">
        <p>&copy; 2024 Farmers Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
