import React, { useRef, useState } from "react";
import "./home.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { RiDeleteBin5Line } from "react-icons/ri";

const data = [
  {
    key: "1",
    name: "diwise.uk",
    from: "info@diwise.uk",
    to: "info@diwise.uk",
    status: "Success",
    date: "19 March 2025",
    time: "12:02",
  },
  {
    key: "2",
    name: "diwise.in",
    from: "info@diwise.uk",
    to: "info@diwise.in",
    status: "Success",
    date: "19 March 2025",
    time: "12:02",
  },
  {
    key: "3",
    name: "diwiseglobal.com",
    from: "info@diwise.uk",
    to: "info@diwiseglobal.com",
    status: "Pending",
    date: "19 March 2025",
    time: "12:02",
  },
  {
    key: "4",
    name: "onkarworld.com",
    from: "info@diwise.uk",
    to: "info@onkarworld.com",
    status: "Failed",
    date: "19 March 2025",
    time: "12:02",
  },
  {
    key: "5",
    name: "onkarworld.com",
    from: "info@diwise.uk",
    to: "info@onkarworld.com",
    status: "Failed",
    date: "19 March 2025",
    time: "12:02",
  },
  {
    key: "6",
    name: "diwiseglobal.com",
    from: "info@diwise.uk",
    to: "info@diwiseglobal.com",
    status: "Pending",
    date: "19 March 2025",
    time: "12:02",
  },
];

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "sr.no",
      key: "sr.no",
      width: 60,
      responsive: ["sm"],
      render: (text, record, index) => index + 1,
    },
    {
      title: "Domain Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    { title: "Email From", dataIndex: "from", key: "from", width: "20%" },
    { title: "Email To", dataIndex: "to", key: "to", width: "20%" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => {
        let color = "";
        switch (status.toLowerCase()) {
          case "success":
            color = "#d4edda";
            break; // Green
          case "pending":
            color = "#fff3cd";
            break; // Yellow
          case "failed":
            color = "#f8d7da";
            break; // Red
          default:
            color = "#ffffff";
        }
        return (
          <span
            style={{
              backgroundColor: color,
              padding: "4px 8px",
              borderRadius: "10px",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            {status}
          </span>
        );
      },
    },
    { title: "Date", dataIndex: "date", key: "date", width: "10%" },
    { title: "Time", dataIndex: "time", key: "time", width: "10%" },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: () => <RiDeleteBin5Line />,
    },
  ];

  return (
    <div className="home-parent parent">
      <div className="home-cont cont">
        <h2>Email Testing System </h2>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 800 }} />
    </div>
  );
};

export default Home;
