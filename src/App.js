import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [packages, setPackages] = useState([{
    packageName: '',
    shortDescription: '',
    price: '',
    currency: '',
    packageType: '',
    points: Array(6).fill(false),
    verifiedByConQt: false
  }]);
  const [formChecked, setFormChecked] = useState(false);
  const [, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(packages.every(pkg => pkg.packageName && pkg.price));
  }, [packages]);

  const addPackage = () => {
    const isNameFilled = packages.every(pkg => pkg.packageName.trim() !== '');
    const isPriceFilled = packages.every(pkg => pkg.price.trim() !== '');

    if (isNameFilled && isPriceFilled) {
      const newPackage = {
        packageName: '',
        shortDescription: '',
        price: '',
        currency: '',
        packageType: '',
        points: Array(6).fill(false),
        verifiedByConQt: false
      };
      setPackages([...packages, newPackage]);
    } else {
      alert("Please fill in Package Name and Price before adding a new package.");
    }
  };

  const deletePackage = (index) => {
    setPackages(prevPackages => prevPackages.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, key, value) => {
    setPackages(prevPackages => {
      const updatedPackages = [...prevPackages];
      updatedPackages[index][key] = value;
      return updatedPackages;
    });
  };

  const togglePoint = (index, pointIndex) => {
    setPackages(prevPackages => {
      const updatedPackages = [...prevPackages];
      updatedPackages[index].points[pointIndex] = !updatedPackages[index].points[pointIndex];
      return updatedPackages;
    });
  };

  const toggleFormCheck = () => {
    setFormChecked(prev => !prev);
  };

  return (
    <div className="main-container left-line">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center add-delete-container mb-3">
          <div>
            <span className="add-symbol" onClick={addPackage}><i className="bi bi-plus h1"></i></span>
            {packages.length > 0 && <span className="add-text" onClick={() => deletePackage(packages.length - 1)}><i className="bi bi-trash-fill h1 m-4"></i></span>}
          </div>
        </div>
        <div className="form-check check-all">
          <label className="switch">
            <input type="checkbox" checked={formChecked} onChange={toggleFormCheck} />
            <span className="slider"></span>
          </label>
        </div>
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            pkg={pkg}
            index={index}
            handleInputChange={handleInputChange}
            togglePoint={togglePoint}
            deletePackage={deletePackage}
          />
        ))}
        <div className="mb-2">
          <div className="form-check">
            <label className="switch">
              <input type="checkbox" checked={packages[packages.length - 1]?.verifiedByConQt} onChange={() => togglePoint(packages.length - 1)} />
              <span className="slider"></span>
            </label>
            <label>Verified by ConQt</label>
            <p className='text-muted small'>Check when product is verified By ConQt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PackageCard = ({ pkg, index, handleInputChange, togglePoint, deletePackage }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-2">
            <label>Package Name</label>
            <input type="text" className="form-control mb-2" placeholder="Input text" value={pkg.packageName} onChange={(e) => handleInputChange(index, 'packageName', e.target.value)} />
            <p className='text-muted small'>The name is how it appears on your site</p>
          </div>
          <div className="w-50 ml-2">
            <label>Short Description</label>
            <input type="text" className="form-control mb-2" placeholder="Input text" value={pkg.shortDescription} onChange={(e) => handleInputChange(index, 'shortDescription', e.target.value)} />
            <p className='text-muted small'>0/50</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-33">
            <label>Price</label>
            <input type="number" className="form-control mb-2" placeholder="Input text" value={pkg.price} onChange={(e) => handleInputChange(index, 'price', e.target.value)} />
            <p className='text-muted small'>The name is how it appears on your site</p>
          </div>
          <div className="w-33">
            <label>Currency</label>
            <select className="form-control mb-2" value={pkg.currency} onChange={(e) => handleInputChange(index, 'currency', e.target.value)}>
              <option value="">---Select---</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="w-33">
            <label>Package Type</label>
            <select className="form-control mb-2" value={pkg.packageType} onChange={(e) => handleInputChange(index, 'packageType', e.target.value)}>
              <option value="">---Select---</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
            <p className='text-muted small'>Select Package</p>
          </div>
        </div>
      </div>
      <div className="border-top mt-4 mb-4">
        <label className='select'>Select Package</label>
        <div className="mb-2 mt-4 package-points flex-container">
          <div className="left-inputs flex-container flex-column">
            {pkg.points.slice(0, 3).map((point, pointIndex) => (
              <div className="form-check" key={pointIndex}>
                <div className="flex-container">
                  <label className="switch">
                    <input type="checkbox" checked={point} onChange={() => togglePoint(index, pointIndex)} />
                    <span className="slider"></span>
                  </label>
                  <input type="text" className="form-control m-3 w-100" placeholder="Input text" />
                </div>
              </div>
            ))}
          </div>
          <div className="right-inputs flex-container flex-column">
            {pkg.points.slice(3, 6).map((point, pointIndex) => (
              <div className="form-check" key={pointIndex}>
                <div className="flex-container">
                  <label className="switch">
                    <input type="checkbox" checked={point} onChange={() => togglePoint(index, pointIndex + 3)} />
                    <span className="slider"></span>
                  </label>
                  <input type="text" className="form-control m-3" placeholder="Input text" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
