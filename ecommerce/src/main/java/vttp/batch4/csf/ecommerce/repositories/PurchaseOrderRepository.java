package vttp.batch4.csf.ecommerce.repositories;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.models.LineItem;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  private static String NEW_ORDER_SQL = """
      INSERT INTO orders (order_id, name, address, priority, comments)
      VALUES ( ?, ?, ?, ?, ?)
      """;

  public static String line_Item_SQL = "INSERT INTO line_items (order_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)";

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional
  public void create(Order order) throws SQLException {
    // TODO Task 3

    // Insert into 'orders' table
     template.update(NEW_ORDER_SQL,
        order.getOrderId(),
        order.getName(),
        order.getAddress(),
        order.isPriority(),
        order.getComments());

    // Insert line items into 'line_items' table
    for (LineItem item : order.getCart().getLineItems()) {
        template.update(line_Item_SQL,
          order.getOrderId(),
          item.getProductId(),
          item.getName(),
          item.getQuantity(),
          item.getPrice());
    }
  }
}