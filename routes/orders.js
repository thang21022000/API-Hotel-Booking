import express from 'express';
import { createOrder, deleteOrder, deleteOrderandUpdateUser, getOrder, getOrderByUser, getOrders, updateOrder } from '../controllers/order.js';

const router = express.Router();

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// GET ORDER BY ID
router.get("/:id", getOrder);

router.put("/:id/:iduser", deleteOrderandUpdateUser);

// UPDATE ORDER BY ID
router.put("/:id", updateOrder);

// DELETE ORDER BY ID
router.delete("/:id", deleteOrder);

// GET ORDER BY USER
router.get("/user/:id", getOrderByUser);


export default router;