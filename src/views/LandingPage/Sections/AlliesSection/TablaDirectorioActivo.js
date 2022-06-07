import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { makeStyles } from "@material-ui/core/styles";
import { visuallyHidden } from '@mui/utils';
import { TextField, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import useDirectorioActivo from "../../../../hooks/useDirectorioActivo"

const TitleHead = styled.div`
  
table>thead>tr>th{
  color:white !important;
  font-weight: 800px;

}
`;
function createData(Nombre, Apellido, Extensión, Cargo, Ubicacion, Correo) {
  return {
    Nombre,
    Apellido,
    Extensión,
    Cargo,
    Ubicacion,
    Correo
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly


const headCells = [
  {
    id: 'Nombre',
    numeric: false,
    disablePadding: true,
    label:'Nombre',
  },
  {
    id: 'Apellido',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'Cargo',
    numeric: true,
    disablePadding: false,
    label: 'Cargo',
  },
  {
    id: 'Extensión',
    numeric: true,
    disablePadding: false,
    label: 'Extensión',
  },
  {
    id: 'Ubicacion',
    numeric: true,
    disablePadding: false,
    label: 'Ubicacion',
  },
  {
    id: 'Email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center' /*{headCell.numeric = 'center'}*/
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const EnhancedTable = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Apellido');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [arrayActivo, setArrayActivo] = useState()
  const [busqueda, setBusqueda] = useState(''); 
  const [data, setData] = useState([]);

 
  function stableSort(array, comparator) {
    console.log(array)
    const stabilizedThis = array?.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      // console.log(order)
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    // const aux = stabilizedThis?.map((el) => el[0]);
    // console.log(aux)
    return stabilizedThis?.map((el) => el[0]);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.Nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Nombre) => {
    const selectedIndex = selected.indexOf(Nombre);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Nombre);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Nombre) => selected.indexOf(Nombre) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.directorioActivo.length) : 0;
  return (
    <Box sx={{ width: '100%' }}>
        <Grid item md={2} style={{display:"flex", marginLeft:30, marginRight:"auto", marginBottom:20}}>
                    <TextField
                      label="Buscar Empleado"
                      value={busqueda}
                       onChange={(e)=> {
                           setBusqueda(e.target.value)
                       }}
                       fullWidth
                       InputProps={{
                           startAdornment: (
                             <InputAdornment position="start">
                               <SearchIcon />
                             </InputAdornment>
                           ),
                         }}
                   />
                   </Grid>
      <Paper sx={{ width: '100%', mb: 2 }} style={{marginBottom: 0}}>
        
        <TableContainer>
          <TitleHead>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.directorioActivo.length}
            />
            <TableBody>
           
              {stableSort(props.directorioActivo, getComparator(order, orderBy))
                ?.filter((item) => {
                  if (busqueda == "") {
                    return item;
                  }
                  else if(
                    JSON.stringify(item.APELLIDO1)?.includes(busqueda?.toUpperCase()) ||
                    JSON.stringify(item.NOMBRE1)?.includes(busqueda?.toUpperCase()) ||
                    JSON.stringify(item.EXTENSION_TELF)?.includes(busqueda.substring(0,1).toUpperCase() == 0 ? busqueda.substring(1).toUpperCase():busqueda.toUpperCase()) ||
                    JSON.stringify(item.NOMBRE_CARGO)?.includes(busqueda?.toUpperCase()) ||
                    JSON.stringify(item.NOMBRE_UBICACION)?.includes(busqueda?.toUpperCase()) ||
                    JSON.stringify(item.CORREO_ELECTRONICO)?.includes(busqueda?.toLowerCase())
                    ){
                      return item
                    }
            
                })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row.Nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Nombre)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Nombre}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.NOMBRE1}
                      </TableCell>
                      <TableCell align="center">{row.APELLIDO1}</TableCell>
                      <TableCell align="left">{row.NOMBRE_CARGO}</TableCell>
                      <TableCell align="center">{row.EXTENSION_TELF == null ? '-' :row.EXTENSION_TELF.toString().length == 3 ? "0" + row.EXTENSION_TELF :row.EXTENSION_TELF}</TableCell>
                      <TableCell align="left">{row.NOMBRE_UBICACION}</TableCell>
                      <TableCell align="left">{row.CORREO_ELECTRONICO}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          </TitleHead>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 25]}
          component="div"
          count={stableSort(props.directorioActivo, getComparator(order, orderBy))
            ?.filter((item) => {
              if (busqueda == "") {
                return item;
              }
              else if(
                JSON.stringify(item.APELLIDO1)?.includes(busqueda?.toUpperCase()) ||
                JSON.stringify(item.NOMBRE1)?.includes(busqueda?.toUpperCase()) ||
                JSON.stringify(item.EXTENSION_TELF)?.includes(busqueda.substring(0,1).toUpperCase() == 0 ? busqueda.substring(1).toUpperCase():busqueda.toUpperCase()) ||
                JSON.stringify(item.NOMBRE_CARGO)?.includes(busqueda?.toUpperCase()) ||
                JSON.stringify(item.NOMBRE_UBICACION)?.includes(busqueda?.toUpperCase()) ||
                JSON.stringify(item.CORREO_ELECTRONICO)?.includes(busqueda?.toUpperCase())
                ){
                  return item
                }
        
            }).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}

export default EnhancedTable