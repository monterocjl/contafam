export function successToast(usuario) {
  return {
    title: `¡Bien hecho ${usuario}!`,
    description: "La información se ingresó correctamente",
    status: "success",
    duration: 4000,
    isClosable: true,
  };
}

export function errorToast() {
  return {
    title: "Algo salió mal...",
    description: "La información no se ingresó",
    status: "error",
    duration: 4000,
    isClosable: true,
  };
}
