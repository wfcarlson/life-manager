# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from models import Expense, Income, ExpenseCategory, IncomeCategory
from serializers import ExpenseSerializer, IncomeSerializer, ExpenseCategorySerializer, IncomeCategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ExpenseView(APIView):

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

class IncomeView(APIView):

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

class IncomeCategoryView(APIView):

    def get(self, request, format=None):
        categories = IncomeCategory.objects.all()
        serializer = IncomeCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
