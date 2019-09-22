from django.db import models
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Stock_GE(models.Model):
    dates = models.TextField(max_length=50)
    open_price = models.FloatField(null=False)
    high_price = models.FloatField(null=False)
    low_price = models.FloatField(null=False)
    close_price = models.FloatField(null=False)
    adj_price = models.FloatField(null=False)
    volume_price = models.FloatField(null=False)
    cahanges = models.IntegerField()

#    def __str__(self):
#        return "Project: {}".format(self.name)

