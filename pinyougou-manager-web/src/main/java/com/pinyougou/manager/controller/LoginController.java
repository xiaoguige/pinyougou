package com.pinyougou.manager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 登录相关的controller
 * @author zsl
 *
 */
@RestController
@RequestMapping("/login")
public class LoginController {
	
	/**
	 * 显示用户名
	 */
	@RequestMapping("showName.do")
	public Map<String, String> showName() {
		String loginName = SecurityContextHolder.getContext().getAuthentication().getName();
		Map<String, String> map = new HashMap<String,String>();
		map.put("loginName", loginName);
		return map;
	}
}
