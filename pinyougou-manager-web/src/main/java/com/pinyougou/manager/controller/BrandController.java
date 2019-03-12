package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;

import entity.PageResult;
import entity.QueryVo;
import entity.Result;

@RestController
@RequestMapping("/brand")
public class BrandController {
	
	
	@Reference //调用远程服务
	private BrandService brandService;
	
	/**
	 * 查询品牌列表
	 * @return
	 */
	@RequestMapping("/findAll.do")
	public List<TbBrand> findAll() {
		return brandService.findAll();
	}
	
	/**
	 * 分页查询品牌数据列表
	 * page 当前页
	 * rows:每页显示的记录数
	 */
	@RequestMapping("/findPage.do")
	public PageResult<TbBrand> findPage(int page,int rows) {
		return brandService.findPage(page, rows);
	}
	
	/**
	 * 添加品牌
	 */
	@RequestMapping("/add.do")
	//使用@RequestBody来接收json类型的请求参数
	public Result add(@RequestBody TbBrand brand) {
		try {
			//调用远程服务
			brandService.add(brand);
			return new Result(true, "添加成功！");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //在控制台打印错误信息
			//调用远程服务
			return new Result(false, "添加失败！");
		}	
	}
	
	/**
	 * 根据品牌id查询品牌信息
	 */
	@RequestMapping("/findOne.do")
	public TbBrand findOne(Long id) {
		return brandService.findOne(id);
	}
	/**
	 * 修改品牌信息
	 */
	@RequestMapping("/update.do")
	public Result update(@RequestBody TbBrand brand){
		try {
			brandService.update(brand);
			return new Result(true, "修改成功！"); 
		} catch (Exception e) {
			e.printStackTrace(); //向控制台打印异常信息
			return new Result(false, "修改失败！"); 
		}
	}
	
	
	/**
	 * 根据品牌id列表批量删除品牌信息
	 */
	@RequestMapping("/delete.do")
	public Result delete(Long[] ids) {
		try {
			brandService.delete(ids);
			return new Result(true, "删除成功！"); 
		} catch (Exception e) {
			e.printStackTrace(); //向控制台打印异常信息
			return new Result(false, "删除失败！"); 
		}
	}
	
	/**
	 * 根据条件查询并分页
	 */
	@RequestMapping("/search.do")
	public PageResult<TbBrand> search(@RequestBody QueryVo queryVo) {
		return brandService.findPage(queryVo);
	}
	
	/**
	 * 查询指定的字段封装到map中
	 */
	@RequestMapping("/selectOptionList.do")
	public List<Map<String, String>> selectOptionList(){
		//调用服务
		return brandService.selectOptionList();
	}
}
