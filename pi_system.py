#!/usr/bin/env python

import os
import subprocess

class PiSystem (object):

    def listprocess(self):
        cmd = "ps aux"
        result = subprocess.check_output(cmd, shell = True)
        return result

    def listlog(self, count = 25):
        cmd = "tail -n %d /var/log/fan-control" % (count)
        result = subprocess.check_output(cmd, shell = True)
        return result

def main():
    pi = PiSystem()
    print pi.listprocess()

if __name__ == "__main__":
    main()
