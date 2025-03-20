package vttp.batch4.csf.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping("/order")
  public ResponseEntity<String> postOrder(@RequestBody Order order) {
    // TODO Task 3
    
    try {
      poSvc.createNewPurchaseOrder(order);
      // Return success response with order ID in JSON format
      return ResponseEntity.ok("{\"orderId\":\"" + order.getOrderId() + "\"}");
    } catch (Exception e) {
      // Return error response if there's a problem
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
             .body("{\"message\":\"" + e.getMessage() + "\"}");
    }
  }
}
