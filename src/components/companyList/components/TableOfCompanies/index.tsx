import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { IFormDataType } from "../../../../types";

interface Iprops {
  companiesData: IFormDataType[];
  selectStatusOptions: string[];
  tableFilter: string;
  setTableFilter: (value: string) => void;
  tablePage: string;
  setTablePage: (value: string) => void;
  removeCompany: (value: string) => void;
  editCompany: (value: IFormDataType) => void;
}

const TableOfCompanies = ({
  companiesData,
  selectStatusOptions,
  tableFilter,
  setTableFilter,
  tablePage,
  setTablePage,
  removeCompany,
  editCompany,
}: Iprops) => {
  const [actualTable, setActualTable] = useState(companiesData);
  const page_size = 10;
  const rangeOfPagination = Math.ceil(companiesData.length / page_size);

  const convertDate = (data: string) => {
    return data.split("T")[0];
  };

  const paginateTable = (arr: any, size: number) => {
    return arr.reduce((acc: any, val: any, i: number) => {
      let idx = Math.floor(i / size) + 1;
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  };

  useEffect(() => {
    setActualTable(paginateTable(companiesData, page_size)[tablePage]);
  }, [tablePage, companiesData]);

  const createPagination = () => {
    let arrayOfPagitanionContainer = [];
    for (let i = 1; i <= rangeOfPagination; i++) {
      arrayOfPagitanionContainer.push(
        <PaginationItem
          key={i}
          active={i.toString() === tablePage}
          onClick={() => setTablePage(i.toString())}
        >
          <PaginationLink>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return arrayOfPagitanionContainer;
  };

  return (
    <>
      {!tablePage && (
        <div className={`text-center`}>
          <p>No Data</p>
        </div>
      )}
      <div className={`d-flex justify-content-end mt-5`}>
        <FormGroup className={`w-25`}>
          <Label for="SelectMulti">Select Multiple</Label>
          <Input
            type="select"
            name="select"
            value={tableFilter}
            onChange={(e) =>
              setTableFilter(e.target.value === null ? "" : e.target.value)
            }
            id="SelectMulti"
          >
            <option></option>
            {selectStatusOptions.map((el: string, i: number) => {
              return <option key={el + i}>{el}</option>;
            })}
          </Input>
        </FormGroup>
      </div>
      {actualTable && (
        <Table striped className={`mt-1`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Company name</th>
              <th>Status</th>
              <th>Company adress</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {actualTable.map((el: IFormDataType, i: number) => {
              return (
                <tr key={el.id + i}>
                  <th scope="row">{i + 1}</th>
                  <td>{el.name}</td>
                  <td>{el.status}</td>
                  <td>{el.address}</td>
                  <td>{convertDate(el.startDate)}</td>
                  <td>
                    <Trash
                      onClick={() => removeCompany(el.id)}
                      className={`mr-2 pointerCursor`}
                    />
                    <Pencil
                      className={`pointerCursor`}
                      onClick={() => editCompany(el)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <div>
        <Pagination size="sm">{createPagination()}</Pagination>
      </div>
    </>
  );
};
export default TableOfCompanies;
