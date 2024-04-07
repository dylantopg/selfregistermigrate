import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";

import * as Yup from "yup";
import { Formik, Form } from "formik";

export default function App() {
  const formSchema = Yup.object().shape({
    nombreMonitor: Yup.string()
      .max(255, "Máximo 255 caracteres")
      .required("Campo requerido"),
    accion: Yup.string().required("Campo requerido"),
    unidades: Yup.number().positive().integer().required(),
    comentario: Yup.string(),
  });

  return (
    <>
      <h1>Registro de actividades</h1>
      <Formik
        initialValues={{
          nombreMonitor: "",
          accion: "",
          unidades: "",
          comentario: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <TextField
            name="nombreMonior"
            label="Nombre Monitor"
            variant="outlined"
            margin="normal"
            type="text"
            fullWidth
          />
          <RadioGroup>
            <FormControlLabel
              name="accion"
              value="ingreso"
              control={<Radio />}
              label="Ingreso"
            />
            <FormControlLabel
              name="accion"
              value="salida"
              control={<Radio />}
              label="Salida"
            />
          </RadioGroup>
          <TextField
            min="0"
            name="unidades"
            label="Unidades intervenidas"
            type="number"
            fullWidth
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Observaciones"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => {
                alert("clicked");
              }}
            >
              Registrar!
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}
