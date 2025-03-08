import React, { useState } from 'react';

interface ClientFormProps {
  onClientChange: (client: Client) => void;
}

interface Client {
  clientName: string;
  clientCompanyName: string;
  clientPhoneNumber: string;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientChange }) => {
  const [client, setClient] = useState<Client>({
    clientName: '',
    clientCompanyName: '',
    clientPhoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
    onClientChange({ ...client, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Client Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={client.clientName}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            name="clientCompanyName"
            value={client.clientCompanyName}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="clientPhoneNumber"
            value={client.clientPhoneNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientForm;