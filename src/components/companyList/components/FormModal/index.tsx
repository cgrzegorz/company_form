import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { IFormDataType } from "../../../../types";

interface Iprops {
  sendData: (value: IFormDataType) => void;
  selectStatusOptions: string[];
  editCompanyData: IFormDataType | null;
  toggle: () => void;
  editDataHandle: (value: IFormDataType) => void;
}

const HeaderWithModal = ({
  sendData,
  selectStatusOptions,
  editCompanyData,
  toggle,
  editDataHandle,
}: Iprops) => {
  const initState = {
    name: editCompanyData?.name ? editCompanyData.name : "",
    status: editCompanyData?.status ? editCompanyData.status : "",
    address: editCompanyData?.address ? editCompanyData.address : "",
    id: editCompanyData?.id ? editCompanyData.id : uuidv4(),
    startDate: editCompanyData?.startDate
      ? new Date(editCompanyData?.startDate)
      : new Date(),
  };

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (values) => {
      if (editCompanyData) {
        editDataHandle(values);
      } else {
        sendData(values);
      }
    },
  });

  return (
    <>
      <Modal isOpen={true}>
        <Form onSubmit={formik.handleSubmit}>
          <ModalHeader>
            {editCompanyData ? "Edit Company" : "Add company"}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selectStatusCompany">Select</Label>
              <Input
                id="selectStatusCompany"
                name="status"
                type="select"
                onChange={formik.handleChange}
                value={formik.values.status}
                required={true}
              >
                <option></option>
                {selectStatusOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="adress">Company Adress</Label>
              <Input
                id="adress"
                name="address"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.address}
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <Label>My Date Picker</Label>
              <DatePicker
                selected={formik.values.startDate}
                // dateFormat="mm-dd-yyyy"
                name="startDate"
                className={`form-control`}
                onChange={(date) => formik.setFieldValue("startDate", date)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color={editCompanyData ? "warning" : "primary"}
              type="submit"
            >
              {editCompanyData ? "Edit Company" : "Add company"}
            </Button>{" "}
            <Button color="secondary" onClick={() => toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default HeaderWithModal;
