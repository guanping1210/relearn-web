// 路由 导航，主要由Navigator来实现
import 'dart:html';
import 'dart:io';

class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold (
      appBar: new AppBar(
        title: new Text('first page')
      ),
      body: new Center(
        child: new RaisedButton(
          child: new Text('first page content'),
          onPressed: () {
            // 路由跳转的地方,调用push，跳转到第二个页面
            Navigator.push(context, 
              new MaterialPageRoute(builder: (context) => new SecondPage())
            )
          }
        )
      )
    )
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold (
      appBar: new AppBar(
        title: new Text('second page')
      ),
      body: new Center(
        child: new RaisedButton(
          child: new Text('second page content'),
          onPressed: () {
            // 路由跳转的地方， pop回到第一个页面
            Navigator.pop(context)
          },
          child: new Text('go back'),
        )
      )
    ),
  }
}