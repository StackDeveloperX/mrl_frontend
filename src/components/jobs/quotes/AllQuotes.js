import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { getTokens } from "../../../lib/apiClient";
import { File, Loader2, Pencil, SendHorizontal, Trash2 } from "lucide-react";
import QuotesCard from "./QuotesCard";
import { QuotesContext } from "../../../context/QuotesContext";

const AllQuotes = () => {
  const { quotes, loading, error,fetchQuotes } = useContext(QuotesContext);

  const token = getTokens().access;
  const [popupOpen, setPopupOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  //console.log("token", token);

  const handleDeleteQuote = async (quoteId) => {
    try {
      const response = await axios.delete(
        `http://abc.mrl.local/api/v1/quotes/${quoteId}`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      await fetchQuotes();
      console.log("Quote deleted successfully", response.data);
    } catch (error) {
      console.log("Delete error", error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
      {showCard && (
        <QuotesCard
          setShow={setShowCard}
          show={showCard}
          quot={["Edit Quotes"]}
          selectedQuote={selectedQuote}
          isEdit={isEdit}
          className="transition-discrete"
        />
      )}
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-gray-200 border-default-medium">
          <tr>
            <th className="px-4 py-3 w-10">
              <input type="checkbox" disabled className="cursor-not-allowed" />
            </th>
            <th className="px-6 py-3 font-medium">Quote ID</th>
            <th className="px-6 py-3 font-medium">Client Name</th>
            <th className="px-6 py-3 font-medium">Description</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Sub Total</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
              <td colSpan={6} className="px-6 py-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-700">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
              <td
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
                colSpan="6"
              >
                Error: {error}
              </td>
            </tr>
          ) : (
            quotes.map((quote, index) => {
              return (
                <tr
                  className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium"
                  key={quote.id}
                >
                  <td className="px-4 py-4"></td>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    {quote?.quote_number}
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    <a href="" className="underline">
                      {" "}
                      {quote?.client_first_name}
                    </a>
                  </td>
                  <td className="px-6 py-4">{quote?.description}</td>
                  <td className="px-6 py-4">
                    {quote?.status === "sent" ? (
                      <span className="flex items-center gap-2">
                        <SendHorizontal size={16} className="text-green-500" />
                        Send
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <File size={16} className="text-yellow-400" />
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">{quote?.subtotal}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center">
                      <Pencil
                        className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => {
                          setShowCard(true);
                          setIsEdit(true);
                          setSelectedQuote(quote);
                        }}
                      />
                      <Trash2
                        onClick={() => {
                          setPopupOpen(true);
                        }}
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer ml-2"
                      />
                      {popupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                              Confirm Deletion
                            </h2>
                            <p className="mb-4">
                              Are you sure you want to delete this quote?
                            </p>
                            <div className="flex justify-end gap-4">
                              <button
                                onClick={() => setPopupOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteQuote(quote?.id);
                                  setPopupOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                {" "}
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuotes;
