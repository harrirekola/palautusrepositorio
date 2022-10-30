import { TextField, Grid, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from '../state/state';
import { HealthCheckEntry, HospitalEntry } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id" | "entries">;
export type HospitalEntryFormValues = Omit<HospitalEntry, 'id' | 'type'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

export const PatientEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue();

    return (
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          discharge: {
            date: '',
            criteria: ''
        }
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors:
                    | { [field: string]: string }
                    | { [key: string]: { [key: string]: string}} = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if(!values.discharge.criteria && !values.discharge.date) {
            errors.discharge = { criteria: requiredError, date: requiredError };
          }
          if(!values.discharge.criteria) {
            errors.discharge = { criteria: requiredError };
          }
          if(!values.discharge.date) {
            errors.discharge = { date: requiredError };
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Desc"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label='Discharge date'
                placeholder='yyyy-mm-dd'
                name='discharge.date'
                component={TextField}
              />
              <Field
                label='Discharge criteria'
                placeholder='discharge criteria'
                name='discharge.criteria'
                component={TextField}
              />
              <DiagnosisSelection
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
                />
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

export default PatientEntryForm;