import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Q1: ListView Students',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const StudentListScreen(),
    );
  }
}

/// Sample student model
class Student {
  final String name;
  final String branch;
  final IconData icon;

  Student({
    required this.name,
    required this.branch,
    required this.icon,
  });
}

class StudentListScreen extends StatelessWidget {
  const StudentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample student data
    final students = [
      Student(name: 'Alice Kumar', branch: 'Computer Science', icon: Icons.person),
      Student(name: 'Bob Singh', branch: 'Electronics', icon: Icons.engineering),
      Student(name: 'Carol Dev', branch: 'Mechanical', icon: Icons.build),
      Student(name: 'David Smith', branch: 'Civil', icon: Icons.architecture),
      Student(name: 'Eva Johnson', branch: 'Electrical', icon: Icons.bolt),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Students List'),
        centerTitle: true,
      ),
      // ListView displays students vertically using ListTile
      body: ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) {
          final student = students[index];
          return ListTile(
            leading: Icon(student.icon, color: Colors.blue),
            title: Text(student.name),
            subtitle: Text(student.branch),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Tapped: ${student.name}')),
              );
            },
          );
        },
      ),
    );
  }
}
