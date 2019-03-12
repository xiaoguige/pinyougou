package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojogroup.Specification;
import com.pinyougou.sellergoods.service.SpecificationService;

import entity.PageResult;
import entity.QueryVo;
import entity.Result;

@RestController //相当于@controller 和@responseBody
@RequestMapping("/specification")
public class SpecificationController {
	
	@Reference //调用远程服务
	private SpecificationService specificationService;
	
	
	//查询所有,同时进行分页 page:当前页,rows:每页显示的记录数
	@RequestMapping("/findAll.do")
	public PageResult<TbSpecification> findAll(Integer page,Integer rows) {
		PageResult<TbSpecification> pageResult = specificationService.findAll(page, rows);
		return pageResult;
	}
	
	//多条件查询并进行分页 @requestbody 可以将json字符串转成实体对象 @responseBody 可以将实体对象转成json对象
	@RequestMapping("/findPage.do")
	public PageResult<TbSpecification> findPage(@RequestBody QueryVo queryVo) {
		PageResult<TbSpecification> pageResult = specificationService.findPage(queryVo);
		return pageResult;
	}
	
	@RequestMapping("/add.do")
	public  Result add(@RequestBody Specification specification) {
		try {
			specificationService.add(specification);
			return new Result(true, "添加成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //向控制台输出异常信息
			return new Result(false, "添加失败!");
		}
	}
	
	@RequestMapping("/update.do")
	public  Result update(@RequestBody Specification specification) {
		try {
			specificationService.update(specification);
			return new Result(true, "修改成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //向控制台输出异常信息
			return new Result(false, "修改失败!");
		}
	}
	@RequestMapping("/deleteSpec.do")
	public Result deleteSpec(Long[] ids) {
		try {
			specificationService.delete(ids);
			return new Result(true, "删除成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //向控制台输出异常信息
			return new Result(false, "删除失败!");
		}
	}
	
	//根据规格id查询规格,规格选项
	@RequestMapping("/findOne.do")
	public Specification findOne(long id){
		Specification specification = specificationService.findOne(id);
		
		if(specification != null){
			return specification;
		}else{
			throw new RuntimeException("获取规格信息失败!");
		}
	}
	
	
	//根据规格选项id删除规格选项信息
	@RequestMapping("/deleteSpecOption.do")
	public Result deleteSpecOption(long id) {
		try {
			specificationService.deleteSpecOption(id);
			return new Result(true, "删除成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //向控制台输出异常信息
			return new Result(false, "删除失败!");
		}
	}
	//查询规格列表,name字段别名配置为text,为了与前angularJs-select2插件需要的data数据一致
	@RequestMapping("/selectOptionList.do")
	public List<Map<String, String>> selectOptionList(){
		return specificationService.selectOptionList();
	}
}
