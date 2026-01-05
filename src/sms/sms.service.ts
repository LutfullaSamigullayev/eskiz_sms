import { Injectable } from "@nestjs/common";
import axios from "axios";
import FormData from "form-data";

@Injectable()
export class SmsService {
  async senOtp(phone_number: string) {
    let data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Eskiz Test");
    data.append("from", "4546");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/message/sms/send",
      headers: {
        authorization: "Bearer " + process.env.TOKEN,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
