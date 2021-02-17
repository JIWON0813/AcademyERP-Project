package com.example.demo.Controller;

import com.example.demo.Service.PayService;
import com.example.demo.database.DTO.PayDTO;
import com.example.demo.database.Entity.PayEntity;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.AccessToken;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@RestController
@RequestMapping(value = "/payments")
@CrossOrigin("*")
public class PayController {

    @Autowired
    private PayService payService;

    IamportClient client;

    public PayController() {
        this.client = this.getTestClient();
    }

    IamportClient getTestClient() {
        String api_key = "1293512882402362";
        String api_secret = "AC8zucqGsq0ZxhPpuiqHG4X9u7brYPGyrO7W1yCtZDtxUiWoBn6ir3rWaDo9s4HUTPQUotno7RV19SqL";
        return new IamportClient(api_key, api_secret);
    }

    // 토큰 값 가져오기
    void getToken() {
        try {
            IamportResponse<AccessToken> auth_response = client.getAuth();
            assertNotNull(auth_response.getResponse());
            assertNotNull(auth_response.getResponse().getToken());

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());
            switch (e.getHttpStatusCode()) {
                case 401:
                    System.out.println("http status code 401");
                    break;
                case 500:
                    System.out.println("http status code 500");
                    break;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @PostMapping("/pay")
    @ResponseBody
    public String getPayInfo(@RequestBody PayEntity info) {
        String Imp_uid = info.getImpUID();
        this.getToken();

        try {
            IamportResponse<Payment> pay_response = client.paymentByImpUid(Imp_uid);
            info.setPaidAt(pay_response.getResponse().getPaidAt());
            info.setName(pay_response.getResponse().getName());
            info.setPayMethod(pay_response.getResponse().getPayMethod());
            info.setCustomData(Integer.parseInt(pay_response.getResponse().getCustomData()));
            info.setPaidAmount(pay_response.getResponse().getAmount());

            System.out.println(info);
            payService.complete(info);
        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch (e.getHttpStatusCode()) {
                case 401:
                    //TODO
                    break;
                case 500:
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "success";

    }

    @GetMapping("/pay/{student}")
    public HashMap<String, List> list(@PathVariable("student") long student) {

        return payService.list(student);
    }

    @PostMapping("/cancel")
    public void testCancelPaymentChecksumByImpUid(@RequestBody PayDTO info) {
        String test_already_cancelled_imp_uid = info.getImpUID();
        System.out.println(test_already_cancelled_imp_uid);

        CancelData cancel_data = new CancelData(test_already_cancelled_imp_uid, true); //imp_uid를 통한 전액취소
        cancel_data.setChecksum(info.getCancel_request_amount()); // checksum 으로 검증 추가
        payService.cancel(info.getReason(),info.getImpUID());

        try {
            IamportResponse<Payment> payment_response = client.cancelPaymentByImpUid(cancel_data);
            //assertNull(payment_response.getResponse());
            System.out.println(payment_response.getMessage());

        } catch (IamportResponseException e) {
            System.out.println(e.getMessage());

            switch (e.getHttpStatusCode()) {
                case 401:
                    //TODO
                    break;
                case 500:
                    //TODO
                    break;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

