import React, { useState } from 'react';
import axios from 'axios';
import PieChart from '../components/PieChart';

function ProductReview() {
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [showProsCons, setShowProsCons] = useState(false);
    const [showProsConsHeaders, setShowProsConsHeaders] = useState(false);
    const [pros, setPros] = useState([]);
    const [cons, setCons] = useState([]);
    const [summary, setSummary] = useState('');
    const [reviewData, setReviewData] = useState(null); // State to store review data


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowProsCons(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getReviews/`, { url: link });
            setPros(response.data.pros);
            setCons(response.data.cons);
            setSummary(response.data.summary);
            setReviewData({
                Positive: response.data.Positive,
                Negative: response.data.Negative,
                Neutral: response.data.Neutral,
            });
            setLoading(false);
            setShowProsConsHeaders(true);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className={`bg-white p-8 rounded-xl shadow-lg w-screen mx-20 transition-all duration-500 ${showProsCons ? 'max-h-full' : 'max-h-96'}`}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Enter your product review page URL
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 disabled:bg-purple-400 text-white px-4 py-3 rounded-lg mt-6 w-full hover:bg-purple-700 transition duration-300 font-semibold shadow-md"
                        disabled={loading}
                    >
                            <div className="">
                                Submit
                            </div>
                    </button>
                </form>

                {showProsCons && (
                    <div className="mt-6 flex flex-col gap-10">
                        {loading ? (
                            <div className="flex justify-center items-center h-80">
                                <div className="spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex'>
                                {/* Product summary */}
                                <div>
                                {summary && (
                                    <div className="">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Summary</h2>
                                        <p className="text-gray-700">{summary}</p>
                                    </div>
                                )}

                                {/* Pros and cons sections */}
                                <div className="flex gap-10 mt-10">
                                    <div className=" h-80 w-[50%]">
                                        {showProsConsHeaders && (
                                            <>
                                                <h2 className="text-3xl font-bold text-green-600 mb-4">Pros</h2>
                                                <ul className="list-disc list-inside text-green-500 mb-6 overflow-y-scroll h-72">
                                                    {pros.map((pro, index) => (
                                                        <li
                                                            key={index}
                                                            className={`bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full mb-6 my-5 transition-all duration-500 ease-in-out ${showProsConsHeaders ? 'opacity-100' : 'opacity-0'}`}
                                                            style={{ transitionDelay: `${index * 100}ms` }}
                                                        >
                                                            {pro}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>

                                    <div className="h-80 w-[50%]">
                                        {showProsConsHeaders && (
                                            <>
                                                <h2 className="text-3xl font-bold text-red-600 mb-4">Cons</h2>
                                                <ul className="list-disc list-inside text-red-500 overflow-y-scroll h-72">
                                                    {cons.map((con, index) => (
                                                        <li
                                                            key={index}
                                                            className={`bg-gray-100 flex-grow text-black border-l-8 border-red-500 rounded-md px-3 py-2 w-full mb-6 my-5 transition-all duration-500 ease-in-out ${showProsConsHeaders ? 'opacity-100' : 'opacity-0'}`}
                                                            style={{ transitionDelay: `${index * 100}ms` }}
                                                        >
                                                            {con}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>

                                </div>
                                {/* Pie Chart */}
                                {reviewData && <PieChart data={reviewData} />}     
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductReview;