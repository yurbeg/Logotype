import logotTypeImg from "../../Images/Logotype.png";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { items } from "../../core/constants/constants";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../state-managment/slice";
import "./index.css";

const Header = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const originalData = useSelector((state) => state.data.originalData);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() !== "") {
      const filtered = originalData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setDate(filtered));
    } else {
      dispatch(setDate(originalData));
    }
  };

  const handleInputBlur = () => {
    setIsSearchActive(false);
  };

  const handleDrawerToggle = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="mobile-menu-icon">
          <MenuOutlined onClick={handleDrawerToggle} />
        </div>
        <img src={logotTypeImg}  alt="Logo" className="header-logo" />
        {isSearchActive ? (
          <input
            type="text"
            className="header-search-input"
            value={searchValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Search..."
            autoFocus
          />
        ) : (
          <SearchOutlined
            className="header-search-icon"
            onClick={handleSearchClick}
          />
        )}
      </div>
      <div className="menu-container">
        <Menu mode="horizontal" items={items} className="header-menu" />
      </div>
      <Drawer
        placement="left"
        onClose={handleDrawerToggle}
        open={drawerVisible}
        width={250}
        headerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        closable={true}
        closeIcon={<div style={{ marginRight: "20px" }}> X</div>}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <img src={logotTypeImg} alt="Logo" style={{ width: "120px" }} />
          </div>
        }
      >
        <Menu mode="inline" items={items} />
      </Drawer>
    </div>
  );
};

export default Header;
