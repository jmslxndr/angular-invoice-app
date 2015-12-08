var mongoose = require('mongoose');

// invoice schema
var invoiceSchema = mongoose.Schema({
	customer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	service:{
		type: String,
		required: true
	},
	price:{
		type: String
	},
	due:{
		type: String
	},
	status:{
		type: String,
		required: true
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
});

var Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

//Get invoices
module.exports.getInvoices = function(callback, limit){
	Invoice.find(callback).limit(limit).populate('customer').sort([['createdAt', 'descending']]);
}

//Get invoice
module.exports.getInvoiceById = function(id, callback){
	Invoice.findById(id, callback);
}

// Add Invoice
module.exports.addInvoice = function(invoice, callback){
	var add = {
		customer: invoice.customer_id,
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.create(add, callback);
}

// Update Invoice
module.exports.updateInvoice = function(id, invoice, options, callback){
	var query = {_id: id};
	var update = {
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.findOneAndUpdate(query, update, options, callback);
}

// Remove Invoice
module.exports.removeInvoice = function(id, callback){
	var query = {_id: id};
	Invoice.remove(query, callback);
}

// Get Customer Invoices
module.exports.getCustomerInvoices = function(customer_id, callback, limit){
	var query = {customer: customer_id};
	Invoice.find(query, callback).limit(limit).populate('customer').sort([['createdAt', 'ascending']]);
}
