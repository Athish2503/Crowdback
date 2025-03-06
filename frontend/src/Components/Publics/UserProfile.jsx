import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Award, CreditCard, Gift, Clock, Shield, Edit } from 'lucide-react';
import Sidebar from './Sidebar';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    points: 0, // Ensure points are included in userData
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    phone: '',
  });
  const [redeemHistory, setRedeemHistory] = useState([
    { id: 1, date: '2023-12-15', points: 500, status: 'Completed' },
    { id: 2, date: '2024-02-20', points: 200, status: 'Completed' },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/get-user-details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response.data);
        setUserData(response.data);
        setEditedData({
          name: response.data.name,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleRedeemPoints = async () => {
    if (pointsToRedeem <= 0) {
      toast.error('Please enter a valid number of points to redeem');
      return;
    }

    if (pointsToRedeem > userData.points) {
      toast.error('You cannot redeem more points than you have');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/redeem-points', {
        email: userData.email,
        pointsToRedeem,
      });
      
      toast.success(response.data.message);
      setUserData((prev) => ({ ...prev, points: response.data.remainingPoints }));
      setPointsToRedeem(0);
      
      // Add to history (in a real app, this would come from the backend)
      setRedeemHistory([
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          points: pointsToRedeem,
          status: 'Pending',
        },
        ...redeemHistory,
      ]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to redeem points');
    }
  };

  const handleSaveProfile = async () => {
    try {
      // In a real app, you would send this to your backend
      // const response = await axios.put('http://localhost:5000/api/update-profile', editedData, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      // });
      
      // For demo purposes, we'll just update the local state
      setUserData(prev => ({
        ...prev,
        name: editedData.name,
        phone: editedData.phone
      }));
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => window.location.href = "/", 2000);
  };

  if (loading) {
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar handleLogout={handleLogout} />
      
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <Container fluid>
          <Row>
            <Col lg={12} className="mb-4">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                  <Button 
                    variant={isEditing ? "success" : "outline-primary"}
                    className="flex items-center gap-2"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>Save Changes</>
                    ) : (
                      <><Edit size={16} /> Edit Profile</>
                    )}
                  </Button>
                </div>
                
                <Row>
                  <Col md={4} className="mb-4 md:mb-0">
                    <div className="bg-gray-50 rounded-xl p-6 h-full">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                          {userData.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{userData.name}</h2>
                        <p className="text-gray-500 mb-4">{userData.isAdmin ? 'Administrator' : 'Member'}</p>
                        
                        <div className="bg-primary/10 text-primary font-semibold rounded-full px-4 py-2 flex items-center gap-2">
                          <Award size={18} />
                          <span>{userData.points} Points</span> {/* Display user points */}
                        </div>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md={8}>
                    <div className="bg-white rounded-xl h-full">
                      {isEditing ? (
                        <div className="space-y-4">
                          <Form.Group>
                            <Form.Label className="font-medium text-gray-700">Full Name</Form.Label>
                            <Form.Control 
                              type="text" 
                              value={editedData.name}
                              onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                              className="rounded-lg border-gray-300"
                            />
                          </Form.Group>
                          
                          <Form.Group>
                            <Form.Label className="font-medium text-gray-700">Phone Number</Form.Label>
                            <Form.Control 
                              type="text" 
                              value={editedData.phone}
                              onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                              className="rounded-lg border-gray-300"
                            />
                          </Form.Group>
                          
                          <Form.Group>
                            <Form.Label className="font-medium text-gray-700">Email Address</Form.Label>
                            <Form.Control 
                              type="email" 
                              value={userData.email}
                              disabled
                              className="rounded-lg border-gray-300 bg-gray-50"
                            />
                            <Form.Text className="text-gray-500">
                              Email cannot be changed
                            </Form.Text>
                          </Form.Group>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-2">
                            <User className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="font-medium">{userData.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-2">
                            <Mail className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-500">Email Address</p>
                              <p className="font-medium">{userData.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-2">
                            <Phone className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-500">Phone Number</p>
                              <p className="font-medium">{userData.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-2">
                            <Shield className="text-primary" size={20} />
                            <div>
                              <p className="text-sm text-gray-500">Account Type</p>
                              <p className="font-medium">{userData.isAdmin ? 'Administrator' : 'Standard User'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            
            <Col lg={6} className="mb-4">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="text-primary" size={24} />
                  Points Management
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Available Points</p>
                      <p className="text-2xl font-bold text-primary">{userData.points}</p> {/* Display available points */}
                    </div>
                    <div className="bg-primary/10 rounded-full p-3">
                      <CreditCard className="text-primary" size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Form.Group>
                    <Form.Label className="font-medium text-gray-700">Points to Redeem</Form.Label>
                    <Form.Control
                      type="number"
                      value={pointsToRedeem}
                      onChange={(e) => setPointsToRedeem(parseInt(e.target.value) || 0)}
                      min="0"
                      max={userData.points}
                      className="rounded-lg border-gray-300"
                    />
                  </Form.Group>
                </div>
                
                <Button 
                  variant="primary" 
                  onClick={handleRedeemPoints} 
                  className="w-100 py-2 rounded-lg"
                  disabled={userData.points === 0 || pointsToRedeem <= 0 || pointsToRedeem > userData.points}
                >
                  <Gift className="inline mr-2" size={16} />
                  Redeem Points
                </Button>
              </div>
            </Col>
            
            <Col lg={6} className="mb-4">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="text-primary" size={24} />
                  Redemption History
                </h2>
                
                {redeemHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {redeemHistory.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.points}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Gift size={40} className="mx-auto mb-2 text-gray-300" />
                    <p>No redemption history yet</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserProfile;