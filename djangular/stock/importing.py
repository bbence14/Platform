import csv

from stock.models import Stock_GE

data = csv.reader(open("./prices/GE.csv"), delimiter=',')

for row in data:
    stock = Stock_GE()
    stock.dates = row[0]
    stock.open_price = row[1]
    stock.high_price = row[2]
    stock.low_price = row[3]
    stock.close_price = row[4]
    stock.adj_price = row[5]
    stock.volume_price = row[6]
    stock.cahanges = 1
    stock.save()
