/**
 * @apiDefine IllegalArgumentError
 *
 * @apiError IllegalArgument The passed argument was not found or illegal
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 IllegalArgument
 *     {
 *       "error": "The pased argument was illegal"
 *     }
 */

/**
 * @apiDefine AuthArgumentRequired
 *
 * @apiParam (Login) {String} idtoken The Firebase IdToken
 */
