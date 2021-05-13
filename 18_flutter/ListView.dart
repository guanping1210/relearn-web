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

// 2、长列表，用于渲染大量数据，
