import 'package:flutter/material.dart';

void main() => runApp(SurveyApp());

class SurveyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MovieSurvey(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MovieSurvey extends StatefulWidget {
  @override
  _MovieSurveyState createState() => _MovieSurveyState();
}

class _MovieSurveyState extends State<MovieSurvey> {
  final _formKey = GlobalKey<FormState>();
  final _movieController = TextEditingController();

  int? _rating = 3; // Default 3 stars
  bool _recommend = false;
  String? _errorMessage;

  bool get _isValid => _movieController.text.trim().isNotEmpty && _rating != null;

  @override
  void dispose() {
    _movieController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Movie Feedback'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              Icon(Icons.movie, size: 80, color: Colors.deepPurple),
              SizedBox(height: 20),
              Text(
                'How was your movie experience?',
                style: Theme.of(context).textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),

              SizedBox(height: 40),

              // Movie name TextField
              TextFormField(
                controller: _movieController,
                decoration: InputDecoration(
                  labelText: 'Movie Name *',
                  prefixIcon: Icon(Icons.local_movies),
                  border: OutlineInputBorder(),
                  errorStyle: TextStyle(color: Colors.red),
                ),
                validator: (value) {
                  if (value?.trim().isEmpty ?? true) {
                    return 'Please enter movie name';
                  }
                  return null;
                },
                onChanged: (_) {
                  setState(() => _errorMessage = null);
                },
              ),

              SizedBox(height: 30),

              // Rating RadioListTile
              Text('Rating', style: Theme.of(context).textTheme.titleMedium),
              RadioListTile<int>(
                title: Row(children: [
                  _buildStar(1),
                  if (_rating! >= 1) _buildStar(1, filled: true),
                ]),
                secondary: Text('Poor'),
                value: 1,
                groupValue: _rating,
                onChanged: (value) => setState(() => _rating = value),
              ),
              RadioListTile<int>(
                title: Row(children: [
                  _buildStar(1),
                  _buildStar(2),
                  if (_rating! >= 2) ...[
                    _buildStar(1, filled: true),
                    _buildStar(2, filled: true),
                  ],
                ]),
                secondary: Text('Fair'),
                value: 2,
                groupValue: _rating,
                onChanged: (value) => setState(() => _rating = value),
              ),
              RadioListTile<int>(
                title: Row(children: [
                  _buildStar(1),
                  _buildStar(2),
                  _buildStar(3),
                  if (_rating! >= 3) ...[
                    _buildStar(1, filled: true),
                    _buildStar(2, filled: true),
                    _buildStar(3, filled: true),
                  ],
                ]),
                secondary: Text('Good'),
                value: 3,
                groupValue: _rating,
                onChanged: (value) => setState(() => _rating = value),
              ),
              RadioListTile<int>(
                title: Row(children: [
                  _buildStar(1),
                  _buildStar(2),
                  _buildStar(3),
                  _buildStar(4),
                  if (_rating! >= 4) ...[
                    _buildStar(1, filled: true),
                    _buildStar(2, filled: true),
                    _buildStar(3, filled: true),
                    _buildStar(4, filled: true),
                  ],
                ]),
                secondary: Text('Great'),
                value: 4,
                groupValue: _rating,
                onChanged: (value) => setState(() => _rating = value),
              ),
              RadioListTile<int>(
                title: Row(children: [
                  _buildStar(1),
                  _buildStar(2),
                  _buildStar(3),
                  _buildStar(4),
                  _buildStar(5),
                  if (_rating! >= 5) ...[
                    _buildStar(1, filled: true),
                    _buildStar(2, filled: true),
                    _buildStar(3, filled: true),
                    _buildStar(4, filled: true),
                    _buildStar(5, filled: true),
                  ],
                ]),
                secondary: Text('Excellent'),
                value: 5,
                groupValue: _rating,
                onChanged: (value) => setState(() => _rating = value),
              ),

              SizedBox(height: 30),

              // Recommend Switch
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: Icon(Icons.share, color: Colors.orange),
                title: Text('Recommend to others?'),
                trailing: Switch(
                  value: _recommend,
                  onChanged: (value) => setState(() => _recommend = value),
                  activeColor: Colors.orange,
                ),
              ),

              SizedBox(height: 20),

              // Error message
              if (_errorMessage != null)
                Container(
                  padding: EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.red.shade200),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.error, color: Colors.red),
                      SizedBox(width: 12),
                      Expanded(child: Text(_errorMessage!, style: TextStyle(color: Colors.red.shade700))),
                    ],
                  ),
                ),

              SizedBox(height: 30),

              // Submit button
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: _isValid ? Colors.deepPurple : Colors.grey,
                  foregroundColor: Colors.white,
                ),
                onPressed: _isValid ? _submitFeedback : null,
                child: Text('Submit Feedback', style: TextStyle(fontSize: 18)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStar(int starNum, {bool filled = false}) {
    return Icon(
      filled ? Icons.star : Icons.star_border,
      color: Colors.amber,
      size: 24,
    );
  }

  void _submitFeedback() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _errorMessage = null;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Thanks! ${_movieController.text.trim()} rated $_rating stars '
                '${_recommend ? '👍 Recommended' : 'Not recommended'}',
          ),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 3),
        ),
      );

      debugPrint('Movie: ${_movieController.text}, Rating: $_rating, Recommend: $_recommend');
    }
  }
}
