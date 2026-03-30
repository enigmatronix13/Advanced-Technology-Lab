import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Q2: GridView Images',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const ImageGridScreen(),
    );
  }
}

class ImageGridScreen extends StatelessWidget {
  const ImageGridScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final imageUrls = [
      'https://www.johnlennon.com/wp-content/uploads/2022/05/JL.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUvqhPvWXzeQFLNJJu4qbY8bGqKfmsMRu3g&s',
      'https://hips.hearstapps.com/hmg-prod/images/sir-paul-mccartney-attends-the-uk-premiere-of-the-beatles-news-photo-1696266546.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5b/ARTIST_INTERVIEW_-_Ringo_Starr_%28Former_the_Beatles%29_exclusive_interview_0-14_screenshot_%28portrait_crop%29.jpg',
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Beatles Grid'),
        centerTitle: true,
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(8.0),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: imageUrls.length,
        itemBuilder: (context, index) {
          return ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.network(
              imageUrls[index],
              fit: BoxFit.cover,
              loadingBuilder: (context, child, loadingProgress) {
                if (loadingProgress == null) return child;
                return Container(
                  color: Colors.grey[200],
                  child: const Center(
                    child: CircularProgressIndicator(),
                  ),
                );
              },
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  color: Colors.grey[300],
                  child: const Icon(Icons.broken_image, size: 40),
                );
              },
            ),
          );
        },
      ),
    );
  }
}