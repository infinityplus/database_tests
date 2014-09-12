#this is the gnue plot scirpt for ploat all the graphs for monogdb tests
#
#-----------------data validation------------------------------
set title "Data validation overhead in mongodb"
set xlabel "Load (request/sec)"
set ylabel "Throughput (request/sec)"
set label 'data validation overhead in mongodb' at 0.003, 260 
plot  "data_validation.dat" using 1:2 title 'without data validation' with lines, \
       "data_validation.dat" using 1:3 title 'with data validation' with lines
set term png
set output "data_validaiton_overhead.png"
replot
set term x11
#
#
#-------------------------Read, Write, Update haevy on one table----------
set title "Read, Write, Update heavy senarios in one data object in mongodb"
set xlabel "Load (request/sec)"
set ylabel "Throughput (request/sec)"
plot  "phase_02_one_object.dat" using 1:2 title 'write heavey' with lines, \
       "phase_02_one_object.dat" using 1:3 title 'read heavy' with lines, \
	"phase_02_one_object.dat" using 1:4 title 'update heavy' with lines
set term png
set output "phase_02_one_object.png"
replot
set term x11
#
#
#-----------------------Read, Write, Update heavy object mapping one to one cardinality--------
set title "Read, Write, Update heavy senarios in one to one cardinality in mongodb"
set xlabel "Load (request/sec)"
set ylabel "Throughput (request/sec)"
plot  "phase_02_one_to_one.dat" using 1:2 title 'write heavey' with lines, \
       "phase_02_one_to_one.dat" using 1:3 title 'read heavy' with lines, \
	"phase_02_one_to_one.dat" using 1:4 title 'update heavy' with lines
set term png
set output "phase_02_one_to_one.png"
replot
set term x11
#
#
#-----------------------Read , Write, Update heavy object mapping one to may cardinality-------
set title "Read, Write, Update heavy senarios in one to many cardinality in mongodb"
set xlabel "Load (request/sec)"
set ylabel "Throughput (request/sec)"
plot  "phase_02_one_to_maney.dat" using 1:2 title 'write heavey' with lines, \
      "phase_02_one_to_maney.dat" using 1:3 title 'read heavy' with lines, \
	"phase_02_one_to_maney.dat" using 1:4 title 'update heavy' with lines
set term png
set output "phase_02_one_to_maney.png"
replot
set term x11
