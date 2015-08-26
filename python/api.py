#!/usr/bin/env python
from fan        import Fan
from templog    import TempLog
from temp       import Temperature
from pi_system  import PiSystem
from datetime   import datetime
from flask      import Flask, Response, jsonify

fan = Fan()
db = TempLog()
temp = Temperature()
pi = PiSystem()
app = Flask(__name__)

@app.route('/temp', methods = ['GET'])
def get_temp():
    result = dict(datetime = datetime.now().isoformat(), temperature = temp.read())
    return jsonify(result = [result])

@app.route('/temp/<int:hours>', methods = ['GET'])
def list_temp(hours):
    result = db.last(hours)
    return jsonify(result = result)

@app.route('/fan', methods = ['GET'])
def get_fan():
    return fan_status(fan.read())

@app.route('/fan/<status>', methods = ['GET', 'POST'])
def set_fan(status):
    value = status == 'on' or status == '1'
    fan.write(value)
    return fan_status(value)

def fan_status(value):
    return jsonify(fan_status = bool(value))

@app.route('/ps', methods = ['GET'])
def listprocess():
    result = pi.listprocess()
    return Response(result, content_type = "text/plain")

@app.route('/log/<int:count>', methods = ['GET'])
def listlog(count):
    result = pi.listlog(count)
    return Response(result, content_type = "text/plain")

if  __name__ == "__main__":
    app.run(debug = True)
