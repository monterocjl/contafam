import { useState, useEffect, useRef } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import AddImagePrev from "../AddImagePrev/AddImagePrev";
import saveNewImage from "../../api/saveNewImage";
import { successToast, errorToast } from "../../utils/toasts";
import addToDataBase from "../../api/addToDataBase";
import { useFormik } from "formik";
import * as Yup from "yup";
import Description from "../Description/Description";
import Importe from "../Importe/Importe";
import Categoria from "../Categoria/Categoria";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function GastoChifles({ tipoOperacion }) {
  const toast = useToast();
  const adjunto = useRef(null);
  const categoria = useRef(null);
  const importe = useRef(null);
  const descripcion = useRef(null);
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("/img/default.jpg");
  const [loading, setLoading] = useState(false);
  const [fechaOperacion, setFechaOperacion] = useState(new Date());

  useEffect(() => {
    if (file?.name) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
    }
  }, [previewImg, file]);

  function deletePreviewImg() {
    setFile(null);
    adjunto.current.value = "";
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData, { resetForm }) => {
      setLoading(true);

      const data = file ? await saveNewImage(file) : "";

      const usuario = localStorage.getItem("Usuario");

      const completeData = {
        ...formData,
        operacion: tipoOperacion,
        usuario: usuario,
        adjunto: data?.secure_url ? data?.secure_url : "",
        fecha_creacion: format(fechaOperacion, "yyyy-MM-dd"),
      };

      const response = await addToDataBase(completeData, "chifle");

      if (response.status == 200) {
        toast(successToast(usuario));
        resetForm();
        categoria.current.value = "";
        importe.current.value = "";
        descripcion.current.value = "";
        adjunto.current.value = "";
        setFile(null);
        setFechaOperacion(new Date());

        setLoading(false);
      } else {
        toast(errorToast);
        setLoading(false);
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box display='flex' flexDirection='column' gap={6} fontSize='xl'>
          <Categoria
            error={formik.errors.categoria}
            reference={categoria}
            onChange={formik.handleChange}
            options={categoriasGastoChifles}
          />

          <Importe
            error={formik.errors.importe}
            reference={importe}
            onChange={formik.handleChange}
          />
          <Box display='flex' alignItems='center' gap='12px'>
            <Button bg='#2D3748' _hover={[]} _active={[]} fontWeight='bold'>
              Elegir fecha
              <DatePicker
                wrapperClassName='datePicker'
                onChange={(date) => setFechaOperacion(date)}
              />
            </Button>
            <Box fontWeight='bold'>{`${format(
              fechaOperacion,
              "dd MMM yyyy"
            )}`}</Box>
          </Box>
          <Description
            error={formik.errors.descripcion}
            reference={descripcion}
            onChange={formik.handleChange}
          />
          <AddImagePrev
            adjunto={adjunto}
            setFile={setFile}
            file={file}
            deletePreviewImg={deletePreviewImg}
            previewImg={previewImg}
          />

          <Button
            type='submit'
            colorScheme='red'
            fontSize='xl'
            isLoading={loading}
            loadingText='Agregando'
            spinnerPlacement='start'
            py={4}
          >
            Agregar gasto
          </Button>
        </Box>
      </form>
    </>
  );
}

function initialValues() {
  return {
    importe: 0,
    categoria: "",
    descripcion: "",
    adjunto: "",
  };
}

function validationSchema() {
  return {
    importe: Yup.string().required("Debes ingresar un importe"),
    categoria: Yup.string().required("Debes elegir un tipo de gasto"),
    descripcion: Yup.string(),
    adjunto: Yup.string(),
  };
}

const categoriasGastoChifles = [
  "Recojo de chifles",
  "Compra a Keylita",
  "Materiales",
  "Otros",
];
