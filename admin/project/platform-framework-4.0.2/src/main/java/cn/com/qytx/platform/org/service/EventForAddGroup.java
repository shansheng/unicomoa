package cn.com.qytx.platform.org.service;

import org.springframework.context.ApplicationEvent;

import cn.com.qytx.platform.org.domain.GroupInfo;

/**
 * 定义添加部门的事件,参数是部门对象(GroupInfo)
 * @author jiayongqiang
 *
 */
public class EventForAddGroup extends ApplicationEvent {

	private GroupInfo g;
	
	public EventForAddGroup(GroupInfo source) {
		super(source);
		// TODO Auto-generated constructor stub
		this.g = source;
	}

	@Override
	public GroupInfo getSource() {
		// TODO Auto-generated method stub
		return this.g;
	}
	
	

}
