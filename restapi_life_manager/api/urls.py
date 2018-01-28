from django.conf.urls import url, include
from views import ExpenseView, IncomeView, CategoryView

urlpatterns = [
    url(r'^expenses/', ExpenseView.as_view(), name='expenses'),
    url(r'^incomes/', IncomeView.as_view(), name='incomes'),
    url(r'^categories/', CategoryView.as_view(), name='categories'),
]