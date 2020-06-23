#!/bin/sh
# Runs indefinite loop that can be killed with sigint

cat /tmp/DoenetLogo.txt

signal_handler() {
    kill $! ;
}

trap signal_handler HUP INT QUIT ABRT TERM 

sleep infinity &

wait