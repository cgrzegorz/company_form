import React, { useState, useEffect, useCallback } from "react";
import HeaderWithModal from "./components/FormModal";
import TableOfCompanies from "./components/TableOfCompanies";
import { useLocation, useHistory } from "react-router";

import { Button } from "reactstrap";
import { PlusLg } from "react-bootstrap-icons";
import { IFormDataType } from "../../types";

const CompanyList = () => {
  let query = new URLSearchParams(useLocation().search);
  const selectStatusOptions = ["Trial", "Customer", "Dead"];
  const history = useHistory();

  const [companiesData, setCompaniesData] = useState(
    JSON.parse(localStorage.getItem("companyList")!)
  );
  const [editCompanyData, setEditCompanyData] = useState<IFormDataType | null>(
    null
  );
  const [tableFilter, setTableFilter] = useState(query.get("filter") || "");
  const [tablePage, setTablePage] = useState(query.get("page") || "1");
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);

  const checkStatusOfCompany = useCallback(
    (company: IFormDataType[]) => {
      const filter = (value: IFormDataType) => {
        return value.status === tableFilter;
      };
      return company.filter(filter);
    },
    [tableFilter]
  );

  useEffect(() => {
    if (tableFilter === "") {
      history.push({
        pathname: "/companies",
        search: `?page=${tablePage}`,
      });
      setCompaniesData(JSON.parse(localStorage.getItem("companyList")!));
      return;
    }
    history.push({
      pathname: "/companies",
      search: `?filter=${tableFilter}&page=${tablePage}`,
    });
    setTablePage("1");

    let newDataFilter = checkStatusOfCompany(
      JSON.parse(localStorage.getItem("companyList")!)
    );
    setCompaniesData(newDataFilter);
  }, [tableFilter, tablePage, history, checkStatusOfCompany]);

  const sendData = (data: IFormDataType) => {
    let companyArray = JSON.parse(localStorage.getItem("companyList") || "[]");
    companyArray.push(data);
    localStorage.setItem("companyList", JSON.stringify(companyArray));
    setCompaniesData(JSON.parse(localStorage.getItem("companyList")!));
    history.push({
      pathname: "/companies",
    });
    setTableFilter("");
    toggle();
  };

  const removeCompanyHandle = (id: string) => {
    companiesData.forEach((el: IFormDataType) => {
      if (el.id === id) {
        let filterArray = JSON.parse(
          localStorage.getItem("companyList")!
        ).filter((el: IFormDataType) => {
          return el.id !== id;
        });
        localStorage.setItem("companyList", JSON.stringify(filterArray));
        setCompaniesData(filterArray);
        history.push({
          pathname: "/companies",
          search: `?page=${tablePage}`,
        });
        setTableFilter("");

        return;
      }
    });
  };

  const editCompanyHandle = (company: IFormDataType) => {
    toggle();
    let updateArray = JSON.parse(localStorage.getItem("companyList")!).map(
      (el: IFormDataType, i: string) => {
        if (el.id === company.id) {
          companiesData[i] = company;
          return companiesData[i];
        }
        return el;
      }
    );
    toggle();
    localStorage.setItem("companyList", JSON.stringify(updateArray));
    let newDataFilter = checkStatusOfCompany(
      JSON.parse(localStorage.getItem("companyList")!)
    );
    setCompaniesData(newDataFilter);
    history.push({
      pathname: "/companies",
      search: `?filter=${tableFilter}&page=${tablePage}`,
    });
  };

  const editCompany = (company: IFormDataType) => {
    setEditCompanyData(company);
    toggle();
  };

  const addCompany = () => {
    setEditCompanyData(null);
    toggle();
  };

  return (
    <>
      <div>
        <div className={`pt-5 d-flex justify-content-between`}>
          <h2>Company List</h2>
          <Button
            color="primary"
            className={`d-flex justify-content-center align-items-center primary-button`}
            onClick={() => addCompany()}
          >
            <PlusLg className={`mr-2`} />{" "}
            <span className={`primary-button__text`}>Add company</span>
          </Button>
        </div>
        {openModal && (
          <HeaderWithModal
            selectStatusOptions={selectStatusOptions}
            sendData={sendData}
            editCompanyData={editCompanyData}
            toggle={toggle}
            editDataHandle={editCompanyHandle}
          />
        )}
      </div>
      {!companiesData && (
        <div className={`text-center`}>
          <p>No Data</p>
        </div>
      )}
      {companiesData && (
        <TableOfCompanies
          tableFilter={tableFilter}
          setTableFilter={setTableFilter}
          selectStatusOptions={selectStatusOptions}
          companiesData={companiesData}
          tablePage={tablePage}
          setTablePage={setTablePage}
          removeCompany={removeCompanyHandle}
          editCompany={editCompany}
        />
      )}
    </>
  );
};

export default CompanyList;
