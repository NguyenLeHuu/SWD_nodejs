const express = require('express');
const AgencyController = require('../controllers/AgencyController')

let route =  express.Router();

// route.get('/test',UserController.test);
route.get("/test", AgencyController.index);
/**
 * @swagger
 * components:
 *   schemas:
 *     Agency:
 *       type: object
 *       required:
 *         - idagency
 *         - name
 *       properties:
 *         idagency:
 *           type: number
 *           description: The auto-generated idagency of the agency
 *         name:
 *           type: string
 *           description: The agency name
 *       example:
 *         idagency: 1234
 *         name: UICHA
 */

 /**
  * @swagger
  * tags:
  *   name: agency
  *   description: The agency managing API
  */

 /**
 * @swagger
 * /agency/test:
 *   get:
 *     summary: Returns the list of all the agency
 *     tags: [agency]
 *     responses:
 *       200:
 *         description: The list of the agency
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agency'
 */


module.exports = route;