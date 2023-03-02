# Generated by Django 4.1.7 on 2023-02-28 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0003_remove_ticket_ticketassignedto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devuser',
            name='UserPoints',
            field=models.IntegerField(default=0, editable=False),
        ),
        migrations.AlterField(
            model_name='devuser',
            name='UserRole',
            field=models.TextField(choices=[('Developer', 'DEV'), ('Senior', 'SEN'), ('Admin', 'ADM')], default='DEV', max_length=12, null=True),
        ),
    ]
