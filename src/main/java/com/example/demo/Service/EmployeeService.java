package com.example.demo.Service;

import com.example.demo.database.Entity.EmployeeEntity;
import com.example.demo.database.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<EmployeeEntity> getEmployeeList(Pageable pageable, int verify){
        return employeeRepository.findByVerify(pageable, verify);
    }

    public EmployeeEntity getEmployee(Long id) {
        Optional<EmployeeEntity> op = employeeRepository.findById(id);
        return op.get();
    }

    public int insertEmployee(EmployeeEntity employee) {
        EmployeeEntity result = employeeRepository.save(employee);
        return 1;
    }

    public int permitEmployee(EmployeeEntity employee) {
        employee.setNo(employee.getNo());
        EmployeeEntity result = employeeRepository.save(employee);
        if(result != null)
            return 1;

        return -1;
    }

    public void deleteEmployee(Long no) {
        employeeRepository.deleteById(no);

    }

}
