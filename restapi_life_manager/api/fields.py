# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from models import BudgetItem, Expense, Income

class BudgetItemForm(forms.ModelForm):
	test = forms.BooleanField(defualt=False, null=False, blank=False)

	class Meta:
		model = BudgetItem 
		fields = ('__all__')