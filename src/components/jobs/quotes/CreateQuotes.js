import axios from "axios";
import { CalendarDays, Clock8, Search } from "lucide-react";
import { getTokens } from "../../../lib/apiClient";
import { useEffect, useState } from "react";

const CreateQuotes = () => {
  const token = getTokens().access;
  const [date, setDate] = useState(new Date());
  const [quotes, setQuotes] = useState({
    client_id: 1,
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
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCreateQuote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://abc.mrl.local/api/v1/quotes",
        {
          client_id: 2,
          branch_id: 2,
          service_package_id: 2,
          title: "Office Relocation Quote",
          description: "Small office relocation within Melbourne",
          service_type: "general",
          service_data: {
            pickup_unit: "Suite 405",
            pickup_street_address: "Collins Street",
            pickup_suburb: "Melbourne CBD",
            pickup_state: "VIC",
            pickup_postal_code: "3000",
            pickup_instructions: "Building access via rear loading dock",
            dropoff_unit: "Unit 18",
            dropoff_street_address: "Chapel Street",
            dropoff_suburb: "South Yarra",
            dropoff_state: "VIC",
            dropoff_postal_code: "3141",
          },
          assigned_to: 3,
          tax_rate: 10,
          discount_amount: 75,
          valid_until: "2026-01-15",
          internal_notes: "IT equipment present, pack monitors separately",
          client_notes: "Preferred move after 10 AM",
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Quote created:", response.data);
    } catch (err) {
      console.error(
        "Error creating quote:",
        err.response?.data?.message || err.message
      );
    }
  };

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
          <div className=" mt-6 lg:mt-10 w-full  p-8">
            {/* RIGHT column */}
            <div className="w-full ">
              <div className="flex flex-col md:flex-row lg:flex-row  gap-6 lg:gap-10 ">
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
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm lg:w-90"
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
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm lg:w-90"
                  />
                </div>

                <div className="flex flex-col">
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
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm  lg:w-90"
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mt-6">
                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Pick up Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        name="pickup_street_address"
                        required
                        value={quotes.service_data.pickup_street_address}
                        onChange={handleChange}
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        name="pickup_suburb"
                        required
                        value={quotes.service_data.pickup_suburb}
                        onChange={handleChange}
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        State
                      </label>
                      <select
                        name="pickup_state"
                        value={quotes.service_data.pickup_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      >
                        <option defaultValue="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="pickup_postal_code"
                        required
                        value={quotes.service_data.pickup_postal_code}
                        onChange={handleChange}
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Pickup unit
                      </label>
                      <input
                        type="text"
                        name="pickup_unit"
                        required
                        value={quotes.service_data.pickup_unit}
                        onChange={handleChange}
                        placeholder="Pickup Unit"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Pickup Instructions
                      </label>
                      <input
                        placeholder="Pickup Instructions"
                        name="pickup_instructions"
                        required
                        value={quotes.service_data.pickup_instructions}
                        onChange={handleChange}
                        id="pickup_instructions"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Drop off Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        name="dropoff_street_address"
                        required
                        value={quotes.service_data.dropoff_street_address}
                        onChange={handleChange}
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        name="dropoff_suburb"
                        required
                        value={quotes.service_data.dropoff_suburb}
                        onChange={handleChange}
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        State
                      </label>
                      <select
                        name="dropoff_state"
                        required
                        value={quotes.service_data.dropoff_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      >
                        <option defaultValue="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="dropoff_postal_code"
                        required
                        value={quotes.service_data.dropoff_postal_code}
                        onChange={handleChange}
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Drop of unit
                      </label>
                      <input
                        type="text"
                        name="dropoff_unit"
                        required
                        value={quotes.service_data.dropoff_unit}
                        onChange={handleChange}
                        placeholder="Drop of Unit"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Internel Notes
                  </label>
                  <textarea
                    name="internal_notes"
                    id="internal_notes"
                    required
                    value={quotes.internal_notes}
                    onChange={handleChange}
                    placeholder="Internel Notes"
                    className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Clients Notes
                  </label>
                  <textarea
                    name="client_notes"
                    id="client_notes"
                    required
                    value={quotes.client_notes}
                    onChange={handleChange}
                    placeholder="Add any special handling notes"
                    className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Valid Until
                </label>
                <input
                  type="date"
                  name="valid_until"
                  required
                  value={quotes.valid_until}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 lg:mt-10">
                <button className="order-2 sm:order-1 border border-gray-400 rounded-lg px-6 py-3 sm:py-2 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold">
                  Save as Draft
                </button>

                <button
                  type="submit"
                  className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base cursor-pointer"
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
