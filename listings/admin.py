from django.contrib import admin
from .models import Property, Booking

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'city', 'price_per_night', 'max_guests', 'created_at')
    list_filter = ('city', 'country', 'owner')
    search_fields = ('title', 'description', 'city', 'country')
    raw_id_fields = ('owner',) # Useful for selecting users when there are many
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('property', 'guest', 'start_date', 'end_date', 'status', 'created_at')
    list_filter = ('status', 'start_date', 'end_date', 'guest', 'property__city')
    search_fields = ('property__title', 'guest__username', 'guest__email')
    raw_id_fields = ('guest', 'property')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
