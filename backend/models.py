# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Admin(models.Model):
    adminid = models.ForeignKey('User', models.DO_NOTHING, db_column='adminid', unique=True)

    class Meta:
        managed = False
        db_table = 'admin'


class Class(models.Model):
    classid = models.CharField(primary_key=True, max_length=45)
    teacherid = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='teacherid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'class'


class Experiment(models.Model):
    experimentid = models.IntegerField(primary_key=True)
    experimentname = models.CharField(max_length=45, blank=True, null=True)
    experimenturl = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'experiment'


class Report(models.Model):
    reportid = models.IntegerField(primary_key=True)
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentid', blank=True, null=True)
    reporturl = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'report'


class Student(models.Model):
    studentid = models.ForeignKey('User', models.DO_NOTHING, db_column='studentid', unique=True)
    class_field = models.ForeignKey(Class, models.DO_NOTHING, db_column='class', blank=True, null=True)  # Field renamed because it was a Python reserved word.
    studentname = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class Teacher(models.Model):
    teacherid = models.ForeignKey('User', models.DO_NOTHING, db_column='teacherid', unique=True)
    teachername = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'teacher'


class User(models.Model):
    userid = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=45)
    usertype = models.CharField(max_length=7)
    password = models.CharField(max_length=45)
    phone = models.CharField(unique=True, max_length=45, blank=True, null=True)
    email = models.CharField(unique=True, max_length=45, blank=True, null=True)
    nickname = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'user'
