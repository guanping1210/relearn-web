// @ts-nocheck
// 1、常规列表, 就是一次性会把children的内容渲染完成
class ListView {
    // 可以指定列表的方向, 水平方向， 默认是锤子方向
    scrollDirection: Axis.horizontal
    children: <Widget>[
        new ListTile {
            leading: new Icon(Icons.map),
            title: new Text('Maps'),
        },
        new ListTile {
          leading: new Icon(Icons.photo_album),
          title: new Text('Album')
        },
        new ListTile {
          leading: new Icon(Icons.photo),
          title: new Text('Phone')
        }
    ]
}

// 2、长列表，用于渲染大量数据，列表项滚动到屏幕上视图区的时候才创建该项
final items = new List<String>.generate(10000, i => "item $i") // 创建数据

new ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => {
    return new ListTile(
      title: new Text('${items[index]}')
    )
  }
)

// 3、Grid网格列表，使用 GridView widget
new GridView.count(
  
)

