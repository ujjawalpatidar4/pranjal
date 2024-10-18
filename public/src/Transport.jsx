import React, { useState, useEffect } from 'react';
import './Transport.css'
import { db } from './firebase'; // Import Firebase config
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Firestore functions
import { collection, addDoc } from 'firebase/firestore';


// Dummy data for testing purposes
const initialChallanRecords = [
  {
    challanNo: "12345",
    date: "2024-10-13",
    truckNo: "MH12AB1234",
    truckOwnerInfo: "John Doe",
    truckOwnerNo: "9876543210",
    driverInfo: "Driver A",
    from: "Mumbai",
    to: "Pune",
    consignor: "Consignor A",
    consignee: "Consignee B",
    freightCharges: "5000",
    extraCharges: "300",
    advanceAmount: "1000",
    netAmount: "3700",
  },
  {
    challanNo: "67890",
    date: "2024-10-11",
    truckNo: "MH14CD5678",
    truckOwnerInfo: "Jane Smith",
    truckOwnerNo: "9876541230",
    driverInfo: "Driver B",
    from: "Pune",
    to: "Nagpur",
    consignor: "Consignor C",
    consignee: "Consignee D",
    freightCharges: "6000",
    extraCharges: "200",
    advanceAmount: "1200",
    netAmount: "4600",
  },
  {
    challanNo: "11223",
    date: "2024-10-12",
    truckNo: "MH12AB1234",
    truckOwnerInfo: "John Doe",
    truckOwnerNo: "9876543210",
    driverInfo: "Driver A",
    from: "Mumbai",
    to: "Delhi",
    consignor: "Consignor E",
    consignee: "Consignee F",
    freightCharges: "5500",
    extraCharges: "400",
    advanceAmount: "1100",
    netAmount: "4000",
  },
];

const TransportForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    challanNo: "",
    date: "",
    truckNo: "",
    truckOwnerInfo: "",
    truckOwnerNum: "",
    DriverInfo: "",
    from: "",
    to: "",
    Consignor:"",
    Consignee: "",
    lrnumber: "",
    Particulars: "",
    Packages: "",
    Rate: "",
    Weight: "",
    FreightCharges:"",
    LabourCharges:"",
    FreightDifferenceRate:"",
    FreightDifferenceCharges:"",
    ExtraCharges: "",
    AdvanceAmount: "",
    NetAmountToPay:"",
    CommisionAmount:"",
    commission_status:"",
    
  });

  // State for search input and filtered records
  const [searchTruckNo, setSearchTruckNo] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTruckNo(e.target.value);
  };

  // Handle search operation by truck number
  const handleSearch = () => {
    const records = initialChallanRecords.filter(
      (challan) => challan.truckNo === searchTruckNo
    );
    setFilteredRecords(records);
    setShowForm(records.length === 0); // Hide form if results are found, show form otherwise
  };

  // Handle "Back" button to show the form again
  const handleBack = () => {
    setSearchTruckNo("");
    setFilteredRecords([]);
    setShowForm(true); // Show form again
  };

  // Move to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Move to previous step (if required)
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    try{
        const docRef = await addDoc(collection(db, 'transport_data'), formData);
        console.log('Document written with ID: ', docRef.id);
        setFormData({
            challanNo: "",
    date: "",
    truckNo: "",
    truckOwnerInfo: "",
    truckOwnerNum: "",
    DriverInfo: "",
    from: "",
    to: "",
    Consignor:"",
    Consignee: "",
    lrnumber: "",
    Particulars: "",
    Packages: "",
    Rate: "",
    Weight: "",
    FreightCharges:"",
    LabourCharges:"",
    FreightDifferenceRate:"",
    FreightDifferenceCharges:"",
    ExtraCharges: "",
    AdvanceAmount: "",
    NetAmountToPay:"",
    CommisionAmount:"",
    commission_status:"",
          });
          setStep(1);
    }catch (error) {
        console.error('Error adding document: ', error);
      }
  };

  return (
    <div className="form-container">
      <h1>Agrawal Transport Challan Records</h1>
      
      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Truck No."
          value={searchTruckNo}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    <br/>
    <hr/>
    <br/>

      {/* Display Search Results */}
      {filteredRecords.length > 0 ? (
        <div className="search-result">
          <h2>Challan Records for Truck No: {searchTruckNo}</h2>
          {filteredRecords.map((record) => (
            <div key={record.challanNo} className="challan-record">
              <h3>Challan No: {record.challanNo}</h3>
              <p>Date: {record.date}</p>
              <p>Truck No: {record.truckNo}</p>
              <p>Truck Owner Info: {record.truckOwnerInfo}</p>
              <p>Freight Charges: {record.freightCharges}</p>
              <p>Extra Charges: {record.extraCharges}</p>
              <p>Advance Amount: {record.advanceAmount}</p>
              <p>Net Amount: {record.netAmount}</p>
            </div>
          ))}
          {/* Back Button */}
          <button onClick={handleBack}>Back</button>
        </div>
      ) : (
        showForm 
      )}

      {/* Show Form Only if No Results Found or Initial Load */}
      {showForm && (
        <>
          {step === 1 && (
            <form>
              <label>
                Challan No. :-
                <input
                  type="text"
                  name="challanNo"
                  value={formData.challanNo}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date :-
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Truck No. :-
                <input
                  type="text"
                  name="truckNo"
                  value={formData.truckNo}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Truck Owner's Info :-
                <input
                  type="text"
                  name="truckOwnerInfo"
                  value={formData.truckOwnerInfo}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Truck Owner's Number :-
                <input
                  type="number"
                  name="truckOwnerNum"
                  value={formData.truckOwnerNum}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
              Driver`s Info. :-
                <input
                  type="text"
                  name="DriverInfo"
                  value={formData.DriverInfo}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
              From :-
                <input
                  type="date"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
              To :-
                <input
                  type="date"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </label>
              
              <label htmlFor="Consignor">Consignor:
                    <select
                        id="Consignor"               // ID for linking label
                        name="Consignor"             // Name for form submission and state update
                        value={formData.Consignor}   // Controlled input, tied to formData
                        onChange={handleChange}    // onChange handler to track changes
                        required                   // Field is required
                    >
                        <option value="">Select a vehicle</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bike">Bike</option>
                        <option value="bus">Bus</option>
                    </select>
                </label>
              <label htmlFor="Consignee">Consignee:
                    <select
                        id="Consignee"               // ID for linking label
                        name="Consignee"             // Name for form submission and state update
                        value={formData.Consignee}   // Controlled input, tied to formData
                        onChange={handleChange}    // onChange handler to track changes
                        required                   // Field is required
                    >
                        <option value="">Select a vehicle</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bike">Bike</option>
                        <option value="bus">Bus</option>
                    </select>
                </label>
                <label>
                LR Number :-
                <input
                  type="number"
                  name="lrnumber"
                  value={formData.lrnumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="Particulars">Particulars:
                    <select
                        id="Particulars"               // ID for linking label
                        name="Particulars"             // Name for form submission and state update
                        value={formData.Particulars}   // Controlled input, tied to formData
                        onChange={handleChange}    // onChange handler to track changes
                        required                   // Field is required
                    >
                        <option value="">Select a vehicle</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="bike">Bike</option>
                        <option value="bus">Bus</option>
                    </select>
                </label>
                <label>
                Packages :-
                <input
                  type="text"
                  name="Packages"
                  value={formData.Packages}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Rate (in quin.) :-
                <input
                  type="float"
                  name="Rate"
                  value={formData.Rate}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Weight (in quin.) :-
                <input
                  type="float"
                  name="Weight"
                  value={formData.Weight}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Freight Charges :-
                <input
                  type="float"
                  name="FreightCharges"
                  value={formData.FreightCharges}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Labour Charges :-
                <input
                  type="float"
                  name="LabourCharges"
                  value={formData.LabourCharges}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Freight Difference Rate :-
                <input
                  type="float"
                  name="FreightDifferenceRate"
                  value={formData.FreightDifferenceRate}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Freight Difference Charges :-
                <input
                  type="float"
                  name="FreightDifferenceCharges"
                  value={formData.FreightDifferenceCharges}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Extra Charges :-
                <input
                  type="float"
                  name="ExtraCharges"
                  value={formData.ExtraCharges}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Advance Amount :-
                <input
                  type="float"
                  name="AdvanceAmount"
                  value={formData.AdvanceAmount}
                  onChange={handleChange}
                  required
                />
              </label>
                <label>
                Net Amount To Pay :-
                <input
                  type="float"
                  name="NetAmountToPay"
                  value={formData.NetAmountToPay}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <label>
                Commision Amount :-
                <input
                  type="float"
                  name="CommisionAmount"
                  value={formData.CommisionAmount}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>Commission Status :-</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="commission_status"
              value="Due"
              checked={formData.commission_status === 'Due'}
              onChange={handleChange}
            /> Due
          </label>
          <label>
            <input
              type="radio"
              name="commission_status"
              value="Cash"
              checked={formData.commission_status === 'Cash'}
              onChange={handleChange}
            /> Cash
          </label>
          <label>
            <input
              type="radio"
              name="commission_status"
              value="UPI"
              checked={formData.commission_status === 'UPI'}
              onChange={handleChange}
            /> UPI
          </label>
          <label>
            <input
              type="radio"
              name="commission_status"
              value="Other"
              checked={formData.commission_status === 'Other'}
              onChange={handleChange}
            /> Other
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={prevStep}>
            Back
          </button>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default TransportForm;
