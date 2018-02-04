# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Income, Expense, ExpenseCategory, IncomeCategory

class IncomeAdmin(admin.ModelAdmin):
	pass

admin.site.register(Income, IncomeAdmin)

class ExpenseAdmin(admin.ModelAdmin):
	pass

admin.site.register(Expense, ExpenseAdmin)

class ExpenseCategoryAdmin(admin.ModelAdmin):
	pass

admin.site.register(ExpenseCategory, ExpenseCategoryAdmin)

class IncomeCategoryAdmin(admin.ModelAdmin):
	pass

admin.site.register(IncomeCategory, IncomeCategoryAdmin)