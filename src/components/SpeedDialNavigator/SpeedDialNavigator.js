import react, {useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PiramideBrand from '../PiramideBrand/PiramideBrand';
import {useSpeedDial} from "../../Context/ContextSpeedDial"
import {Container} from "../SpeedDialNavigator/style/style"
import {DataSpeedDial} from "../../Context/ContextSpeedDial"


const SpeedDialNavigator = () => {
    const {speedDialNavigatorElements}= useSpeedDial();

    const [offset, setOffset] = useState(0);

const handleHiddenChange = (event) => {
    setHidden(event.target.value);
  };

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  

    return (
        <>
        {
            offset >= 850 ? (<Container>
                <Box 
                    sx={{ 
                        flexGrow: 1 
                    }}>
    
                        <SpeedDial
                        value={offset}
                        onChange={handleHiddenChange}
                            ariaLabel="SpeedDial Navigator"
                            icon={
                                <PiramideBrand 
                                    width="30"
                                    height="40"
                                />
                            }
                        >
                           {
                               speedDialNavigatorElements.map(speedDialNavigatorElement => {
                                   const { id, componentIcon, tooltipTitle } = speedDialNavigatorElement; 
                                   return (                                          
                                       <SpeedDialAction 
                                           className="ipos-speeddial-navigator-item"
                                           key={id}
                                           icon={componentIcon}
                                           tooltipTitle={tooltipTitle}
                                       />
                                   )
                               })
                           }
                        </SpeedDial>
                </Box>
            </Container>) : null
        }
        
        </>
    );
};

export default SpeedDialNavigator;