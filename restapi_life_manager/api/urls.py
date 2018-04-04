from django.conf.urls import url, include
from views import *

urlpatterns = [
	url(r'^expenses/categories/', ExpenseCategoryView.as_view(), name='expense_categories'),
	url(r'^incomes/categories/', IncomeCategoryView.as_view(), name='income_categories'),
	url(r'^expenses/(?P<year>\d+)/(?P<month>\d+)/', MonthExpenseListView.as_view(), name='month_expenses'),
    url(r'^incomes/(?P<year>\d+)/(?P<month>\d+)/', MonthIncomeListView.as_view(), name='month_incomes'),
	url(r'^incomes/(?P<pk>\d+)/', IncomeView.as_view(), name='income'),
	url(r'^expenses/(?P<pk>\d+)/', ExpenseView.as_view(), name='expense'),
	url(r'^expenses/', ExpenseListView.as_view(), name='expenses'),
    url(r'^incomes/', IncomeListView.as_view(), name='incomes'),
	url(r'^totals/(?P<year>\d+)/(?P<month>\d+)/', TotalsView.as_view(), name='totals'),
	url(r'^start_date/', StartDateView.as_view(), name='start_date'),
]