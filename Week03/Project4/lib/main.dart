import 'package:flutter/material.dart';

void main() => runApp(ListViewDemo());

class ListViewDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ListView Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: UserListScreen(),
    );
  }
}

class UserListScreen extends StatefulWidget {
  @override
  _UserListScreenState createState() => _UserListScreenState();
}

class _UserListScreenState extends State<UserListScreen> {
  // Sample data - replace with API data in real apps
  final List<Map<String, String>> _users = List.generate(
    100,
        (index) => {
      'name': 'User ${index + 1}',
      'role': ['Developer', 'Designer', 'Manager', 'Tester'][index % 4],
      'email': 'user${index + 1}@company.com',
      'avatar': 'https://i.pravatar.cc/40',
    },
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Team Directory (${_users.length} users)'),
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () => _showSearch(),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _users.length,
        padding: EdgeInsets.all(8),
        itemBuilder: (context, index) {
          final user = _users[index];
          return Card(
            margin: EdgeInsets.symmetric(vertical: 4),
            child: ListTile(
              // Leading avatar/icon
              leading: CircleAvatar(
                backgroundImage: NetworkImage(user['avatar']!),
                onBackgroundImageError: (_, __) => Icon(Icons.person),
                radius: 20,
              ),
              // Main content
              title: Text(
                user['name']!,
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('${user['role']}'),
                  Text(
                    user['email']!,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
              // Trailing action
              trailing: Icon(Icons.arrow_forward_ios, size: 16),
              // Interactive features
              onTap: () => _onUserTap(user),
              onLongPress: () => _onUserLongPress(user),
              // Visual feedback
              selected: index == 0, // Demo selected state
              selectedTileColor: Colors.blue.shade50,
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _addUser(),
        child: Icon(Icons.add),
        tooltip: 'Add User',
      ),
    );
  }

  void _onUserTap(Map<String, String> user) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Selected: ${user['name']}'),
        action: SnackBarAction(
          label: 'Details',
          onPressed: () => _showUserDetails(user),
        ),
      ),
    );
  }

  void _onUserLongPress(Map<String, String> user) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete ${user['name']}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          TextButton(
            onPressed: () {
              setState(() => _users.remove(user));
              Navigator.pop(context);
            },
            child: Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showUserDetails(Map<String, String> user) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => Scaffold(
          appBar: AppBar(title: Text(user['name']!)),
          body: Center(child: Text('User details for ${user['name']}')),
        ),
      ),
    );
  }

  void _addUser() {
    setState(() {
      _users.insert(0, {
        'name': 'New User ${_users.length + 1}',
        'role': 'Developer',
        'email': 'newuser${_users.length + 1}@company.com',
        'avatar': 'https://i.pravatar.cc/40',
      });
    });
  }

  void _showSearch() {
    showSearch(context: context, delegate: UserSearchDelegate(_users));
  }
}

// Search delegate for app bar search
class UserSearchDelegate extends SearchDelegate {
  final List<Map<String, String>> users;
  UserSearchDelegate(this.users);

  @override
  List<Widget> buildActions(BuildContext context) => [IconButton(icon: Icon(Icons.clear), onPressed: () => query = '')];

  @override
  Widget buildLeading(BuildContext context) => IconButton(icon: Icon(Icons.arrow_back), onPressed: () => close(context, null));

  @override
  Widget buildResults(BuildContext context) {
    final results = users.where((user) => user['name']!.toLowerCase().contains(query.toLowerCase())).toList();
    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) => ListTile(title: Text(results[index]['name']!)),
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final suggestions = users.where((user) => user['name']!.toLowerCase().contains(query.toLowerCase())).toList();
    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) => ListTile(title: Text(suggestions[index]['name']!)),
    );
  }
}
