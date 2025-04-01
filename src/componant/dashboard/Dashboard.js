import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { Input, Modal, Space, Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const Dashboard = ({ getDomains }) => {
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          autoFocus
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <a
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
          >
            Reset
          </a>
          <a onClick={() => confirm()}>Search</a>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const [masterData, setMasterData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Functions to handle Modal state
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // Here you can add your logic to handle form submission
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //subdomain data
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Subdomain Name",
      dataIndex: "subdomain",
      key: "subdomain",
      width: "20%",
      ...getColumnSearchProps("subdomain"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "70%",
      ...getColumnSearchProps("description"),
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

  //end subdomain data

  //website data
  const columnsweb = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Website URL",
      dataIndex: "websiteUrl",
      key: "websiteUrl",
      width: "20%",
      ...getColumnSearchProps("websiteUrl"),
    },
    {
      title: "Website Platform",
      dataIndex: "websitePlatfrom",
      key: "websitePlatfrom",
      width: "20%",
      ...getColumnSearchProps("websitePlatfrom"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "19%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: "19%",
      ...getColumnSearchProps("password"),
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

  //end website data

  //Email data
  const columnsemail = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Webmail ID",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Mail Username",
      dataIndex: "mailusername",
      key: "mailusername",
      width: "30%",
      ...getColumnSearchProps("mailusername"),
    },
    {
      title: "Mail Password",
      dataIndex: "mailpassword",
      key: "mailpassword",
      width: "30%",
      ...getColumnSearchProps("mailpassword"),
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

  //end email data

  const handleMasterData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/getMasterDataId?domainId=${id}`
      );

      setMasterData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (getDomains.length > 0) {
      const defaultId = getDomains[0]?.id;
      console.log("Default ID:", defaultId);

      const id = searchParams.get("id");
      handleMasterData(id || defaultId);
    }
  }, [getDomains]);

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
                  Domain Name : <span>{masterData?.[0]?.Domain}</span>{" "}
                </p>
                <p>
                  Purchase Platform :{" "}
                  <span>{masterData?.[0]?.purchasePlatform}</span>{" "}
                </p>
                <p>
                  Purchase Date :{" "}
                  <span>{masterData?.[0]?.purchaseDate.split("T")[0]}</span>{" "}
                </p>
                <p>
                  Expiry Date :{" "}
                  <span>{masterData?.[0]?.expiryDate.split("T")[0]}</span>{" "}
                </p>
              </div>
            </div>

            <div className="login-detail">
              <p>
                Login URL : <span>{masterData?.[0]?.platformUrl}</span>
              </p>
              <p>
                User Name : <span>{masterData?.[0]?.username}</span>
              </p>
              <p>
                Password : <span>{masterData?.[0]?.password}</span>
              </p>
            </div>
          </div>

          {/* //----------------Details for all created subdomain -------------------// */}
          <div className="middle-section">
            <div className="under-middle">
              <h3>Subdomain List:</h3>
              <div className="add-btn">
                {" "}
                <Link to="/" className="btn" onClick={showModal}>
                  Add Subdomain
                </Link> 
              </div>
            </div>

            <div className="subdomain-list">
              <Table
                columns={columns}
                dataSource={masterData[0]?.subdomains || null}
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
                dataSource={masterData[0]?.websites}
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
                dataSource={masterData[0]?.emails}
                pagination={{ pageSize: 5 }}
                bordered
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Subdomain"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Subdomain Name:</p>
        <Input placeholder="Enter subdomain name" />
        <p>Description:</p>
        <TextArea placeholder="Enter description" rows={4} />
      </Modal>
    </>
  );
};

export default Dashboard;
