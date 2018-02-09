# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from models import Expense, Income, ExpenseCategory, IncomeCategory
from serializers import ExpenseSerializer, IncomeSerializer, ExpenseCategorySerializer, IncomeCategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ExpenseListView(APIView):

    def get(self, request, format=None):
    	expenses = Expense.objects.all()
    	serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
    	serializer = ExpenseSerializer(data=request.data)

    	if serializer.is_valid():
    		serializer.save()
    		return Response(serializer.data, status=status.HTTP_201_CREATED)
    	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseView(APIView):

    def delete(self, request, pk):
        expense = get_object_or_404(Expense, pk=pk)
        expense.delete()
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)


class IncomeView(APIView):
    
    def delete(self, request, pk):
        income = get_object_or_404(Income, pk=pk)
        income.delete()
        serializer = IncomeSerializer(income)
        return Response(serializer.data, status=status.HTTP_200_OK)        


class IncomeListView(APIView):

    def get(self, request, format=None):
    	incomes = Income.objects.all()
    	serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
    	serializer = IncomeSerializer(data=request.data)

    	if serializer.is_valid():
    		serializer.save()
    		return Response(serializer.data, status=status.HTTP_201_CREATED)
    	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseCategoryView(APIView):

    def get(self, request, format=None):
        categories = ExpenseCategory.objects.all()
        serializer = ExpenseCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ExpenseCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncomeCategoryView(APIView):

    def get(self, request, format=None):
        categories = IncomeCategory.objects.all()
        serializer = IncomeCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = IncomeCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TotalsView(APIView):

    def get(self, request, format=None):
        income_categories = IncomeCategory.objects.all()
        expense_categories = ExpenseCategory.objects.all()
        expenses = Expense.objects.all()
        incomes = Income.objects.all()

        expense_totals = {}
        for cat in expense_categories:
            expense_totals[cat.name] = 0
        
        total_expense = 0
        for expense in expenses:
            expense_totals[expense.category.name] += expense.amount
            total_expense += expense.amount

        income_totals = {}
        for cat in income_categories:
            income_totals[cat.name] = 0
        
        total_income = 0
        for income in incomes:
            income_totals[income.category.name] += income.amount
            total_income += income.amount
        
        net = total_income - total_expense

        response_data = {
            "net": net,
            "total_income": total_income,
            "total_expense": total_expense,
            "incomes":income_totals,
            "expenses":expense_totals,
        }

        return Response(response_data, status=status.HTTP_200_OK)

        

