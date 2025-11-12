#!/bin/bash
cd /home/kavia/workspace/code-generation/basic-arithmetic-calculator-222332-222341/frontend_arithmetic_calculator
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

