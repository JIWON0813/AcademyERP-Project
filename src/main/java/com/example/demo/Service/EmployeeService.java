package com.example.demo.Service;

import com.example.demo.database.Entity.EmployeeEntity;
import com.example.demo.database.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<EmployeeEntity> getEmployeeList(Pageable pageable){
        return employeeRepository.findAll(pageable);
    }


    public int insertEmployee(EmployeeEntity employee) {
        EmployeeEntity result = employeeRepository.save(employee);
        return 1;
    }
}
