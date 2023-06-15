import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';

function TableComponent({props}) {

    const midNightHustle = [0, 1, 2, 3, 4, 5, 6, 7];
    const morningMomentum=[8,9,10,11,12,13,14,15];
    const eveningEnergisers=[16,17,18,19,20,21,22,23];
    function FromTo({row,tod,time}) {
        console.log(props.sportsRows[row].noon)

        const handleChangeTime = ({item,during}) => {
            const updatedsportsRows = { ...props.sportsRows };
            updatedsportsRows[row][time][during]=item;
            props.setSportsRows(updatedsportsRows)
        };

        return (

            <Flex justifyContent="space-between" height="100%">
                <Menu>
                    <MenuButton as={Button} width="50%" backgroundColor="transparent" borderWidth="1px" borderColor="black" padding="0" boxSizing="border-box" rightIcon={<ChevronDownIcon />}>
                        {props.sportsRows[row][time]["from"] ? props.sportsRows[row][time]["from"] : "From"}
                    </MenuButton>
                    <MenuList minWidth="auto">
                        <Box maxHeight="20vh" overflowY="auto">
                            {tod.slice(0, -1).map((item, index) => (
                                <MenuItem key={index} onClick={() => { handleChangeTime({ item: item, during: "from" })}}>{item}</MenuItem>
                            ))}
                        </Box>
                    </MenuList>
                </Menu>


                <Menu>
                    <MenuButton as={Button} width="50%" backgroundColor="transparent" borderWidth="1px" borderColor="black" padding="0" boxSizing="border-box" rightIcon={<ChevronDownIcon />}>
                        {props.sportsRows[row][time]["to"]  ? props.sportsRows[row][time]["to"]  : "To"}
                    </MenuButton>
                    <MenuList minWidth="auto">
                        <Box maxHeight="20vh" overflowY="auto">

                            {tod.slice(tod.indexOf(props.sportsRows[row][time]["from"] + 1)).map((item, index) => (
                                <MenuItem key={index} onClick={() => { handleChangeTime({ item: item, during: "to" })}}>{item}</MenuItem>
                            ))}
                        </Box>
                    </MenuList>
                </Menu>
            </Flex>

        )
    }
    return (
        <Box overflowX="auto" >
            <Table variant="striped" colorScheme="teal" width="100%">
                <Thead>
                    <Tr>
                        <Th>Sport</Th>
                        <Th>Day(00.00-08.00)</Th>
                        <Th>Noon(08.00-16.00)</Th>
                        <Th>Night(16.00-00.00)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(props.sportsRows).map((row,index) => (
                        <Tr key={index}>
                            <Td>{row}</Td>
                            <Td>
                                <Table size="sm" variant="unstyled">
                                    <Tbody>
                                        <Tr>
                                            <FromTo row={row} tod={midNightHustle} time="day"/>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Td>

                            <Td>
                                <Table size="sm" variant="unstyled" bg="transparent">
                                    <Tbody>
                                        <Tr>
                                        <FromTo row={row} tod={morningMomentum} time="noon"/>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Td>

                            <Td>
                                <Table size="sm" variant="unstyled" >
                                    <Tbody>
                                        <Tr>
                                        <FromTo row={row} tod={eveningEnergisers} time="night"/>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Td>

                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};



export default TableComponent;