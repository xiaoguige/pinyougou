package com.pinyougou.manager.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;

import entity.PageResult;
import entity.QueryVo;
import entity.Result;

/**
 * 商家管理的控制层
 * @author zsl
 *
 */
@RestController
@RequestMapping("/seller")
public class SellerController {
	
	@Reference //调用远程服务
	private SellerService sellerService;
	
	/**
	 * @param queryVo  封装查询条件
	 * @return
	 */
	@RequestMapping("/search.do")
	public PageResult<TbSeller> search(@RequestBody QueryVo queryVo) { 
		PageResult<TbSeller> pageResult = sellerService.search(queryVo);
		return pageResult;
	}
	
	/**
	 * 根据id查询
	 */
	@RequestMapping("/findOne.do")
	public TbSeller findOne(String sellerId){
		TbSeller seller = sellerService.findOne(sellerId);
		return seller;
	}
	/**
	 * 根据sellerId修改状态
	 */
	@RequestMapping("/update.do")
	public Result update(String sellerId,String status){
		try{
			sellerService.update(sellerId, status);
			return new Result(true, "修改成功!");
		}catch(Exception e){
			e.printStackTrace(); //打印异常在控制台
			return new Result(false, "修改失败");
		}
	}
}
