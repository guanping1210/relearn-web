// @ts-nocheck
/**
 * 监控用户行为: 点击、输入
 */
import { setCommonProperty, base64EncodeUnicode, checkUrlChange } from './utils'

// 用户行为日志，继承于日志基类MonitorBaseInfo
function BehaviorInfo(uploadType, behaviorType, className, placeholder, inputValue, tagName, innerText) {
    setCommonProperty.apply(this);
    this.uploadType = uploadType;
    this.behaviorType = behaviorType;
    this.className = base64EncodeUnicode(className);
    this.placeholder = base64EncodeUnicode(placeholder);
    this.inputValue = base64EncodeUnicode(inputValue);
    this.tagName = tagName;
    this.innerText = base64EncodeUnicode(encodeURIComponent(innerText));
  }

function recordBehavior(project) {
    // 行为记录开关
    if (project && project.record && project.record == 1) {
    // 记录行为前，检查一下url记录是否变化
    checkUrlChange();
    // 记录用户点击元素的行为数据
    document.onclick = function (e) {
        var className = "";
        var placeholder = "";
        var inputValue = "";
        var tagName = e.target.tagName;
        var innerText = "";
        if (e.target.tagName != "svg" && e.target.tagName != "use") {
            className = e.target.className;
            placeholder = e.target.placeholder || "";
            inputValue = e.target.value || "";
            innerText = e.target.innerText.replace(/\s*/g, "");

            // 如果点击的内容过长，就截取上传
            if (innerText.length > 200) innerText = innerText.substring(0, 100) + "... ..." + innerText.substring(innerText.length - 99, innerText.length - 1);
                innerText = innerText.replace(/\s/g, '');
            }
    
            let behaviorInfo = new BehaviorInfo(ELE_BEHAVIOR, "click", className, placeholder, inputValue, tagName, innerText);
            behaviorInfo.handleLogInfo(ELE_BEHAVIOR, behaviorInfo);
        }
    }
}