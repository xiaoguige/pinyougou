package com.pinyougou.manager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.directory.SearchControls;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbTypeTemplate;
import com.pinyougou.sellergoods.service.TypeTemplateService;

import entity.PageResult;
import entity.Result;

@RestController
@RequestMapping("/typeTemplate")
public class TypeTemplateController {
	
	
	//远程调用服务
	@Reference
	private TypeTemplateService typeTemplateService;
	
	/**
	 * 查询所有的模版类型数据列表
	 * @return
	 */
	@RequestMapping("/findAll.do")
	public List<TbTypeTemplate> findAll() {
		return typeTemplateService.findAll();
	}
	
	//条件查询,并进行分页
	@RequestMapping("/search.do")
	public PageResult<TbTypeTemplate> search(Integer currentPage,Integer pageSize,@RequestBody TbTypeTemplate template){
		return typeTemplateService.search(currentPage,pageSize,template);
	}
	
	//添加类型模版实体
	@RequestMapping("/add.do")
	public Result add(@RequestBody TbTypeTemplate typeTemplate){
		try {
			typeTemplateService.add(typeTemplate);
			return new Result(true, "添加成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //输出异常在控制台
			return new Result(true, "添加失败!");
		}
		
	}
	//根据id查询实体
	@RequestMapping("/findOne.do")
	public TbTypeTemplate findOne(Long id){
		return typeTemplateService.findOne(id);
		
	};
	//更新实体
	@RequestMapping("/update.do")
	public Result update(@RequestBody TbTypeTemplate typeTemplate){
		try {
			typeTemplateService.update(typeTemplate);
			return new Result(true, "更新成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();  //输出异常至控制台
			return new Result(false, "更新失败!");
		}
	}
	//根据id列表批量删除实体
	@RequestMapping("/delete.do")
	public Result delete(Long[] ids){
		try {
			typeTemplateService.del(ids);
			return new Result(true, "删除成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();  //输出异常至控制台
			return new Result(false, "删除失败!");
		}
	}
	
	//查询指定字段封装到map
	@RequestMapping("/selectTypeTemplateOptionList.do")
	public List<Map<String, Object>> selectTypeTemplateOptionList() {
		List<Map<String, Object>> list = typeTemplateService.selectTypeTemplateOptionList();
		return list;
	}
}
