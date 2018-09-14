# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from forms import LinkLoginForm
from plaid import Client
from datetime import datetime
from api.models import Expense, Income, ExpenseCategory, IncomeCategory

PLAID_CLIENT_ID = '5b9aa2d15d37d30015fd23ee'
PLAID_SECRET = '2f5c452c876c17184b1a51086ea2b9'
PLAID_PUBLIC_KEY = '9d7db14e1dc1a8595c35d7ad861e8e'
PLAID_ENV = 'sandbox'

access = {
    "access_token": "access-sandbox-21f6757d-8a71-456a-b21e-1a16ad07a61c",
    "item_id": "L31RKoRGRnI7PmG7PXRnuGw1jDZkzdfPbxmv1",
    "request_id": "zhpzB"
}
def log_transactions(transactions):
    for transaction in transactions:
        if transaction['amount'] > 0:
            transaction_id = transaction['transaction_id']
            expense = {
                'transaction_id': transaction_id,
                'amount': transaction['amount'],
                'time': datetime.strptime(transaction['date'], '%Y-%m-%d'),
                'description': transaction['name'],
                'party': 'plaid',
                'category': ExpenseCategory.objects.get(pk=1),
            }

            Expense.objects.get_or_create(transaction_id=transaction_id, defaults=expense)

class FetchView(APIView):

    def post(self, request):
        client = Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY, environment=PLAID_ENV)
        today = datetime.today().strftime('%Y-%m-%d')
        first_day = datetime.today().replace(day=1).strftime('%Y-%m-%d')
        transactions = client.Transactions.get(access['access_token'], start_date=first_day, end_date=today)['transactions']
        log_transactions(transactions)
        return Response(transactions, status=status.HTTP_200_OK)


class LinkView(APIView):
    def post(self, request):
        login_form = LinkLoginForm(request.data)
        if login_form.is_valid():
            client = Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY, environment=PLAID_ENV)
            access_token = client.Item.public_token.exchange(login_form.cleaned_data.get('public_token', ''))
            return Response(access_token, status=status.HTTP_200_OK)
        return Response(login_form.errors, status=status.HTTP_400_BAD_REQUEST)
