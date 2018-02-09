package com.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.jpa.Equipment;
import com.server.jpa.EquipmentRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


import java.math.BigDecimal;
import java.util.Date;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CheckExpApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private EquipmentRepository equipmentRepository;

	@Before
	public void setUp() throws Exception {
		equipmentRepository.deleteAll();
	}

	@Test
	public void indexControllerShouldReturnHtmlPage() throws Exception {
		mockMvc.perform(get("/app"))
				.andExpect(status().isOk());
	}

	@Test
	public void equipmentControllerGet() throws Exception {
		Equipment eq = new Equipment("test", "test",new BigDecimal(45),new Date());
		equipmentRepository.save(eq);

		mockMvc.perform(get("/equipment"))
				.andExpect(jsonPath("$.*.id", iterableWithSize(1)));
	}

	@Test
	public void equipmentControllerPost() throws Exception {
		Equipment eq = new Equipment("test", "test",new BigDecimal(45),new Date());
		ObjectMapper mapper = new ObjectMapper();
		mockMvc.perform(post("/equipment").contentType(MediaType.APPLICATION_JSON_UTF8).content(mapper.writeValueAsBytes(eq))).andExpect(status().isOk());
		assertNotNull(equipmentRepository.findBySerialNumber(eq.getSerialNumber()));

	}

	@Test
	public void equipmentControllerPut() throws Exception {
		Equipment eq = new Equipment("test", "test",new BigDecimal(45),new Date());
		equipmentRepository.save(eq);
		eq.setType("test2");
		ObjectMapper mapper = new ObjectMapper();
		mockMvc.perform(put("/equipment/{id}", eq.getId()).contentType(MediaType.APPLICATION_JSON_UTF8).content(mapper.writeValueAsBytes(eq))).andExpect(status().isOk());
		assertThat(equipmentRepository.findById(eq.getId()).getType(),is("test2") );

	}

	@Test
	public void equipmentControllerDelete() throws Exception {
		Equipment eq = new Equipment("test", "test",new BigDecimal(45),new Date());
		equipmentRepository.save(eq);

		mockMvc.perform(delete("/equipment/{id}", eq.getId())).andExpect(status().isOk());
		assertNull(equipmentRepository.findById(eq.getId()));

	}

	@Test
	public void amortizationControllerGet() throws Exception {

		mockMvc.perform(get("/amortization").param("price","10000").param("month","20").param("numbersAfterComma","3"))
				.andExpect(status().isOk());
	}
}
