# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Category(models.Model):
	name = models.CharField(max_length=50, null=False, blank=False)

	class Meta:
		abstract = True

	def __str__(self):
		return self.name


class IncomeCategory(Category):
	class Meta:
		verbose_name_plural = "Income Categories"


class ExpenseCategory(Category):
	class Meta:
		verbose_name_plural = "Expense Categories"


class BudgetItem(models.Model):
	amount = models.DecimalField(max_digits=12, decimal_places=2, null=False, blank=False)
	time = models.DateTimeField(blank=False, null=False)
	description = models.CharField(max_length=250, null=False, blank=False)
	party = models.CharField(max_length=50, null=False, blank=False)

	class Meta:
		abstract = True


class Expense(BudgetItem):
	category = models.ForeignKey(ExpenseCategory, blank=False, null=False)

	def __str__(self):
		return "" + self.party + " - $" + str(self.amount)


class Income(BudgetItem):
	category = models.ForeignKey(IncomeCategory, blank=False, null=False)

	def __str__(self):
		return "" + self.party + " - $" + str(self.amount)

