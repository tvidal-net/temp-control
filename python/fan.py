#!/usr/bin/env python

from gpio import GPIO

pin = 40

class Fan (GPIO):
    
    def __init__(self):
        super(Fan, self).__init__(pin)

def main():
    fan = Fan()
    print "Fan: %d" % (fan.read())

if __name__ == "__main__":
    main()
