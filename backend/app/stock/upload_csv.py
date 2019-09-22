import pandas as pd
from .models import Stock_GE

print("Added")


def works():
    print("Hello world again")
    df1 = pd.read_csv("static\CSV\GE.csv", sep=',')
    print(df1.iloc[0].Date)
    print(df1.iloc[0].Date)
    print('ended')
    print(df1.iloc[0]['Adj Close'])

    for i in range(len(df1)):
        if df1.iloc[i].Open > df1.iloc[i].Close:
            change = -1
        else:
            change = 1

        saves = Stock_GE(
            dates=df1.iloc[i].Date,
            open_price = df1.iloc[i].Open,
            high_price = df1.iloc[i].High,
            low_price = df1.iloc[i].Low,
            close_price = df1.iloc[i].Close,
            adj_price = df1.iloc[i]['Adj Close'],
            volume_price = df1.iloc[i].Volume,
            cahanges = change
        )
        try:
            saves.save()
            print("Added new line")
        except BaseException:
            print("Error in the save")

#df1 = pd.read_csv("static\CSV\GE.csv", sep=',')
#print(df1)