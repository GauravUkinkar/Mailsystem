import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { Space, Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {


const [getDomains, setGetDomians] = useState([]);


  //subdomain data
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "5%",
    },
    {
      title: "Subdomain Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "70%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="#">
            <CiEdit />
          </a>
          <a href="#">
            <MdDeleteForever />
          </a>
        </Space>
      ),
      width: "5%",
    },
  ];

  const data = [
    {
      key: "1",
      srNo: "1",
      name: "test.diwise.in",
      description:
        "I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!",
    },
    {
      key: "2",
      srNo: "2",
      name: "Jim Green",
      description:
        "I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!",
    },
    {
      key: "3",
      srNo: "3",
      name: "Joe Black",
      description:
        "I ve added a Sr No column and adjusted the column widths to distribute 100% evenly. Let me know if yod like further adjustments or styling enhancements!",
    },
  ];
  //end subdomain data

  //website data
  const columnsweb = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "7%",
    },
    {
      title: "Website URL",
      dataIndex: "url",
      key: "url",
      width: "20%",
    },
    {
      title: "Website Platform",
      dataIndex: "platform",
      key: "platform",
      width: "20%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "19%",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: "19%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="#">
            <CiEdit />
          </a>
          <a href="#">
            <MdDeleteForever />
          </a>
        </Space>
      ),
      width: "5%",
    },
  ];

  const webdata = [
    {
      key: "1",
      srNo: "1",
      url: "https://test.diwise.in",
      platform: "wordpress",
      username: "new_user_diwise",
      password: "new_user_diwise@2025",
    },
    {
      key: "2",
      srNo: "2",
      url: "https://test.diwise.in",
      platform: "wordpress",
      username: "new_user_diwise",
      password: "new_user_diwise@2025",
    },
    {
      key: "3",
      srNo: "3",
      url: "https://test.diwise.in",
      platform: "wordpress",
      username: "new_user_diwise",
      password: "new_user_diwise@2025",
    },
  ];
  //end website data

  //Email data
  const columnsemail = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "10%",
    },
    {
      title: "Webmail ID",
      dataIndex: "mail",
      key: "mail",
      width: "20%",
    },
    {
      title: "Mail Username",
      dataIndex: "mailusername",
      key: "mailusername",
      width: "30%",
    },
    {
      title: "Mail Password",
      dataIndex: "mailpassword",
      key: "mailpassword",
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="#">
            <CiEdit />
          </a>
          <a href="#">
            <MdDeleteForever />
          </a>
        </Space>
      ),
      width: "5%",
    },
  ];

  const emaildata = [
    {
      key: "1",
      srNo: "1",
      mail: "info@diwise.in",
      mailusername: "new_user_diwise",
      mailpassword: "new_user_diwise@2025",
    },
    {
      key: "2",
      srNo: "2",
      mail: "info@diwise.in",
      mailusername: "new_user_diwise",
      mailpassword: "new_user_diwise@2025",
    },
    {
      key: "3",
      srNo: "3",
      mail: "info@diwise.in",
      mailusername: "new_user_diwise",
      mailpassword: "new_user_diwise@2025",
    },
  ];
  //end email data

  // get all domains
  const getAllDomains = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/getAllDomain`
      );

      console.log(response,">>>");
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllDomains();
  }, [])

  return (
    <>
      <div className="dashboard-parent parent">
        <div className="dashboard-cont cont">
          {/* //----------------Top Section For All Details Related Domain---------------// */}
          <div className="top-section">
            <div className="domain-deatil-heading">
              <h3>Domain Details:</h3>
              <span>
                <CiEdit />
              </span>
            </div>
            <div className="domain-details">
              <div className="detail-left">
                <p>
                  Domain Name : <span>Lorem ipsum dolor sit.</span>{" "}
                </p>
                <p>
                  Purchase Platform : <span>15/3/24</span>{" "}
                </p>
                <p>
                  Purchase Date : <span>pqr</span>{" "}
                </p>
                <p>
                  Expiry Date : <span>12/2/25</span>{" "}
                </p>
              </div>
            </div>

            <div className="login-detail">
              <p>
                Login URL : <span>https://hotinger.com</span>
              </p>
              <p>
                User Name : <span>this is username</span>
              </p>
              <p>
                Password : <span>this is password</span>
              </p>
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

          {/* //-------------------Website login details ----------------// */}

          <div className="fourth-section">
            <h3>Website Login Details:</h3>
            <div className="website-list">
              <Table
                columns={columnsweb}
                dataSource={webdata}
                pagination={{ pageSize: 5 }}
                bordered
              />
            </div>
          </div>

          {/* //--------------Email List for domain -------------------// */}
          <div className="fifth-section">
            <h3>Email Login Details:</h3>
            <div className="email-list">
              <Table
                columns={columnsemail}
                dataSource={emaildata}
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
