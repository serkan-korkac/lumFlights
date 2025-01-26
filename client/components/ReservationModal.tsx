import React from 'react';

export interface ReservationModalData {
  flightNumber: string;
  date: string;
  passengers: string[];
  aiAnalysis: string;
  suggestions: string[];
  comments: string[];
}

interface Props {
  data: ReservationModalData;
  onClose: () => void;
}

const ReservationModal: React.FC<Props> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className= "lg:h-5/6 bg-white shadow-xl rounded-lg w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-100 hover:scale-105 max-h-screen overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Reservation Analysis</h2>

          <div className="space-y-4">
            <p className="text-lg text-gray-700"><strong>Flight:</strong> {data.flightNumber}</p>
            <p className="text-lg text-gray-700"><strong>Date:</strong> {data.date}</p>
            <p className="text-lg text-gray-700"><strong>Passengers:</strong> {data.passengers.join(', ')}</p>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 mb-3">AI Analysis</h3>
            <p className="text-gray-700">{data.aiAnalysis}</p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Ai Suggestions</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {data.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Ai Comments</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {data.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg transition-colors hover:bg-blue-500 focus:outline-none">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
