from django.apps import AppConfig


class IndexConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_management'

class UserManagementConfig(AppConfig):
    name = 'user_management'
    
    def ready(self):
        import user_management.signals