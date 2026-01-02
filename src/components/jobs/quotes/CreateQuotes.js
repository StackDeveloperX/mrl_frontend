"use client";
import axios from "axios";
import { CalendarDays, Clock8, Search } from "lucide-react";
import { getTokens } from "../../../lib/apiClient";
import { useContext, useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { CustomerContext } from "../../../context/CustomerContext";
import { QuotesContext } from "../../../context/QuotesContext";

const CreateQuotes = () => {
  const token = getTokens().access;
  const { fetchQuotes } = useContext(QuotesContext);
  const [date, setDate] = useState(new Date());
  const { client } = useContext(CustomerContext);
  const [customer, setCustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [quotes, setQuotes] = useState({
    client_id: Number(selectedCustomer?.id),
    branch_id: 1,
    service_package_id: 1,
    title: "",
    description: "",
    service_type: "",
    service_data: {
      pickup_unit: "",
      pickup_street_address: "",
      pickup_suburb: "",
      pickup_state: "",
      pickup_postal_code: "",
      pickup_instructions: "",
      dropoff_unit: "",
      dropoff_street_address: "",
      dropoff_suburb: "",
      dropoff_state: "",
      dropoff_postal_code: "",
    },
    assigned_to: 1,
    tax_rate: 10,
    discount_amount: 0,
    valid_until: "",
    internal_notes: "",
    client_notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in quotes.service_data) {
      setQuotes((prev) => ({
        ...prev,
        service_data: {
          ...prev.service_data,
          [name]: value,
        },
      }));
    } else {
      setQuotes((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const filteredClient = client.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
      return fullName.includes(customer.toLowerCase());
    });

    setFilterCustomer(filteredClient);
  }, [client, customer]);

  useEffect(() => {
    if (selectedCustomer?.id) {
      setQuotes((prev) => ({
        ...prev,
        client_id: Number(selectedCustomer.id),
        // assigned_to: Number(selectedCustomer.id),
        // service_package_id: Number(selectedCustomer.id),
      }));
    }
  }, [selectedCustomer]);

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/quotes`, quotes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchQuotes();
    } catch (err) {
      console.error(
        "Error creating quote:",
        err.response?.data?.message || err.message
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-lg h-auto w-full  py-4 px-4 sm:py-6 sm:px-6 lg:px-12">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
          <div className="w-full lg:w-1/2">
            <h2 className="text-slate-800 text-xl sm:text-2xl font-bold lg:font-bold">
              Create Quotes
            </h2>
          </div>

          <div className="w-full lg:w-1/2 lg:text-right">
            <h4 className="text-gray-700 text-sm sm:text-base">
              <div className=" flex justify-center lg:justify-end  sm:justify-end items-center gap-1">
                <i className="fa-regular fa-clock">
                  <Clock8 />
                </i>
                <span className="font-semibold text-slate-800 ml-2">
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <i className="fa-regular  fa-calendar-days ml-2 lg:ml-0">
                  <CalendarDays />
                </i>
                <span className="font-semibold text-slate-800 ml-2">
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </h4>
          </div>
        </div>

        <hr className="mt-4 border-gray-300" />

        <form onSubmit={handleCreateQuote}>
          <div className="mt-6 lg:mt-10 w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
            {/* LEFT COLUMN - Customer Details */}
            <div className="flex flex-col gap-6 bg-blue-50 p-4 sm:p-6 rounded-xl lg:w-1/3 xl:w-96 h-160">
              <h2 className="font-bold bg-[#17466933] text-2xl text-[#1A2B4C] p-4 rounded-xl  ">
                Customer Details
              </h2>

              <div className="flex flex-col relative w-full">
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Search Client
                </label>
                <input
                  type="text"
                  placeholder="Search Client"
                  value={customer}
                  onChange={(event) => setCustomer(event.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1"
                />
                {customer.trim() && (
                  <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                    {filterCustomer.length > 0
                      ? filterCustomer.map((item) => (
                          <li
                            key={item._id}
                            className="px-4 py-2 text-sm cursor-pointer hover:bg-emerald-100"
                            onClick={() => {
                              setSelectedCustomer(item);
                              setCustomer(
                                `${item.first_name} ${item.last_name}`
                              );
                              setFilterCustomer([]);
                            }}
                          >
                            {item.first_name} {item.last_name} {item.id}
                          </li>
                        ))
                      : ""}
                  </ul>
                )}
              </div>

              <div className="flex flex-col">
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Client ID
                </label>
                <input
                  type="text"
                  placeholder="Client ID"
                  name="client_id"
                  value={customer ? selectedCustomer?.id || "" : ""}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="title"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Form Fields */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    required
                    value={quotes.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Service Type
                  </label>
                  <input
                    type="text"
                    name="service_type"
                    required
                    placeholder="Service Type"
                    value={quotes.service_type}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>

                <div className="flex flex-col md:col-span-2 lg:col-span-1">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Description
                  </label>
                  <input
                    name="description"
                    id="description"
                    required
                    value={quotes.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>
              </div>

              {/* Address Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6">
                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Pick up Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        name="pickup_street_address"
                        required
                        value={quotes.service_data.pickup_street_address}
                        onChange={handleChange}
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        name="pickup_suburb"
                        required
                        value={quotes.service_data.pickup_suburb}
                        onChange={handleChange}
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        State
                      </label>
                      <select
                        name="pickup_state"
                        value={quotes.service_data.pickup_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      >
                        <option value="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="pickup_postal_code"
                        required
                        value={quotes.service_data.pickup_postal_code}
                        onChange={handleChange}
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Pickup unit
                      </label>
                      <input
                        type="text"
                        name="pickup_unit"
                        required
                        value={quotes.service_data.pickup_unit}
                        onChange={handleChange}
                        placeholder="Pickup Unit"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Pickup Instructions
                      </label>
                      <input
                        placeholder="Pickup Instructions"
                        name="pickup_instructions"
                        required
                        value={quotes.service_data.pickup_instructions}
                        onChange={handleChange}
                        id="pickup_instructions"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Drop off Address */}
                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Drop off Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        name="dropoff_street_address"
                        required
                        value={quotes.service_data.dropoff_street_address}
                        onChange={handleChange}
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        name="dropoff_suburb"
                        required
                        value={quotes.service_data.dropoff_suburb}
                        onChange={handleChange}
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        State
                      </label>
                      <select
                        name="dropoff_state"
                        required
                        value={quotes.service_data.dropoff_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      >
                        <option value="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="dropoff_postal_code"
                        required
                        value={quotes.service_data.dropoff_postal_code}
                        onChange={handleChange}
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm sm:text-md text-slate-700">
                        Drop off unit
                      </label>
                      <input
                        type="text"
                        name="dropoff_unit"
                        required
                        value={quotes.service_data.dropoff_unit}
                        onChange={handleChange}
                        placeholder="Drop off Unit"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Internal Notes
                  </label>
                  <textarea
                    name="internal_notes"
                    id="internal_notes"
                    required
                    value={quotes.internal_notes}
                    onChange={handleChange}
                    placeholder="Internal Notes"
                    className="w-full h-32 sm:h-28 lg:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Client Notes
                  </label>
                  <textarea
                    name="client_notes"
                    id="client_notes"
                    required
                    value={quotes.client_notes}
                    onChange={handleChange}
                    placeholder="Add any special handling notes"
                    className="w-full h-32 sm:h-28 lg:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
                  />
                </div>
              </div>
              <div className="mt-6 max-w-xs">
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Valid Until
                </label>
                <input
                  type="date"
                  name="valid_until"
                  required
                  value={quotes.valid_until}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 lg:mt-10">
                <button
                  type="button"
                  className="border border-gray-400 rounded-lg px-6 py-3 sm:py-2 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold w-full sm:w-auto"
                >
                  Save as Draft
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base cursor-pointer w-full sm:w-auto"
                >
                  Submit Quote
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateQuotes;
