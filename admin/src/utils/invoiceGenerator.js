import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const generateInvoice = (order) => {

    const doc = new jsPDF();

    // Heading
    doc.setFontSize(22);
    doc.setTextColor(255, 99, 71);
    doc.text(" SD SHOP SMART", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Food Delivery Invoice", 105, 30, { align: "center" });

    doc.line(15, 35, 195, 35);

    // Invoice Details
    doc.setFontSize(12);

    doc.text(`Invoice No : INV-${order._id.slice(-6)}`, 15, 45);
    doc.text(`Order ID : ${order._id}`, 15, 53);

    doc.text(
        `Date : ${new Date(order.date).toLocaleDateString()}`,
        15,
        61
    );

    doc.text(
        `Payment : ${order.payment ? "Paid" : "Pending"}`,
        15,
        69
    );

    doc.text(
        `Status : ${order.status}`,
        15,
        77
    );

    // Customer Details
    doc.setFontSize(14);
    doc.text("Customer Details", 15, 92);

    doc.setFontSize(11);

    doc.text(
        `Name : ${order.address.firstName} ${order.address.lastName}`,
        15,
        100
    );

    doc.text(
        `Phone : ${order.address.phone}`,
        15,
        108
    );

    doc.text(
        `Address :`,
        15,
        116
    );

    doc.text(
        `${order.address.street}`,
        25,
        124
    );

    doc.text(
        `${order.address.city}, ${order.address.state}`,
        25,
        132
    );

    doc.text(
        `${order.address.country} - ${order.address.pincode}`,
        25,
        140
    );

    // Items Table

    const rows = order.items.map((item, index) => [

        index + 1,

        item.name,

        item.quantity,

        `₹${item.price}`,

        `₹${item.quantity * item.price}`

    ]);

    autoTable(doc, {

        startY: 150,

        head: [[

            "SL",

            "Item",

            "Qty",

            "Price",

            "Total"

        ]],

        body: rows

    });

    const tableEnd = doc.lastAutoTable.finalY;

    // Totals

    doc.setFontSize(12);

    doc.text(
        `Delivery Charge : ₹20`,
        140,
        tableEnd + 15
    );

    doc.text(
        `Grand Total : ₹${order.amount}`,
        140,
        tableEnd + 25
    );

    doc.line(15, tableEnd + 35, 195, tableEnd + 35);

    doc.setFontSize(13);

    doc.text(
        "Thank You For Ordering!",
        105,
        tableEnd + 48,
        { align: "center" }
    );

    doc.save(`Invoice_${order._id}.pdf`);

};

export default generateInvoice;