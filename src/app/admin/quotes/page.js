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
} from "lucide-react";
import { useState } from "react";
import QuotesCard from "../../../components/quotes/QuotesCard";

const page = () => {
  const [showCard, setShowCard] = useState(false);

  return (
    <section className="bg-white rounded-2xl shadow-lg min-h-[91vh] py-4 px-4 sm:py-6 sm:px-6 lg:px-12">
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
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between h-15">
              <div className="flex flex-wrap items-center gap-3 h-full ">
                <a className="inline-flex items-center gap-2 bg-[#00b2a9] px-3 py-1 rounded-t-xl font-bold text-slate-800 text-lg sm:text-xl  h-full ">
                  <NotepadText className="w-6 h-6" />
                  <span>All Quotes</span>
                </a>

                <a
                  href="/admin/jobs"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 h-full"
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
            <hr className="border-gray-300 border-1 " />
          </div>
        </div>

        {showCard && (
          <QuotesCard
            setShow={setShowCard}
            show={showCard}
            className="transition-discrete"
          />
        )}

        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-gray-200 border-default-medium">
              <tr>
                <th class="px-4 py-3 w-10">
                  <input type="checkbox" disabled class="cursor-not-allowed" />
                </th>
                <th class="px-6 py-3 font-medium">Job ID</th>
                <th class="px-6 py-3 font-medium">Client ID</th>
                <th class="px-6 py-3 font-medium">Branch ID</th>
                <th class="px-6 py-3 font-medium">Title</th>
                <th class="px-6 py-3 font-medium">Description</th>
                <th class="px-6 py-3 font-medium">Status</th>
                <th class="px-6 py-3 font-medium">Sub Total</th>
              </tr>
            </thead>

            <tbody>
              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-001</th>
                <td class="px-6 py-4">CL-3241</td>
                <td class="px-6 py-4">BR-12</td>
                <td class="px-6 py-4">AC Repair</td>
                <td class="px-6 py-4">Fix cooling issue</td>
                <td class="px-6 py-4">Pending</td>
                <td class="px-6 py-4">$120</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-002</th>
                <td class="px-6 py-4">CL-1982</td>
                <td class="px-6 py-4">BR-05</td>
                <td class="px-6 py-4">Plumbing Work</td>
                <td class="px-6 py-4">Kitchen pipe leakage</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$80</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-003</th>
                <td class="px-6 py-4">CL-5570</td>
                <td class="px-6 py-4">BR-09</td>
                <td class="px-6 py-4">Electrical Fix</td>
                <td class="px-6 py-4">Fan not working</td>
                <td class="px-6 py-4">Rejected</td>
                <td class="px-6 py-4">$40</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-004</th>
                <td class="px-6 py-4">CL-7811</td>
                <td class="px-6 py-4">BR-07</td>
                <td class="px-6 py-4">Painting</td>
                <td class="px-6 py-4">Bedroom repaint</td>
                <td class="px-6 py-4">Pending</td>
                <td class="px-6 py-4">$250</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-005</th>
                <td class="px-6 py-4">CL-1205</td>
                <td class="px-6 py-4">BR-02</td>
                <td class="px-6 py-4">CCTV Installation</td>
                <td class="px-6 py-4">Install 2 cameras</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$300</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-006</th>
                <td class="px-6 py-4">CL-4410</td>
                <td class="px-6 py-4">BR-04</td>
                <td class="px-6 py-4">Carpentry Work</td>
                <td class="px-6 py-4">Fix wardrobe door</td>
                <td class="px-6 py-4">Pending</td>
                <td class="px-6 py-4">$55</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-007</th>
                <td class="px-6 py-4">CL-3340</td>
                <td class="px-6 py-4">BR-11</td>
                <td class="px-6 py-4">Window Repair</td>
                <td class="px-6 py-4">Glass replacement</td>
                <td class="px-6 py-4">Rejected</td>
                <td class="px-6 py-4">$70</td>
              </tr>

              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-008</th>
                <td class="px-6 py-4">CL-9087</td>
                <td class="px-6 py-4">BR-06</td>
                <td class="px-6 py-4">Floor Cleaning</td>
                <td class="px-6 py-4">Deep cleaning</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$180</td>
              </tr>
              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-008</th>
                <td class="px-6 py-4">CL-9087</td>
                <td class="px-6 py-4">BR-06</td>
                <td class="px-6 py-4">Floor Cleaning</td>
                <td class="px-6 py-4">Deep cleaning</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$180</td>
              </tr>
              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-008</th>
                <td class="px-6 py-4">CL-9087</td>
                <td class="px-6 py-4">BR-06</td>
                <td class="px-6 py-4">Floor Cleaning</td>
                <td class="px-6 py-4">Deep cleaning</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$180</td>
              </tr>
              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-008</th>
                <td class="px-6 py-4">CL-9087</td>
                <td class="px-6 py-4">BR-06</td>
                <td class="px-6 py-4">Floor Cleaning</td>
                <td class="px-6 py-4">Deep cleaning</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$180</td>
              </tr>
              <tr class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
                <td class="px-4 py-4"></td>
                <th class="px-6 py-4 font-medium whitespace-nowrap">JOB-008</th>
                <td class="px-6 py-4">CL-9087</td>
                <td class="px-6 py-4">BR-06</td>
                <td class="px-6 py-4">Floor Cleaning</td>
                <td class="px-6 py-4">Deep cleaning</td>
                <td class="px-6 py-4">Approved</td>
                <td class="px-6 py-4">$180</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default page;
