"use client";
import { useEffect, useState } from "react";
import ReservationModal, {
  ReservationModalData,
} from "@/components/ReservationModal";
import axiosInstance from "@/lib/api";
import { Reservation, ReservationResponse, Role } from "@/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker"; // import datepicker
import "react-datepicker/dist/react-datepicker.css"; // import css for datepicker

type Props = {
  reservations: Reservation[];
  role: Role;
};

export default function DashboardMain(props: Props) {
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(props.reservations);
  const [pageNumber, setPageNumber] = useState(2);
  const [modalData, setModalData] = useState<ReservationModalData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null); // Start date state
  const [endDate, setEndDate] = useState<Date | null>(null); // End date state
  const router = useRouter();

  const toggleReservation = (id: string) => {
    setExpandedReservation((prev) => (prev === id ? null : id));
  };
  const fetchReservations = async (page: number) => {
    try {
      const query = startDate && endDate ? `startDate=${startDate?.toLocaleDateString()}&endDate=${endDate?.toLocaleDateString()}` : "";
      const { data } = await axiosInstance.get<ReservationResponse>(
        `/reservations/all/?pageNumber=${page}&${query}`
      );
      setReservations(data.reservations);
      setPageNumber(Number(data.pageNumber) + 1);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchReservations(pageNumber);
    }, 10000);

    return () => clearInterval(interval); // Temizleme
  }, [pageNumber]);

  const getReservationAnalysis = async () => {
    const { data } = await axiosInstance.get<ReservationModalData>(
      "/reservations/analysis"
    );
    setModalData(data);
  };

  const signout = async () => {
    await axiosInstance.post("/auth/signout");
    Cookies.remove("token");
    router.push("/");
  };

  const handleDateChange = () => {
    setPageNumber(1);
    fetchReservations(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <img src="/images/logo.png" alt="Login Icon" className="w-20 h-20" />
        <button
          onClick={signout}
          className="bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Logout
        </button>
      </header>

      {props.role === "admin" && (
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="text-yellow-300">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="bg-gray-700 text-white p-2 rounded-md"
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-yellow-300">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="bg-gray-700 text-white p-2 rounded-md"
                dateFormat="yyyy/MM/dd"
              />
            </div>
           <div className="items-end flex">
           <button
              onClick={handleDateChange}
              className="bg-yellow-500 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Filter
            </button>
           </div>
          </div>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className={`bg-gray-800 shadow-xl rounded-2xl overflow-hidden transform transition-transform hover:scale-105`}
          >
            <div className="p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Flight {reservation.flightNumber}
                </h2>
                <p className="text-gray-400">{reservation.destination}</p>
                <p className="text-sm text-gray-500">{reservation.date}</p>
              </div>

              {/* Status icon and status text */}
              <div className="text-center">
                {/* Button with icon and text */}
                {props.role === "admin" && (
                  <button
                    onClick={() => {
                      getReservationAnalysis();
                    }}
                    className="flex items-center text-sm justify-center bg-yellow-500 text-black py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    <img
                      src="/images/artificial-intelligence.png" // PNG icon path
                      alt="AI Icon"
                      className="w-4 h-4 mr-2" // Adjust size of the icon
                    />
                    <span className="font-semibold">AI Data</span>
                  </button>
                )}

                {/* Status Text */}
                <div className="text-yellow-400 font-semibold mt-2">
                  {reservation.status}
                </div>
              </div>
            </div>
            {props.role === "admin" && (
              <button
                className="bg-yellow-500 text-white py-2 px-4 w-full text-center font-semibold hover:bg-yellow-600"
                onClick={() => toggleReservation(reservation.id)}
              >
                {expandedReservation === reservation.id
                  ? "Hide Details"
                  : "See Details"}
              </button>
            )}

            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                expandedReservation === reservation.id
                  ? "max-h-screen"
                  : "max-h-0"
              }`}
            >
              {expandedReservation === reservation.id && (
                <div className="bg-gray-900 p-6">
                  <h3 className="text-lg font-semibold mb-4">Details</h3>
                  <p>
                    <strong>Airline:</strong> {reservation.airline}
                  </p>
                  <p>
                    <strong>Departure:</strong> {reservation.departureAirport}{" "}
                    at {reservation.departureTime}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {reservation.arrivalAirport} at{" "}
                    {reservation.arrivalTime}
                  </p>
                  <p>
                    <strong>Ticket Price:</strong> ${reservation.ticketPrice}
                  </p>

                  <h4 className="text-lg font-semibold mt-6">Customers</h4>
                  <ul className="space-y-2 mt-2">
                    {reservation.customers.map((customer, index) => (
                      <li
                        key={index}
                        className="p-4 bg-gray-800 rounded-lg shadow-inner"
                      >
                        <p>
                          <strong>Name:</strong> {customer.name}
                        </p>
                        <p>
                          <strong>Age:</strong> {customer.age}
                        </p>
                        <p>
                          <strong>Email:</strong> {customer.email}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>
      {modalData && props.role === "admin" && (
        <ReservationModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </div>
  );
}
