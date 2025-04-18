import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { Input, Modal, Space, Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import { BsStopBtn } from "react-icons/bs";

const Dashboard = ({ getDomains }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const defaultId = getDomains[0]?.id;

  const [subdomain, setSubdomain] = useState({
    domainId: defaultId,
    subdomain: "",
    description: "",
  });

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const paramId = searchParams.get("id");
  useEffect(() => {
    setSubdomain((prev) => ({
      ...prev,
      domainId: Number(paramId || defaultId),
    }));
  }, [searchParams, defaultId]);

  const handleSubdomainByID = async (id) => {
    try {
      const response = await axios.get(
        ` ${process.env.REACT_APP_API}api/subdomain/getsubdomainBYId?subdomainId=${id}`
      );
      setIsModalVisible(true);
      navigate(`/?id=${paramId}&bId=${id}`);
      setSubdomain({
        subdomain: response.data.data[0].subdomain,
        description: response.data.data[0].description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubdomain = async () => {
    let response;
    const subDomainId = searchParams.get("bId");
    try {
      if (subdomain.subdomain === "" || subdomain.description === "") {
        alert("filter are not empty");
        return;
      }

      if (subDomainId) {
        response = await axios.put(
          ` ${process.env.REACT_APP_API}api/subdomain/editSubdomain?subdomainId=${subDomainId}`,
          subdomain
        );
      } else {
        response = await axios.post(
          ` ${process.env.REACT_APP_API}api/subdomain/addSubdomain`,
          subdomain
        );
      }

      alert(
        paramId
          ? "Subdomain Updated Successfully"
          : "Subdomain Added Successfully"
      );
      setIsModalVisible(false);
      navigate(`/?id=${paramId}`);
      window.location.reload();
      // Preserve domainId when resetting state
      setSubdomain({
        subdomain: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubDomain = async (id) => {
    try {
      const confirm = window.confirm("Are you sure want to delete ? ");

      if (!confirm) return;

      const response = await axios.delete(
        ` ${process.env.REACT_APP_API}api/subdomain/deleteSubdomain?subdomainId=${id}`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWebsite = async (id) => {
    try {
      const confirm = window.confirm("Are you sure want to delete ? ");

      if (!confirm) return;

      const response = await axios.delete(
        `${process.env.REACT_APP_API}api/website/deleteWebsite?websiteId=${id}`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
            href
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
          >
            Reset
          </a>
          <a href onClick={() => confirm()}>
            Search
          </a>
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

  // Modal Handlers
  const showModal = () => {
    setIsModalVisible(true);
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
      render: (text) => (
        <a href={`https://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
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
          <div
            className="edit-btn"
            onClick={() => handleSubdomainByID(record.subdomainId)}
          >
            <CiEdit />
          </div>
          <div
            className="delete-btn"
            onClick={() => deleteSubDomain(record.subdomainId)}
          >
            <MdDeleteForever />
          </div>
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
      render: (text) => (
        <a href={`${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
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
          <Link to={`add-website?id=${record.websiteId}`}>
            <CiEdit />
          </Link>
          <div
            className="delete-btn"
            onClick={() => deleteWebsite(record.websiteId)}
          >
            <MdDeleteForever />
          </div>
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
      render: (text, record) => (
        <div>
          <div>{text}</div>
          {record.parimaryTag === 1 && (
            <span style={{ 
              backgroundColor: "green", 
              color: "#fff", 
              fontSize: "12px", 
              padding: "2px 6px", 
              borderRadius: "5px", 
              marginTop: "0px", 
              display: "inline-block" 
            }}>
              Primary
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Mail Platform",
      dataIndex: "platform",
      key: "platform",
      width: "20%",
      ...getColumnSearchProps("platform"),
    },
    {
      title: "Mail Username",
      dataIndex: "username",
      key: "username",
      width: "30%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Mail Password",
      dataIndex: "password",
      key: "password",
      width: "20%",
      ...getColumnSearchProps("password"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`add-email?id=${record.emailId}`}>
            <CiEdit />
          </Link>
          <div
            className="delete-btn"
            onClick={() => deletedata(record.emailId)}
          >
            <MdDeleteForever />
          </div>
        </Space>
      ),
      width: "5%",
    },
  ];




  

  const handleMasterData = async (id) => {
    try {
      const response = await axios.get(
        ` ${process.env.REACT_APP_API}api/domain/getMasterDataId?domainId=${id}`
      );

      setMasterData(response.data.data);
      // console.log(response.data.data, "master data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getDomains.length > 0) {
      const defaultId = getDomains[0]?.id;
      console.log("Default ID:", defaultId);

      const id = searchParams.get("id");
      handleMasterData(id || defaultId);
    }
  }, [getDomains]);

  //-----------------Delete API ------------------------//
  const deletedata = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}api/email/deletEmail?emailId=${id}`
        );
        window.location.reload();

        toast.success("Data deleted successfully");
        handleMasterData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  //-------------------End Delete API-----------------//


 
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return (
    <>
      <div className="dashboard-parent parent">
        <div className="dashboard-cont cont">
          <div className="top-section">
            <div className="domain-deatil-heading">
              <h3>Domain Details:</h3>
              <Link to={`/add-domain?id=${masterData?.[0]?.domainId}`}>
                <CiEdit />
              </Link>
            </div>
            <div className="list">
              <ul>
                <li>
                  Domain Name:{" "}
                  <span>
                    <a
                      href={`https://${masterData?.[0]?.Domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {masterData?.[0]?.Domain}
                    </a>
                  </span>
                </li>

                <li>
                  Purchase Platform:{" "}
                  <span>{masterData?.[0]?.purchasePlatform}</span>
                </li>
                <li>
                  Purchase Date:{" "}
                  <span>
                    {" "}
                    {new Date(
                      masterData?.[0]?.purchaseDate.split("T")[0] || null
                    ).toLocaleDateString("en-GB", options)}
                  </span>
                </li>
                <li
                  className={
                    masterData?.[0]?.expiryStatus === 1
                      ? "active  expiredate"
                      : ""
                  }
                >
                  Expiry Date :{" "}
                  <span>
                    {" "}
                    {new Date(
                      masterData?.[0]?.expiryDate.split("T")[0] || null
                    ).toLocaleDateString("en-GB", options)}
                  </span>
                </li>
                <li>
                  {" "}
                  Login URL:{" "}
                  <span>
                    {" "}
                    <a
                      href={masterData?.[0]?.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {masterData?.[0]?.platformUrl}
                    </a>
                  </span>
                </li>
                <li>
                  User Name: <span>{masterData?.[0]?.username}</span>
                </li>
                <li>
                  Password :
                  <span className="new-password">
                    {showPassword ? masterData?.[0]?.password : "XXXXXXXXXXXX"}
                  </span>
                  <div className="eye-btn" onClick={togglePassword}>
                    {showPassword ? <BiHide size={16} /> : <BiShow size={16} />}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* //----------------Details for all created subdomain -------------------// */}
          <div className="middle-section">
            <div className="under-middle">
              <h3>Subdomain List:</h3>
              <div className="add-btn">
                {" "}
                <div className="btn" onClick={showModal}>
                  Add Subdomain
                </div>
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
      {/* //subdomain modal  */}
      <Modal
        title="Add Subdomain"
        visible={isModalVisible}
        onOk={handleSubdomain}
        onCancel={handleCancel}
      >
        <p>Subdomain Name:</p>
        <Input
          placeholder="Enter subdomain name"
          value={subdomain.subdomain}
          onChange={(e) =>
            setSubdomain((prev) => ({
              ...prev,
              subdomain: e.target.value,
            }))
          }
        />
        <p>Description:</p>
        <TextArea
          placeholder="Enter description"
          rows={4}
          value={subdomain.description}
          onChange={(e) =>
            setSubdomain((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Modal>
      ;
    </>
  );
};

export default Dashboard;
