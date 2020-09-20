import smtplib
from email.mime.text import MIMEText

msg = MIMEText('hello')

msg['Subject'] = 'Urgent message'
msg['From'] = 'mtcsrc@outlook.com'
msg['To'] = 'v-wenklu@microsoft.com'

s = smtplib.SMTP('smtp.outlook.com:587')
s.starttls()
s.login('mtcsrctw@outlook.com', 'MTCP@ssw0rd')
# s.sendmail('luwenkai0820@gmail.com', msg.as_string())
s.sendmail(msg['From'], msg['To'], 'i am bobo')
s.quit()
