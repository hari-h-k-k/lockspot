import React from 'react';
import { Box } from '@chakra-ui/react';
import Img from "./assets/images/Thumbnail1.avif";
const Page = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        height="25vh"
        backgroundColor="blue"
        position="relative"
        paddingLeft="30px"
      >
        <Box
          position="absolute"
          top="50%"
          left="25px"
          transform="translateY(-50%)"
          width="50px"
          height="50px"
          border="2px solid black"
          backgroundImage={Img}
          backgroundSize="cover"
          backgroundPosition="center"
        />
      </Box>
      <Box flex="1" backgroundColor="red" position="relative">
        <Box
          position="absolute"
          top="50%"
          right="-25px"
          transform="translateY(-50%)"
          width="50px"
          height="50px"
          border="2px solid black"
          borderRadius="50%"
          backgroundImage="url('/path/to/image.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
        />
      </Box>
    </Box>
  );
};

export default Page;


// import Img from "./assets/images/Thumbnail1.avif";