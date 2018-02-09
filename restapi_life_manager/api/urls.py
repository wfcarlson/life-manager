from django.conf.urls import url, include
from views import ExpenseView, IncomeView, ExpenseListView, IncomeListView, ExpenseCategoryView, IncomeCategoryView, TotalsView

urlpatterns = [
	url(r'^expenses/categories/', ExpenseCategoryView.as_view(), name='expense_categories'),
	url(r'^incomes/categories/', IncomeCategoryView.as_view(), name='income_categories'),
	url(r'^incomes/(?P<pk>\d+)/', IncomeView.as_view(), name='income'),
	url(r'^expenses/(?P<pk>\d+)/', ExpenseView.as_view(), name='expense'),
    url(r'^expenses/', ExpenseListView.as_view(), name='expenses'),
    url(r'^incomes/', IncomeListView.as_view(), name='incomes'),
	url(r'^totals/', TotalsView.as_view(), name='totals'),
]