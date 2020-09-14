
import os

from subprocess import Popen


from flask import Flask, request

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


app = Flask(__name__)


def send():
    message = Mail(
        from_email='mtcsrc@outlook.com',
        to_emails='luwenkai0820@gmail.com',
        subject='MTC Activity Created Successfully!!!',
        html_content='<H3>您所安排的活動時間為:2020/09/18</H3>' +
        '<table><thead><tr><th>編號</th><th>選擇主題</th><th>講師</th><th>時間(分)</th></tr></thead><tbody><tr><td>0</td><td>MTC導覽</td><td>MTC Team</td><td>30</td></tr><tr><td>1</td><td>微軟IoT平台發展藍圖與最佳做法指南</td><td>Ethan</td><td>30</td></tr></tbody></table>'
    )
    try:
        sg = SendGridAPIClient(
            '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')
        response = sg.send(message)
        print(f'status_code: {response.status_code}')
        print(f'body: {response.body}')
        print(f'headers: {response.headers}')
    except Exception as e:
        print(f'except: {e}')


@app.route('/', methods=['POST'])
def start_ppt_automation():
    try:
        send()
    except Exception as e:
        print(e)
        return {'web response': 'something went wrong', 'result': 'please check the flask server', 'error': e}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2330, debug=True)
