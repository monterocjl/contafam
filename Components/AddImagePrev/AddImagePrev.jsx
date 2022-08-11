import { Box, Input, FormLabel, Image, CloseButton } from "@chakra-ui/react";

export default function AddImagePrev({
  adjunto,
  setFile,
  file,
  deletePreviewImg,
  previewImg,
}) {
  return (
    <>
      <Box display='flex' gap={1}>
        <FormLabel
          htmlFor='adjunto'
          bg='#2D3748'
          w='fit-content'
          py={2}
          px={4}
          borderRadius='6px'
          fontWeight='bold'
          h='fit-content'
          cursor='pointer'
        >
          Subir archivo
          <Input
            ref={adjunto}
            id='adjunto'
            name='adjunto'
            type='file'
            onChange={(event) => {
              console.log(event.target.files[0]);
            }}
            display='none'
          />
        </FormLabel>
        <Box position='relative' display={file === null ? "none" : "block"}>
          <CloseButton
            onClick={deletePreviewImg}
            position='absolute'
            top='-5px'
            right='-5px'
            bg='red.500'
            borderRadius='50px'
            w='22px'
            h='22px'
            fontSize='10px'
          />
          <Image
            h='100px'
            borderRadius='6px'
            src={previewImg}
            alt=''
            layout='fill'
          />
        </Box>
      </Box>
    </>
  );
}
