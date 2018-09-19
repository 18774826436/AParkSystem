package com.imust.controller;

import java.util.List;
import java.util.jar.Attributes;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.imust.entity.Park;
import com.imust.entity.Order;
import com.imust.entity.Users;
import com.imust.service.ParkService;
import com.imust.service.UserService;
import com.imust.service.OrderService;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/car")
public class ParkController {
	@Autowired
	private ParkService parkService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/car-select")
	public String getCarByKey(Model model) {
		List<Park> carList = parkService.getAll();
		model.addAttribute("carList",carList);
		model.addAttribute("carNum",carList.size());
		return "list";
	}
	
	@RequestMapping("/findCar")
	public String findCar(@RequestParam("status") int status,Model model) {
		model.addAttribute("status",status);
		if(status==-1) {
			List<Park> carList = parkService.getAll();
			model.addAttribute("carList",carList);
		}else {
			List<Park> carList = parkService.getAllByKey(status);
			model.addAttribute("carList",carList);
			model.addAttribute("carNum",carList.size());
		}
		return "list";
	}

	@RequestMapping("/detail")
	public String editCar(Model model){
		//Park car = parkService.getById(id);
		//model.addAttribute("car",car);
		List<Park> carList = parkService.getAll();

		int count=0;
		for(Park o:carList){
			if(o.getStatus()==0){
				count++;
			}
		}

		model.addAttribute("count",count);
		model.addAttribute("carNum",carList.size());
		return "detail";
	}

	@RequestMapping("/detail2")
	public String Navigation(){
		//Park car = parkService.getById(id);
		//model.addAttribute("car",car);
		return "detail2";
	}

	@RequestMapping("/tips")
	public String tips(Model model, @RequestParam("message") String s){

        model.addAttribute("message",s);

		return "tips";
	}


	@RequestMapping("/buy")
	public String buy(HttpSession session, @RequestParam("id") int id, RedirectAttributes attributes){
		Park car = parkService.getById(id);
		Users user = (Users)session.getAttribute("LogUser");
		List<Park> carList = parkService.getAll();
		for(Park o:carList){
			if(o.getId()==id &o.getStatus()==1){
                attributes.addAttribute("message","哎呀，来晚一步，这个车位已经被抢了~");
                return "redirect:/car/tips";
			}
		}

		List<Order> orderList = orderService.getAll();
		for(Order  o:orderList){
			if(o.getUser_id()==user.getId() &o.getStatus()== 0 ){
				attributes.addAttribute("message","亲，您还有一个订单未结算，请先到个人中心结算哦~");
				return "redirect:/car/tips";
			}
		}

		int p = user.getPoint();
		car.setStatus(1);
		if(parkService.updateCarStatus(car)) {
			Order order =new Order();
			order.setUser_id(user.getId());

			order.setPark_id(id);
			if(p>=100&&p<300) {
				order.setTotal(car.getPrice()*0.9);
			}else if(p>=300&&p<500) {
				order.setTotal(car.getPrice()*0.8);
			}else if(p>=500) {
				order.setTotal(car.getPrice()*0.7);
			}

			if(orderService.addOrder(order)) {
				user.setPoint(p+10);
				userService.updatePoint(user);
			}
		}
		return "redirect:/order/showOrder";
	}
}
