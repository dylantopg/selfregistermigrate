import React, { useState } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [tipoRegistro, setTipoRegistro] = useState("entrada"); // Default to "entrada"
  const [unidades, setUnidades] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the required name field
    if (!nombre) {
      alert("Please enter a name.");
      return;
    }

    // Handle FormControl submission logic here
    console.log({
      nombre,
      tipoRegistro,
      unidades,
      observaciones,
    });
  };

  const handleUnidadesChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setUnidades(value);
    }
  };

  const handleRadioChange = (event) => {
    setTipoRegistro(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Nombre:"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de registro:</FormLabel>
            <RadioGroup
              row
              aria-label="tipoRegistro"
              name="tipoRegistro"
              value={tipoRegistro}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="entrada"
                control={<Radio />}
                label="Entrada"
              />
              <FormControlLabel
                value="salida"
                control={<Radio />}
                label="Salida"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="Unidades intervenidas:"
            id="unidades"
            type="number"
            value={unidades}
            onChange={handleUnidadesChange}
            min={0}
          />
          <TextField
            label="Observaciones:"
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            multiline
          />
          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </FormControl>
      </form>
    </>
  );
}
