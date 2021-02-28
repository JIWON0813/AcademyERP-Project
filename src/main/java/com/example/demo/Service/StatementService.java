// package com.example.demo.Service;

// import com.example.demo.database.DTO.StatementDTO;
// import com.example.demo.database.DTO.StatementDetailsDTO;
// import com.example.demo.database.Entity.StatementDetailsEntity;
// import com.example.demo.database.Entity.StatementEntity;
// import com.example.demo.database.Mapper.StatementDetailsMapstructMapper;
// import com.example.demo.database.Mapper.StatementMapper;
// import com.example.demo.database.Mapper.StatementMapstructMapper;
// import com.example.demo.database.Repository.StatementDetailsRepository;
// import com.example.demo.database.Repository.StatementRepository;
// import org.mapstruct.factory.Mappers;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Optional;
// import java.util.stream.Collectors;


// @Service
// public class StatementService {
//     private  final StatementMapstructMapper mapstructMapper = Mappers.getMapper(StatementMapstructMapper.class);
//     private  final StatementDetailsMapstructMapper detailsMapstructMapper = Mappers.getMapper(StatementDetailsMapstructMapper.class);

//     @Autowired
//     private StatementMapper statementMapper;

//     @Autowired
//     private StatementRepository statementRepository;

//     @Autowired
//     private StatementDetailsRepository statementDetailsRepository;

//     public void create(StatementDTO statement) {
//      statementMapper.InsertStatement(statement);
//      System.out.println(statement.getNo());
//      HashMap<String,Object> map = new HashMap<>();
//      map.put("statement",statement.getNo());
//      map.put("list",statement.getList());
//      statementMapper.InsertStatementDetail(map);
//     }

//     public HashMap<String,List> list() {
//         HashMap<String,List> result = new HashMap<>();
//         List<StatementEntity> list = statementRepository.findAll();
//         result.put("message", list);
//         return result;
//     }

//     public HashMap<String,Object> detail(Long id) {
//         HashMap<String,Object> result = new HashMap<>();
//         Optional<StatementEntity> list = statementRepository.findById(id);
//         List<StatementDetailsEntity> details = statementDetailsRepository.findAllByStatement(id);
//         result.put("list", list);
//         result.put("details", details);
//         return result;
//     }

//     @Transactional
//     public void update(long id,StatementDTO statement) {
//         // statement update
//         StatementEntity entity  = new StatementEntity();
//         updateFromDto(statement, entity);
//         entity.setNo(id);
//         statementRepository.save(entity);

//         // statementDetails update
//         statementDetailsRepository.deleteByStatement(id);

//         List<StatementDetailsDTO> lst = statement.getList();
//         List<StatementDetailsEntity> test = toEntity(lst);
//         System.out.println(test);
//         statementDetailsRepository.saveAll(test);

//     }
//     public void delete(Long id) {
//         statementRepository.deleteById(id);
//     }

//     /////mapstruct
//     protected void updateFromDto(StatementDTO dto, StatementEntity entity) {
//         mapstructMapper.updateFromDto(dto, entity);
//     }

//     protected StatementDetailsEntity toEntity(StatementDetailsDTO dto) {
//         return detailsMapstructMapper.toEntity(dto);
//     }

//     private List<StatementDetailsEntity> toEntity(List<StatementDetailsDTO> lst) {
//         return lst.stream().map(this::toEntity).collect(Collectors.toList());
//     }
// }

