# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Income, Expense, Category

class IncomeAdmin(admin.ModelAdmin):
	pass

admin.site.register(Income, IncomeAdmin)

class ExpenseAdmin(admin.ModelAdmin):
	pass

admin.site.register(Expense, ExpenseAdmin)

class CategoryAdmin(admin.ModelAdmin):
	pass

admin.site.register(Category, CategoryAdmin)