with open("test.txt") as t:
    file = t.read()

lines = file.split('\n')[1:]
ids = [int(line.split(';')[0]) for line in lines if line]
times = [(float(line.split(';')[2]), float(line.split(';')[3]))
         for line in lines if line]

for i, d in enumerate(ids):
    if(i+1 != d):
        raise RuntimeError()


for i in range(len(times) - 1):
    start, dur = times[i]
    nextStart, nextDuration = times[i+1]
    diff = abs((start + dur) - nextStart)
    if diff > 0.000000001:
        print(
            f"{i = }, {start = }, {dur = }, {nextStart = }, {nextDuration = }, {diff = }")
