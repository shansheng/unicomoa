package com.unicomoa.unicomoa.workplan;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.unicomoa.unicomoa.base.BaseModel;

@Entity
@Table(name="tb_oa_work_plan")
public class WorkPlan extends BaseModel {

	@Column(name="plan_type")
	private int planType;
	
	@Column(name="content")
	private String content;
	
	@Column(name="one_day")
	private int oneDay;
	
	@Column(name="start_time")
	private Date startTime;
	
	@Column(name="end_time")
	private Date endTime;
	
	@Column(name="addr")
	private String addr;
	
	@Column(name="canyuren")
	private String canyuren;
	
	@Column(name="target")
	private int target;
	
	@Column(name="day_str")
	private String dayStr;

	public String getDayStr() {
		return dayStr;
	}

	public void setDayStr(String dayStr) {
		this.dayStr = dayStr;
	}

	public int getPlanType() {
		return planType;
	}

	public void setPlanType(int planType) {
		this.planType = planType;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getOneDay() {
		return oneDay;
	}

	public void setOneDay(int oneDay) {
		this.oneDay = oneDay;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getCanyuren() {
		return canyuren;
	}

	public void setCanyuren(String canyuren) {
		this.canyuren = canyuren;
	}

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
	}
	
}
