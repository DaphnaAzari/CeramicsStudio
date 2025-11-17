const { body, validationResult } = require('express-validator');


//This is in order to catch bad inputs early (e.g. price NaN.missing fields etc)
//.toFloat()  ensures req.body.price becomes a Number
//to deal with case sensative changes: .customSanitizer(value => value.toLowerCase())


exports.validateProduct = [
    body('productName')
        .trim()
        .notEmpty()
        .withMessage('Product name is required'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number')
        .toFloat(),

    body('artType')
        .notEmpty().withMessage('Art type is required')
        // .customSanitizer(value => value.toLowerCase())
        .isIn(['Animal Figures', 'Human Figures', 'Homeware', 'Abstract'])
        .withMessage('Invalid art type'),

    // Final middleware to check results (errors.array() returns an array of error objects)
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
];