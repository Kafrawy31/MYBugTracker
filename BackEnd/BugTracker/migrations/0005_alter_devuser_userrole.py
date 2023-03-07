# Generated by Django 4.1.7 on 2023-03-01 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0004_alter_devuser_userpoints_alter_devuser_userrole'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devuser',
            name='UserRole',
            field=models.TextField(choices=[('Developer', 'DEV'), ('Senior', 'SEN'), ('Admin', 'ADM')], max_length=12, null=True),
        ),
    ]