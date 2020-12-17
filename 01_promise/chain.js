/**
 * 实现promise链式调用，当上一个promise完成之后，才执行下一个promise
 */


 /**
  * 实现promise的批次链式调用
  * 设置一个阀值，同时执行N个promise, 其中任任意一个promise完成后，替补上另一个promise
  * 简单来说，也就是需求池上，始终有N个promise在同时执行
  */