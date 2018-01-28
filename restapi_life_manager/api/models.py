# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Category(models.Model):
	name = models.CharField(max_length=50, null=False, blank=False)

	class Meta:
		verbose_name_plural = "Categories"

	def __str__(self):
		return self.name


class BudgetItem(models.Model):
	amount = models.DecimalField(max_digits=12, decimal_places=2, null=False, blank=False)
	time = models.DateTimeField(auto_now=True, blank=False, null=False)
	category = models.ForeignKey(Category, blank=False, null=False)
	description = models.CharField(max_length=250, null=False, blank=False)
	party = models.CharField(max_length=50, null=False, blank=False)

	class Meta:
		abstract = True


class Expense(BudgetItem):
	def __str__(self):
		return "" + self.party + " - " + self.amount


class Income(BudgetItem):
	def __str__(self):
		return "" + self.party + " - " + self.amount

