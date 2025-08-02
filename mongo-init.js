// MongoDB initialization script
db = db.getSiblingDB('quicktask');

// Create application user with read/write permissions
db.createUser({
  user: 'quicktask-user',
  pwd: 'quicktask-password',
  roles: [
    {
      role: 'readWrite',
      db: 'quicktask'
    }
  ]
});

// Create initial collections if needed
db.createCollection('tasks');

print('MongoDB initialization completed for quicktask database');