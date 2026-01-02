"use client";
import { useContext, useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { CustomerContext } from "../../context/CustomerContext";
import {
  CalendarDays,
  CirclePlus,
  Clock8,
  Funnel,
  Loader2,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import CustomerCard from "../../components/customers/CustomerCard";
import axios from "axios";
import { getTokens } from "../../lib/apiClient";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
  const [date, setDate] = useState(new Date());
  const token = getTokens().access;
  const { client, error, loading, listClients } = useContext(CustomerContext);
  const [show, setShow] = useState(false);
  const [quot, setQuot] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteClient, setDeleteClient] = useState(null);

  const handleDeleteClient = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await listClients();
      console.log("client deleted", response.data);
    } catch (error) {
      console.log("Error while deleting customers", error.message);
    }
  };


  useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 60000);
  
      return () => clearInterval(timer);
    }, []);

  return (
    <AppShell>
      <section className="bg-white rounded-2xl shadow-lg min-h-[520px] w-full py-4 px-4 sm:py-6 sm:px-6 lg:px-12">
        <div className="w-full">
          <div className="flex flex-col  gap-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="w-full lg:w-1/2">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-bold">
                  Customers
                </h2>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-right">
                <div className="flex justify-center sm:justify-end items-center flex-wrap gap-3 text-sm sm:text-base text-gray-700">
                  {/* Time */}
                  <div className="flex items-center gap-1">
                    <Clock8 className="w-4 h-4 text-slate-800" />
                    <span className="font-semibold text-slate-800">
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-slate-800" />
                    <span className="font-semibold text-slate-800">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col  ">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between lg:h-15">
                <div className="flex flex-wrap items-center gap-3 lg:h-full"></div>
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedClient(null);
                      setShow(true);
                      setQuot("Add Customer");
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm cursor-pointer"
                  >
                    <CirclePlus className="w-4 h-4" />
                    <span>Add Customer</span>
                  </button>
                </div>
              </div>
              <hr className="border-gray-300 border " />
            </div>
          </div>
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-body ">
              <thead className="text-sm bg-gray-200 border-default-medium">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      disabled
                      className="cursor-not-allowed"
                    />
                  </th>

                  <th className="px-6 py-3 font-medium"> ID</th>
                  <th className="px-6 py-3 font-medium">Client Name</th>
                  <th className="px-6 py-3 font-medium">Client Number</th>
                  <th className="px-6 py-3 font-medium">Company Name</th>
                  <th className="px-6 py-3 font-medium">Phone No.</th>
                  <th className="px-6 py-3 font-medium">Address</th>
                  <th className="px-6 py-3 font-medium">City</th>
                  <th className="px-6 py-3 font-medium">PostCode</th>
                  <th className="px-6 py-3 font-medium">Notes</th>
                  <th className="px-6 py-3 font-medium">Status</th>
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
                  client.map((items, index) => {
                    return (
                      <tr
                        className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium"
                        key={items.id}
                      >
                        <td className="px-4 py-4"></td>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {items.id}
                        </td>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          <a
                            href="#"
                            className="underline decoration-blue-200 decoration-1"
                          >
                            {`${items.first_name}  ${items.last_name}`}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          {items.client_number ?? "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {items.company_name ?? "N/A"}
                        </td>
                        <td className="px-6 py-4">{items.phone ?? "N/A"}</td>
                        <td className="px-6 py-4">{items?.address ?? "N/A"}</td>
                        <td className="px-6 py-4">{items?.city ?? "N/A"}</td>
                        <td className="px-6 py-4">{items?.postcode}</td>
                        <td className="px-6 py-4">{items?.notes ?? "N/A"}</td>
                        <td className="px-6 py-4">{items?.status ?? "N/A"}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center">
                            <Pencil
                              className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => {
                                setSelectedClient(items);
                                setShow(true);
                                setQuot("Edit Customer");
                              }}
                            />
                            <Trash2
                              onClick={() => {
                                setDeleteClient(items.id);
                              }}
                              className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer ml-2"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {deleteClient && (
              <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Confirm Deletion
                  </h2>
                  <p className="mb-4">Are you sure you want to delete ?</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setDeleteClient(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteClient(deleteClient);
                        setDeleteClient(null);
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
          </div>
          {show && (
            <CustomerCard
              show={show}
              setShow={setShow}
              quot={[quot]}
              clientData={selectedClient}
            />
          )}
        </div>
      </section>
    </AppShell>
  );
};

export default page;
