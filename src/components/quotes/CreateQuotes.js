import axios from "axios";
import { CalendarDays, Clock8, Search } from "lucide-react";
import { getTokens } from "../../lib/apiClient";

const CreateQuotes = () => {
  const token = getTokens().access;
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
    <section className="bg-white rounded-2xl shadow-lg h-auto min-h-[91vh] lg:h-[91vh] py-4 px-4 sm:py-6 sm:px-6 lg:px-12">
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
                  11:11:17 am
                </span>{" "}
                <i className="fa-regular  fa-calendar-days ml-2 lg:ml-0">
                  <CalendarDays />
                </i>
                <span className="font-semibold text-slate-800 ml-2">
                  Monday, Dec 1
                </span>
              </div>
            </h4>
          </div>
        </div>

        <hr className="mt-4 border-gray-300" />

        <div className="flex flex-col lg:flex-row mt-6 lg:mt-10 gap-6">
          <div className="w-full lg:w-[40%]">
            <div className="bg-[#F1F5FB] rounded-2xl overflow-hidden pb-5">
              <div className="bg-[#17466933] px-4 sm:px-6 lg:px-10 py-4 lg:py-5 rounded-t-2xl">
                <h2 className="text-[#1A2B4C] text-xl sm:text-2xl font-bold">
                  Customer Details
                </h2>
              </div>

              <div className="px-4 sm:px-6 lg:px-10 py-4 lg:py-6 space-y-4 lg:space-y-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search-customer"
                    placeholder="Search Customer"
                    className="w-full px-3 py-2 pr-10 text-sm border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-gray-400"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>

                <div>
                  <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone No"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[60%]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
              <span className="font-semibold text-[#1A2B4C] text-sm sm:text-base">
                Time Slot
              </span>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="slot" defaultChecked />
                  <span className="text-sm sm:text-base">Morning</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="slot" />
                  <span className="text-sm sm:text-base">Afternoon</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="slot" />
                  <span className="text-sm sm:text-base">Flexible</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Pick up Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Drop off Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
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
                      placeholder="Suburb"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-md text-slate-700">State</label>
                    <select
                      id="state"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                      <option defaultValue>Select State</option>
                      <option value="NSW">New South Wales</option>
                      <option value="SA">South Australia</option>
                      <option value="NT">Northern Territory</option>
                      <option value="QLD">Queensland </option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-md text-slate-700">
                      Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="Postcode"
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
                      placeholder="Suburb"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-md text-slate-700">State</label>
                    <select
                      id="state"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                      <option defaultValue>Select State</option>
                      <option value="NSW">New South Wales</option>
                      <option value="SA">South Australia</option>
                      <option value="NT">Northern Territory</option>
                      <option value="QLD">Queensland </option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-md text-slate-700">
                      Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="Postcode"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
              <div>
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Notes
                </label>
                <textarea
                  placeholder="Add Notes or reminder"
                  className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Special Instructions
                </label>
                <textarea
                  placeholder="Add any special handling notes"
                  className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                ></textarea>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                Preferred Contact Method
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
                <label className="flex items-center gap-2">
                  <input type="radio" name="contact" defaultChecked />
                  <span className="text-sm sm:text-base">SMS</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contact" />
                  <span className="text-sm sm:text-base">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contact" />
                  <span className="text-sm sm:text-base">Call</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 lg:mt-10">
              <button className="order-2 sm:order-1 border border-gray-400 rounded-lg px-6 py-3 sm:py-2 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold">
                Save as Draft
              </button>
              <button
                className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base"
                onClick={handleCreateQuote}
              >
                Submit Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateQuotes;
