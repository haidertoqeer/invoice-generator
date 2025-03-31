import React, { useState } from 'react';

interface UserFormProps {
    onUserChange: (user: User) => void;
  }
  
  interface User {
    name: string;
    companyAddress: string;
    phoneNumber: string;
    logo: string | null;
  }
  
  const UserForm: React.FC<UserFormProps> = ({ onUserChange }) => {
    const [user, setUser] = useState<User>({
      name: '',
      companyAddress: '',
      phoneNumber: '',
      logo: null,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUser(prevUser => ({ ...prevUser, [name]: value || "" })); // Ensures an empty string instead of undefined
      onUserChange({ ...user, [name]: value || "" });
    };
    

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, logo: reader.result as string });
        onUserChange({ ...user, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
          <textarea
            name="companyAddress"
            value={user.companyAddress}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-1 w-full"
          />
          {user.logo && <img src={user.logo} alt="Logo Preview" className="mt-2 max-h-20" />}
        </div>
      </div>
    </div>
  );
};

export default UserForm;