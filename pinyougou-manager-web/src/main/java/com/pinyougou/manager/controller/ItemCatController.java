/**   
 * Copyright © 2019 eSunny Info. Tech Ltd. All rights reserved.
 * 
 * 功能描述：
 * @Package: com.pinyougou.manager.controller
 * @author: zsl   
 * @date: 2019年2月17日 下午2:02:06 
 */
package com.pinyougou.manager.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbItemCat;
import com.pinyougou.sellergoods.service.ItemCatService;

import entity.Result;

/**   
* Copyright: Copyright (c) 2019 LanRu-Caifu
* 
* @ClassName: ItemCatController.java
* @Description: 商家分类的控制层
*
* @version: v1.0.0
* @author: zsl
* @date: 2019年2月17日 下午2:02:06 
*
* Modification History:
* Date         Author          Version            Description
*---------------------------------------------------------*
* 2019年2月17日     zsl           v1.0.0               修改原因
*/
@RestController
@RequestMapping("/itemCat")
public class ItemCatController {
	
	//远程调用itemService
	@Reference
	private ItemCatService itemCatService;
	
	
	/**   
	* @Function: ItemCatController.java
	* @Description: 根据上级id查询当前分类列表
	*
	* @param:描述1描述
	* @return：返回结果描述
	* @throws：异常描述
	*
	* @version: v1.0.0
	* @author: zsl
	* @date: 2019年2月17日 下午2:05:27 
	*
	* Modification History:
	* Date         Author          Version            Description
	*---------------------------------------------------------*
	* 2019年2月17日     zsl           v1.0.0               修改原因
	*/
	@RequestMapping("/findByParentId.do")
	public List<TbItemCat> findByParentId(Long id) {
		return itemCatService.findByParentId(id);
	}
	
	/**
	 * 根据id查询
	* @Function: ItemCatController.java
	* @Description: 该函数的功能描述
	*
	* @param:描述1描述
	* @return：返回结果描述
	* @throws：异常描述
	*
	* @version: v1.0.0
	* @author: zsl
	* @date: 2019年2月17日 下午5:55:45 
	*
	* Modification History:
	* Date         Author          Version            Description
	*---------------------------------------------------------*
	* 2019年2月17日     zsl           v1.0.0               修改原因
	 */
	@RequestMapping("/findOne.do")
	public TbItemCat findOne(Long id){
		return itemCatService.findOne(id);
	}
	
	/**
	 * 添加实体
	* @Function: ItemCatController.java
	* @Description: 该函数的功能描述
	*
	* @param:描述1描述
	* @return：返回结果描述
	* @throws：异常描述
	*
	* @version: v1.0.0
	* @author: zsl
	* @date: 2019年2月17日 下午5:56:33 
	*
	* Modification History:
	* Date         Author          Version            Description
	*---------------------------------------------------------*
	* 2019年2月17日     zsl           v1.0.0               修改原因
	 */
	@RequestMapping("/add.do")
	public Result add(@RequestBody TbItemCat itemCat){
		try {
			itemCatService.add(itemCat);
			return new Result(true, "添加成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //打印异常在控制台
			return new Result(false, "添加失败!");
		}
	}
	//更新实体
	@RequestMapping("/update.do")
	public Result update(@RequestBody TbItemCat itemCat){
		try {
			itemCatService.update(itemCat);
			return new Result(true, "更新成功!");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); //打印异常在控制台
			return new Result(false, "更新失败!");
		}
	}
	
	//根据id列表删除
	@RequestMapping("/del.do")
	public Result del(Long[] ids){
		try {
			List<Long> list = itemCatService.del(ids);
			if(list.size() >0){
				StringBuffer buffer = new StringBuffer();
				for(int i=0;i<list.size();i++){
					if(i == list.size() -1){
						buffer.append(list.get(i)+"");
					}else{
						buffer.append(list.get(i)+",");
					}
				}
				//说明存在该id对应的实体没有删除,把id响应到前端
				return new Result(true, buffer.toString());
			}else{
				return new Result(true, "删除成功!");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); 
			return new Result(false, "删除失败!");
		}
	}
	
}
