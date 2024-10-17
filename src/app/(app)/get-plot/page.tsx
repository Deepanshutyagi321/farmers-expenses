"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Importing axios
import { useToast } from "@/hooks/use-toast";

const CreatePage = () => {
    const [plots, setPlots] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null); // To track the active menu
    const { toast } = useToast();

    useEffect(() => {
        const getPlots = async () => {
            try {
                const response = await axios.get('/api/get-plot'); // Adjust the endpoint accordingly

                if (response.data.success) {
                    setPlots(response.data.plotes);
                } else {
                    setError(response.data.message);
                }
            } catch (err: any) {
                setError(err.message); // Catch and set error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        getPlots();
    }, []);

    const handleDelete = async (plotId: string) => {
        try {
            const response = await axios.delete(`/api/delete-plot`, { data: { plotId } });
            if (response.data.success) {
                setPlots(plots.filter(plot => plot._id !== plotId)); // Remove the deleted plot from the state
                toast({
                    title: response.data.message,
                    description: "The plot has been deleted successfully.",
                    duration: 2000,
                    variant: "destructive",
                });
            } else {
                setError(response.data.message);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const toggleMenu = (plotId: string) => {
        setActiveMenu(activeMenu === plotId ? null : plotId); // Toggle menu visibility
    };

    // Calculate total costs for all plots
    const totalLabourCost = plots.reduce((acc, plot) => {
        return acc + plot.expenseDetails.reduce((expAcc: any, expense: any) => expAcc + Number(expense.labourCost), 0);
    }, 0);

    const totalPrice = plots.reduce((acc, plot) => {
        return acc + plot.expenseDetails.reduce((expAcc: any, expense: any) => expAcc + Number(expense.price), 0);
    }, 0);

    const totalExpenses = totalLabourCost + totalPrice;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Expense Plots</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 gap-4">
                {plots.length === 0 ? (
                    !loading && <p>No plots found.</p>
                ) : (
                    plots.map((plot) => (
                        <div key={plot._id} className="border p-4 rounded-md shadow relative">
                            <h2 className="text-xl font-semibold">{plot.title}</h2>
                            <p>Created At: {new Date(plot.createdAt).toLocaleString()}</p>
                            <p>Expense Details: {plot.expenseDetails.length} items</p>

                            {/* Three-dot menu for each plot */}
                            <button
                                onClick={() => toggleMenu(plot._id)}
                                className="absolute top-2 right-2 text-gray-600"
                            >
                                &#x22EE; {/* Unicode for vertical ellipsis */}
                            </button>

                            {/* Dropdown menu */}
                            {activeMenu === plot._id && (
                                <div className="absolute top-8 right-2 bg-white border rounded-md shadow-lg z-10">
                                    <button
                                        onClick={() => handleDelete(plot._id)}
                                        className="block px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                        Delete Plot
                                    </button>
                                </div>
                            )}

                            <a href={`/expenses/${plot._id}`} className="block mt-4 text-blue-500">
                                View Plot Details
                            </a>

                            {/* Expense Summary Section */}
                            <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                {plot.expenseDetails.length === 0 ? (
                                    <p className="text-black">No expenses found</p>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold mb-2">Expense Summary:</h3>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Total Labour Cost:</span>
                                            <span className="font-medium">{plot.expenseDetails.reduce(
                                                (acc: any, expense: any) => acc + Number(expense.labourCost), 0
                                            )}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Total Price:</span>
                                            <span className="font-medium">{plot.expenseDetails.reduce(
                                                (acc: any, expense: any) => acc + Number(expense.price), 0
                                            )}</span>
                                        </div>
                                        <div className="flex justify-between font-bold border-t border-gray-300 pt-2 mt-2">
                                            <span>Total Expenses:</span>
                                            <span>{plot.expenseDetails.reduce(
                                                (acc: any, expense: any) => acc + Number(expense.labourCost) + Number(expense.price), 0
                                            )}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Total Costs Section at the Bottom */}
            <div className="mt-6 p-4 bg-blue-500 text-white rounded-md shadow-lg">
                <h2 className="text-xl font-bold">Overall Total Costs</h2>
                <div className="flex justify-between mt-2">
                    <span>Total Labour Cost:</span>
                    <span>{totalLabourCost}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Total Price:</span>
                    <span>{totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-white pt-2 mt-2">
                    <span>Overall Total Expenses:</span>
                    <span>{totalExpenses}</span>
                </div>
            </div>

            <a href="/add-plote">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150">
                    Add New Plot
                </button>
            </a>
        </div>
    );
};

export default CreatePage;
