import React, { useState, useEffect } from 'react'
import './App.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Button, Input } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { io } from "socket.io-client";
import EmployeeList from './Components/EmployeeList'
const socket = io("https://socketapicrud.herokuapp.com/");

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setname] = useState()
  const [age, setage] = useState()
  const [salary, setsalary] = React.useState('1.53')
  const [country, setCountry] = useState()
  const [employeeData, setEmployeeData] = useState([]);


  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/, '')


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    socket.on("getEmployeeData", (data) => {
      console.log('getEmployeeData', data)
      setEmployeeData(data.data);
    })
  })

  const submitHandler = (e) => {
    e.preventDefault()
    const employees = {
      name,
      age,
      salary,
      country,
    }

    socket.emit('addEmployee', employees)
    setname("")
    setage("")
    setsalary("")
    setCountry("")
    onClose()
  }

  const deleteHandle = (employeeId) => {
    let id = employeeId
    console.log(id);
    socket.emit("deleteEmployee", id)
  }

  const updateHandle = (employeeId, employeeName) => {
    const newName = prompt(`Enter new name for ${employeeName}`)
    const newAge = prompt('enter new age In Number')
    const newSalary = prompt('enter salary In Number ')
    const newCountry = prompt('enter new country')

    const employees = {
      newName,
      newAge,
      newSalary,
      newCountry,
    }
    console.log(employees);

    socket.emit('updateEmployee', { employeeId, employees })
  }


  return (
    <div className="App" >
      <Box mt={10}>
        <Button onClick={onOpen}>Add Employee</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Employee Name</FormLabel>
                <Input ref={initialRef} placeholder='Employee Name...' value={name} onChange={(e) => setname(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel>Age</FormLabel>
                <NumberInput max={50} min={10}>
                  <NumberInputField value={age} onChange={(e) => setage(e.target.value)} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Salary</FormLabel>
                <NumberInput
                  onChange={(valueString) => setsalary(parse(valueString))}
                  value={format(salary)}
                  max={50}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>


              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select placeholder='Select country' value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option>India</option>
                  <option>Usa</option>
                  <option>Canada</option>

                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={submitHandler}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <EmployeeList employeeData={employeeData} deleteHandle={deleteHandle} updateHandle={updateHandle} />
      </Box>

    </div >
  );
}

export default App;
