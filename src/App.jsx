import { useState, useEffect } from "react";
import { TextField, RadioGroup, Radio, FormControlLabel, Button, Box } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { db } from "./firebase"; // Assuming you have a Firebase configuration set up

export default function App() {
  const [nombreMonitor, setNombreMonitor] = useState("");
  const [accion, setAccion] = useState("");
  const [unidades, setUnidades] = useState(0);
  const [comentario, setComentario] = useState("");

  const formSchema = Yup.object().shape({
    nombreMonitor: Yup.string().max(255, "Máximo 255 caracteres").required("Campo requerido"),
    accion: Yup.string().required("Campo requerido"),
    unidades: Yup.number().positive().integer().required(),
    comentario: Yup.string(),
  });

  const addRegistro = async (e) => {
    e.preventDefault();

    try {
      await db.collection("registros").add({
        nombreMonitor,
        accion,
        unidades,
        comentario,
      });
      console.log("Data added to Firestore");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  return (
    <>
      <h1>Registro de actividades</h1>
      <Formik
        initialValues={{ nombreMonitor: "", accion: "", unidades: "", comentario: "" }}
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
            value={nombreMonitor}
            onChange={(e) => setNombreMonitor(e.target.value)}
          />
          <RadioGroup>
            <FormControlLabel
              name="accion"
              value="ingreso"
              control={<Radio />}
              label="Ingreso"
              checked={accion === "ingreso"}
              onChange={(e) => setAccion(e.target.value)}
            />
            <FormControlLabel
              name="accion"
              value="salida"
              control={<Radio />}
              label="Salida"
              checked={accion === "salida"}
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
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Observaciones"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
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