import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { db } from "./firebase"; // Assuming you have a Firebase configuration set up

export default function App() {
  const [nombreMonitor, setNombreMonitor] = useState("");
  const [accion, setAccion] = useState("");
  const [unidades, setUnidades] = useState(0);
  const [comentario, setComentario] = useState("");

  const formSchema = Yup.object().shape({
    nombreMonitor: Yup.string()
      .max(255, "Máximo 255 caracteres")
      .required("Campo requerido"),
    accion: Yup.string(),
    unidades: Yup.number().positive().integer(),
    comentario: Yup.string(),
  });
  const [option, setOption] = useState("Salida");
  const [fielDisabled, setFielDisabled] = useState(false);

  const handleOptionChange = (event) => {
    setOption(event.target.value);
    //si el valor seleccionado es entrada, deshabilita los campos
    setFielDisabled(event.target.value === "Entrada");
  };

  const addRegistro = async (values) => {
    try {
      const response = await fetch("https://api.ipify.org");
      const ip = await response.text();

      const docRef = await addDoc(collection(db, "registros"), {
        ...values,
        timestamp: new Date().toISOString(),
        ip,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
        onSubmit={addRegistro}
      >
        <Form>
          <TextField
            required
            name="nombreMonitor"
            label="Nombre Monitor"
            variant="outlined"
            margin="normal"
            type="text"
            fullWidth
            value={nombreMonitor}
            onChange={(e) => setNombreMonitor(e.target.value)}
          />
          <ErrorMessage
            name="nombreMonitor"
            component="div"
            className="field-error text-danger"
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={option}
            name="radio-buttons-group"
            onChange={handleOptionChange}
          >
            <FormControlLabel
              name="accion"
              value="Entrada"
              control={<Radio />}
              label="Entrada"
              onChange={(e) => setAccion(e.target.value)}
            />
            <FormControlLabel
              name="accion"
              value="Salida"
              control={<Radio />}
              label="Salida"
              onChange={(e) => setAccion(e.target.value)}
            />
          </RadioGroup>
          <TextField
            min="0"
            name="unidades"
            label="Unidades intervenidas"
            type="number"
            fullWidth
            value={unidades}
            onChange={(e) => setUnidades(parseInt(e.target.value))}
            disabled={fielDisabled}
          />
          <TextField
            name="comentario"
            id="outlined-multiline-flexible"
            label="Observaciones"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            disabled={fielDisabled}
          />
          <ErrorMessage
            name="comentario"
            component="div"
            className="field-error text-danger"
          />
          <Box textAlign="center">
            <Button variant="contained" onClick={addRegistro}>
              Registrar!
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}
