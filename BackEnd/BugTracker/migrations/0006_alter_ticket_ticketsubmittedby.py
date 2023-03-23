# Generated by Django 4.1.7 on 2023-03-14 14:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('BugTracker', '0005_alter_ticket_ticketassignedto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='TicketSubmittedBy',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Ticket_submitted_by', to=settings.AUTH_USER_MODEL),
        ),
    ]