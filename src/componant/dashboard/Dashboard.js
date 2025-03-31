import React from "react";
import "./dashboard.scss";
import { Space, Table } from 'antd';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Dashboard = () => {

  //subdomain data
  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
      width: '5%',
    },
    {
      title: 'Subdomain Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '70%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="#"><CiEdit /></a>
          <a href="#"><MdDeleteForever /></a>
        </Space>
      ),
      width: '5%',
    },
  ];

  const data = [
    {
      key: '1',
      srNo: '1',
      name: 'test.diwise.in',
      description: 'I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!',
    },
    {
      key: '2',
      srNo: '2',
      name: 'Jim Green',
      description: 'I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!',
    },
    {
      key: '3',
      srNo: '3',
      name: 'Joe Black',
      description: 'I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!',
    },
  ];
  //end subdomain data

   //website data
   const columnsweb = [
    {
      title: 'Sr No',
      dataIndex: 'srNo',
      key: 'srNo',
      width: '5%',
    },
    {
      title: 'Website URL',
      dataIndex: 'url',
      key: 'url',
      width: '20%',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '35%',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      width: '35%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="#"><CiEdit /></a>
          <a href="#"><MdDeleteForever /></a>
        </Space>
      ),
      width: '5%',
    },
  ];

  const webdata = [
    {
      key: '1',
      srNo: '1',
      url: 'https://test.diwise.in',
      username:'new_user_diwise',
      password:'new_user_diwise@2025',
    },
    {
      key: '2',
      srNo: '2',
      url: 'https://test.diwise.in',
      username:'new_user_diwise',
      password:'new_user_diwise@2025',
      
    },
    {
      key: '3',
      srNo: '3',
      url: 'https://test.diwise.in',
      username:'new_user_diwise',
      password:'new_user_diwise@2025',
    },
  ];
  //end website data

  return (
    <>
      <div className="dashboard-parent parent">
        <div className="dashboard-cont cont">
          {/* //----------------Top Section For All Details Related Domain---------------// */}
          <div className="top-section">
            <h3>Domain Details:</h3>
            <div className="domain-details">
              <div className="detail-left">
                <p>Domain Name : Lorem ipsum dolor sit. </p>
                <p>Purchase Date: pqr </p>
                <p>Expiry Date: pqr </p>
                <p>Purchase Platform: pqr </p>
              </div>
            </div>
          </div>
{/* //----------------Details for all created subdomain -------------------// */}
          <div className="middle-section">
            <h3>Subdomain List:</h3>
            <div className="subdomain-list">
              <Table 
                columns={columns} 
                dataSource={data} 
                pagination={{ pageSize: 5 }} 
                bordered 
              />
            </div>
          </div>

          {/* //-------------------Third Section For Login Details------------// */}
          <div className="third-section">
          <h3>Domain Login Details:</h3>
          <div className="login-detail">
          <p>Login URL: <span>https://hotinger.com</span></p>
          <p>Username: <span>this is username</span></p>
          <p>Password: <span>this is password</span></p>
          </div>
        
          </div>

          {/* //-------------------Website login details ----------------// */}

          <div className="fourth-section">
            <h3>Website Login Details</h3>
            <div className="website-list">
              <Table 
                columns={columnsweb} 
                dataSource={webdata} 
                pagination={{ pageSize: 5 }} 
                bordered 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
