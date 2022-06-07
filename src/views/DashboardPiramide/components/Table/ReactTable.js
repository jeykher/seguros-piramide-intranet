/*eslint-disable*/
import React,{useState, useContext, useEffect} from "react";
import {
  useTable,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import classnames from "classnames";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from '@mui/material/Button';
import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import "../Table/styleModules.scss"
import styled from "styled-components"
import {DataDashboardContext} from "views/DashboardPiramide/context/ContextDashboard"
import ModalVac from "../Modal/ModalVac";

    const ButtonColor = styled(Button)`
    background:${props => props.id === 1 ? "linear-gradient(60deg,#b16f00,#e78810) !important" : 
    props.id === 2 ? "linear-gradient(60deg,#234d25,#43a047) !important" :
    props.id === 3 ? "linear-gradient(60deg,#959595,#d40a0a) !important" :
    props.id === 4 ? "linear-gradient(60deg,#3b516d,#00acc1) !important" : "linear-gradient(60deg,#b16f00,#e78810) !important" };
    color:white !important;
    border-radius:20px !important;
    `;

    const Nota = styled.span`
    font-size: 20px;
    padding: 1rem;
    `;
const newStyles = {
  ...styles,
  formControlMargins: {
    margin: "3px 0 !important",
  },
  gridContainer: {
    justifyContent: "center",
  },
};

const useStyles = makeStyles(newStyles);
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  
  return (
    <CustomInput
    formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: filterValue || "",
        onChange: (e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        },
        placeholder: `Buscar ${count} registros...`,
      }}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component

function Table({ columns, data, id}) {
  const [numberOfRows, setNumberOfRows] = React.useState(5);
  const [pageSelect, handlePageSelect] = React.useState(0);
  // const [diapend, setDiaPend] = useState({pend:"",periodo:[]})
 
  const classes = useStyles();
  
  // console.log(diapend)
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
    );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
    );
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state,
      visibleColumns,
      nextPage,
      pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useFilters, // useFilters!
    useSortBy,
    usePagination
    );
    
    // console.log("page: ", page, "state: ", state)
    
    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10);
    let pageSelectData = Array.apply(
    null,
    Array(pageOptions.length)
  ).map(function () {});
  let numberOfRowsData = [5, 10, 20];
  
  

  const {modalVac, handleOpenModal, setModalVac, diapend, totalDays, handlePend} = useContext(DataDashboardContext)

    return (
      <>
      {modalVac && (
        <ModalVac/>
      )}
      <div className="ReactTable -striped -highlight">
        {id === 4 ? <Nota>
          Seleccione el/los periodos a disfrutar.
        </Nota> : null}
        
        <table {...getTableProps()} className="rt-table">
          <thead className="rt-thead -header">
            
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps(column.id != "actions" && column.id != "saldo" && column.getSortByToggleProps())}
                      // column.id != "actions" || column.id != "checkbox"  &&
                    className={classnames("rt-th rt-resizable-header", {
                      "-cursor-pointer": headerGroup.headers.length - 1 !== key,
                      "-sort-asc": column.isSorted && !column.isSortedDesc,
                      "-sort-desc": column.isSorted && column.isSortedDesc,
                    })}
                  
                  >
                    <div className={column.id != "actions" && column.id != "saldo" ? "rt-resizable-header-content" : "rt-resizable-header-content-action"}>
                      {column.render("Header")}
                    </div>
                    {/* Render the columns filter UI */}
                    {/* <div>
                    {
                      (id === 3 ? headerGroup.headers.length - 0 : headerGroup.headers.length - 1) === key
                        ? 
                        null
                        : column.canFilter
                        ? column.render("Filter")
                        : null
                        
                    } 
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="rt-tbody">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={classnames("rt-tr",{ " -odd": i % 2 === 0 },{ " -even": i % 2 === 1 },{" -pend": row.original.isPend})}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="rt-td">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
         <div className="pagination-top">
          <div className="-pagination">
            <div className="-previous">
              {/* <ButtonColor
                variant="Previous"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                // style={{background:"rgb(7 82 244)",color:"white",borderRadius:20}}
                className="-btn"
                id={id}
              >
                Anterior
              </ButtonColor> */}
            </div>
            <div className="-center">
              <GridContainer className={classes.gridContainer} >
                <GridItem xs={12} sm={6} md={4}  style={{width:800}}>
                  <FormControl
                    fullWidth
                    className={
                      classes.selectFormControl +
                      " " +
                      classes.formControlMargins
                    }
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={pageSelect}
                      onChange={(event) => {
                        gotoPage(event.target.value);
                        handlePageSelect(event.target.value);
                      }}
                      inputProps={{
                        name: "pageSelect",
                        id: "page-select",
                      }}
                    >
                      {pageSelectData.map((prop, key) => {
                        return (
                          <MenuItem
                            key={key}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={key}
                          >
                            Pagina {key + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    className={
                      classes.selectFormControl +
                      " " +
                      classes.formControlMargins
                    }
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={numberOfRows}
                      onChange={(event) => {
                        setPageSize(event.target.value);
                        setNumberOfRows(event.target.value);
                      }}
                      inputProps={{
                        name: "numberOfRows",
                        id: "number-of-rows",
                      }}
                    >
                      {numberOfRowsData.map((prop) => {
                        return (
                          <MenuItem
                            key={prop}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={prop}
                          >
                            {prop} Filas
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </div>
            {
              id === 3 ? (
                <div
             className="-next"
             >
            </div>
              ):(
                <div
             className="-next"
             >
              <ButtonColor
                 disabled={totalDays.length > 0 ? false : true}
                 onClick={
                    handleOpenModal
                 }
                className="-btn"
                id={id}
              >
                Enviar Solicitud
              </ButtonColor>
            </div>
              )
            }
            {/* <div
             className="-next"
             >
              <ButtonColor
                // variant="Next"
                // onClick={() => nextPage()}
                // disabled={!canNextPage}
                 onClick={handleOpenModal
                  // handlePend(prop);
                }
                className="-btn"
                id={id}
              >
                Solicitar
              </ButtonColor>
            </div> */}
          </div>
        </div>
        <div className="pagination-bottom"></div>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default Table;

