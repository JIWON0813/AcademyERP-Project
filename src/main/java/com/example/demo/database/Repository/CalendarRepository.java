
package com.example.demo.database.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.database.Entity.*;

public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {

}
