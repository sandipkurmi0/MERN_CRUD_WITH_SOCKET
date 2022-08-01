import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Button,
} from '@chakra-ui/react'

const EmployeeList = ({ employeeData, deleteHandle, updateHandle }) => {


    return (
        <Box w='60%' mt='10' display='flex'
            alignItems='center'
            justifyContent='center'>
            <TableContainer >
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>All Employee Details</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Age</Th>
                            <Th>salary</Th>
                            <Th>country</Th>
                            <Th>UPDATE</Th>
                            <Th>DELETE</Th>
                        </Tr>
                    </Thead>
                    {employeeData.map((employee, index) => (
                        <>
                            <Tbody>
                                <Tr>
                                    <Td>{employee.name}</Td>
                                    <Td>{employee.age}</Td>
                                    <Td>${employee.salary}</Td>
                                    <Td>{employee.country}</Td>
                                    <Td><Button colorScheme='gray' onClick={() => updateHandle(employee._id, employee.name)}>Update</Button></Td>
                                    <Td>
                                        <Button colorScheme='red' onClick={() => deleteHandle(employee._id)}>Delete</Button>
                                    </Td>

                                </Tr>
                            </Tbody>
                        </>
                    ))}
                    <Tfoot>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Age</Th>
                            <Th>salary</Th>
                            <Th>country</Th>
                            <Th>UPDATE</Th>
                            <Th>DELETE</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>


    )
}

export default EmployeeList