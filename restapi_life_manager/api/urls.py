from django.conf.urls import url, include
from views import ExpenseView, IncomeView, ExpenseCategoryView, IncomeCategoryView

urlpatterns = [
	url(r'^expenses/categories/', ExpenseCategoryView.as_view(), name='expense_categories'),
	url(r'^incomes/categories/', IncomeCategoryView.as_view(), name='income_categories'),
    url(r'^expenses/', ExpenseView.as_view(), name='expenses'),
    url(r'^incomes/', IncomeView.as_view(), name='incomes'),
]