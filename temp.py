#!/usr/bin/env python

import glob

devicelist = glob.glob('/sys/bus/w1/devices/28*')

if len(devicelist) > 0:
    devicefile = devicelist[0] + '/w1_slave'

class Temperature (object):

    def read(self):

        if devicefile is None:
            return None

        with open(devicefile, 'r') as f:
            lines = f.readlines()
            status = lines[0][-4:-1]
            if status == "YES":
               tempstr = lines[1][-6:-1]
               return float(tempstr) / 1000

        return None

def main():
    temp = Temperature()
    print "Device File: %s" % (devicefile)
    print "Temperature: %.3f" % (temp.read())

if __name__ == "__main__":
    main()
