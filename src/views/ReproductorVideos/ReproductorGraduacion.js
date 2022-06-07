import ReactPlayer from "react-player";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom"
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Reproductor = () => {
    return (
        <div className="App" style={{width:'100%', height:'100%', position:'absolute'}}>
            <Tooltip style={{position:"fixed", zIndex:999}} title="Home">
              <Link to="/">
                <IconButton><HomeIcon /></IconButton>
              </Link>
            </Tooltip>
        <ReactPlayer
        url="https://emergencia24horas.segurospiramide.com/node/ImagenesPira/Graduacion2021.mp4"
        width='100%'
        height='100%'
        controls
        playing
        />
       </div>
    )
}

export default Reproductor