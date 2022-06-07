import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';
import styled from "styled-components"

import styles from "assets/jss/material-kit-react/components/infoStyle.js";
const ImageNew = styled.img`
    position: absolute;
    height: 160px;
    width: 155px;
    z-index: 1;
    left: -24px;
    padding: 40px;
    top: -40px;
`;
const useStyles = makeStyles(styles);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor, vertical,img, load, newPublic} = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });
  return (
    <div className={classes.infoArea} >
      <div className={iconWrapper}>
        {/* <props.icon className={iconClasses} /> */}
        {load? <Skeleton variant="rectangular"height={120}/>:newPublic?<span><img className={iconClasses} src={img}/> <ImageNew src="new.png"/></span>:<img className={iconClasses} src={img}/>}
      </div>
      <div className={classes.descriptionWrapper} style={{height: "210px"}}>
        {/* <img src={img}/> */}
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray",
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // iconColor: PropTypes.oneOf([
  //   "primary",
  //   "warning",
  //   "danger",
  //   "success",
  //   "info",
  //   "rose",
  //   "gray",
  // ]),
  vertical: PropTypes.bool,
};
