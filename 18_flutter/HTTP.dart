// http package  或者 dio

// 1、简单的发起请求，但是拿回来的数据需要转为dart格式 
Future<http.Response> fetchPost() {
  return http.get('https://jsonplaceholder.typicode.com/posts/1');
}

// 2、将响应数据转为dart格式， 封装一个工具函数
class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({ this.userId, this.id, this.title, this.body});

  factory Post.fromJson(Map<string, dynamic> json) {
    return new Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body']
    );
  }
}

// 3、将1的代码进行改在
Future<Post> fetchPost2() async {
  final response = await http.get('https://jsonplaceholder.typicode.com/posts/1')
  final json = JSON.decode(response.body)

  return new Post.formJSON(json)
}