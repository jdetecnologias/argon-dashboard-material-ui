
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import ArgonTypography from "components/ArgonTypography";
import SidenavItem from "examples/Sidenav/SidenavItem";
import { useArgonController, setMiniSidenav } from "context";
import { useRecoilState } from "recoil";
import { metaDataListState } from "stateHandler/atoms/atoms";
import SidenavItemControlls from "examples/Sidenav/SidenavItemControlls";

function MenuItem({ routes }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split("/").slice(1)[0];
  const [metaDataList, setMetaDataList] = useRecoilState(metaDataListState)

  function setMetaDataItemShow(prop){
    const newList = metaDataList.map(item => {
                                                const newObj = Object.keys(item).reduce((obj,propr, index)=>{
                                                    obj[propr] = item[propr]
                                                    return obj;
                                                  },{}) 
                                                if(prop.some(propItem=>propItem === item.prop)) {
                                                  newObj.show = true;
                                                }else{
                                                  newObj.show = false;
                                                }
  
                                                return newObj;
                                              });
    
    setMetaDataList(()=>newList)
   }


  const renderControlls = ({ type, name, icon, metadataname, key, href, route, metadatanamelist = undefined })=>{ 

        return (
          <Link style={{opacity:metaDataList.some(metadata=>metadata.show && metadata.prop === metadataname)?"1":"0.5"}}  key={key}  rel="noreferrer">
            <SidenavItemControlls
              onClickControll={metadatanamelist?()=>setMetaDataItemShow(metadatanamelist):metadataname?()=>setMetaDataItemShow([metadataname]):()=>false}
              name={name}
              icon={icon}
              active={key === itemName}
            />
          </Link>
        );
      }

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, metadataname,key, href, route, metadatanamelist }) => {
    let returnValue;
    if (type === "controlls") {
      returnValue =  renderControlls({ type, name, icon, metadataname,title, key, href, route,metadatanamelist })
    }else if (type === "route") {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem
              name={name}
              icon={icon}
              active={key === itemName}
              noCollapse={noCollapse}
            />
          </Link>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavItem name={name} icon={icon} active={key === itemName} />
          </NavLink>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }

    return returnValue;
  });



  

  return (
      <List>
        {renderRoutes}
      </List>
  );
} 

// Setting default values for the props of Sidenav
MenuItem.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
MenuItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuItem;
