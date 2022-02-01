#! /bin/bash

echo "initializing server"
npm run dev&

#wait for 5 seconds
ping 127.0.0.1 -t 5 > nul

echo "executing service a"
curl -X GET "http://localhost:6060/marvel/characters/ironman";

echo "executing service b"
curl -X GET "http://localhost:6060/marvel/colaborators/ironman";

echo "Now you can kill process"
ps -fea | grep npm