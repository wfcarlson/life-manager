# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from models import Expense, Income, Category

class ExpenseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Expense
		fields = ('__all__')

class IncomeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Income
		fields = ('__all__')


class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('__all__')
