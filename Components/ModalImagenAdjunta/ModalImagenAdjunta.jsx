import { useState } from "react";
import { BsImage } from "react-icons/bs";
import {
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

export default function ModalImagenAdjunta({ imagen }) {
  const [image, setImage] = useState("/img/default.jpg");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingImage, setLoadingImage] = useState(false);

  function showImage(imgUrl) {
    setImage(imgUrl);
    onOpen();
    setLoadingImage(true);

    setTimeout(() => {
      setLoadingImage(false);
    }, 500);
  }
  return (
    <>
      <IconButton
        onClick={() => showImage(imagen)}
        variant='outline'
        colorScheme='teal'
        aria-label='Call Sage'
        fontSize='20px'
        icon={<BsImage />}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg='#171923' w='90%' maxH='85vh' overflow='auto'>
          <ModalCloseButton />
          <ModalBody
            mt={8}
            mb={4}
            mx={1}
            display='flex'
            justifyContent='center'
          >
            {loadingImage ? <Spinner size='lg' /> : ""}
            <Image
              display={!loadingImage ? "block" : "none"}
              w='100%'
              h='auto'
              src={image}
              alt=''
              borderRadius='8px'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
