"use client";

import {
  CalendarDays,
  Clock8,
  CirclePlus,
  Funnel,
  Search,
  NotepadText,
  User,
  MailOpen,
  File,
  Shield,
  KeyRound,
  UsersIcon,
  UserCog,
  NotebookPen,
  NotebookTabs,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getTokens } from "../../../lib/apiClient";
import QuotesCard from "../../../components/quotes/QuotesCard";
import { AppShell } from "../../../components/layout/AppShell";
import { InnerSidebar } from "../../../components/layout/InnerSidebar";
import { SendHorizontal } from "lucide-react";
import axios from "axios";

const page = () => {
  const [showCard, setShowCard] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getTokens().access;
  console.log("token", token);
  const fetchQuotes = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get("http://abc.mrl.local/api/v1/quotes", {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      console.log("quotes", response.data);
      setQuotes(response.data.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const iconItems = [
    { id: "create", label: "Create Quotes", icon: NotebookPen },
    { id: "quote", label: "All Quotes", icon: NotebookTabs },
    { id: "job", label: "All Jobes", icon: UserPen  },
  ];
  return (
    <AppShell>
      <div className="w-full flex flex-row gap-2">
        <InnerSidebar title="jobs" iconItems={iconItems} />
        <section className="bg-white rounded-2xl shadow-lg min-h-[91vh] w-full py-4 px-4 sm:py-6 sm:px-6 lg:px-12">
          <div className="w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="w-full lg:w-1/2">
                  <h2 className="text-slate-800 text-xl sm:text-2xl font-bold">
                    Quotes
                  </h2>
                </div>

                <div className="w-full lg:w-1/2 text-center lg:text-right">
                  <div className="flex justify-center sm:justify-end items-center flex-wrap gap-3 text-sm sm:text-base text-gray-700">
                    <div className="flex items-center gap-1">
                      <Clock8 className="w-4 h-4 text-slate-700" />
                      <span className="font-semibold text-slate-800">
                        11:11:17 am
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4 text-slate-700" />
                      <span className="font-semibold text-slate-800">
                        Monday, Dec 1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* new div */}
              <div className="flex flex-col ">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between lg:h-15">
                  <div className="flex flex-wrap items-center gap-3 h-full ">
                    <a className="inline-flex items-center gap-2 bg-[#00b2a9] px-3 py-1 rounded-t-xl font-bold text-slate-800 text-lg sm:text-xl  lg:h-full ">
                      <NotepadText className="w-6 h-6" />
                      <span>All Quotes</span>
                    </a>

                    <a
                      href="/admin/jobs"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 lg:h-full"
                    >
                      <div className="relative w-6 h-6">
                        <User className="w-6 h-6 text-slate-800" />

                        <MailOpen className="w-3 h-3 text-slate-800 absolute -bottom-1 -right-1" />
                      </div>

                      <span className="font-bold text-slate-800 text-lg sm:text-xl">
                        All Jobs
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-52">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <div className="relative w-full sm:w-44">
                      <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                      <select className=" w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-gray-400">
                        <option value="">Filter by Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <button
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm cursor-pointer"
                      onClick={() => {
                        setShowCard(true);
                      }}
                    >
                      <CirclePlus className="w-4 h-4" />
                      <span>Add Quotes</span>
                    </button>
                  </div>
                </div>
                <hr className="border-gray-300 border " />
              </div>
            </div>

            {showCard && (
              <QuotesCard
                setShow={setShowCard}
                show={showCard}
                quotes={["Add Quotes"]}
                className="transition-discrete"
              />
            )}

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-gray-200 border-default-medium">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        disabled
                        className="cursor-not-allowed"
                      />
                    </th>
                    <th className="px-6 py-3 font-medium">Quote ID</th>
                    <th className="px-6 py-3 font-medium">Client Name</th>
                    <th className="px-6 py-3 font-medium">Description</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Sub Total</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                      <td
                        className="px-6 py-4 font-medium whitespace-nowrap text-center"
                        colSpan="6"
                      >
                        Loading...
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
                          key={index}
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
                            {quote?.status === "draft" ? (
                              <span className="flex items-center gap-2">
                                <SendHorizontal
                                  size={16}
                                  className="text-green-500"
                                />
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
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
};

export default page;
