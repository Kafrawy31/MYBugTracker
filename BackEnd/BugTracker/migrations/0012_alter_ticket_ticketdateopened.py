# Generated by Django 4.1.7 on 2023-03-22 16:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0011_alter_ticket_ticketdateopened'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='TicketDateOpened',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
