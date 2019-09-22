
class Prediction:
    def __init__(self):
        self.json = "[{id: 1, price: 25},{id: 2, price: 33}]"

    def __str__(self):
        return "Project: {}".format(self.json)