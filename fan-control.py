#!/usr/bin/env python
# vim: set fileencoding=UTF8

from fan        import Fan
from temp       import Temperature
from mylogger   import MyLogger
from datetime   import datetime

import sys, time, mylogger

LOG_FILENAME    = "/var/log/fan-control"
LOG_LEVEL       = mylogger.LOG_LEVEL_DEBUG

logger          = MyLogger(LOG_FILENAME, LOG_LEVEL)
fan             = Fan()
temp            = Temperature()

delay           = 5.0
thresholdUp     = 31
thresholdDown   = 29

count           = 0
maxCountUp      = int(15 / delay) # 15s / 5 = 3
maxCountDown    = int(30 / delay) # 30s / 5 = 6

logCount        = 0
maxLogCount     = int(30 / delay)

t               = temp.read()
currentStatus   = fan.read()

def strStatus(status = None):
    if status == None:
        status = currentStatus

    return "On" if status else "Off"

logger.info("STARTING: Fan=%3s, Delay=%.1f, Threshold=%.1f/%.1f, MaxCount=%d/%d, MaxLogCount=%d" % (
    strStatus(), delay,
    thresholdUp, thresholdDown,
    maxCountUp, maxCountDown,
    maxLogCount))

while t:
    newStatus = t > (thresholdDown if currentStatus else thresholdUp)

    if newStatus != currentStatus:
        count += 1
    else:
        count = 0
    
    if (logCount % maxLogCount == 0) or (count > 0):
        logCount = 0
        logger.debug("Fan=%3s, Count=%d, Temp=%2.3f", strStatus(), count, t)

    if count >= (maxCountDown if currentStatus else maxCountUp):
        currentStatus = newStatus
        logger.info("SWITCH FAN: " + strStatus(newStatus))
        fan.write(newStatus)
        
    logCount += 1
    time.sleep(delay)
    t = temp.read()
