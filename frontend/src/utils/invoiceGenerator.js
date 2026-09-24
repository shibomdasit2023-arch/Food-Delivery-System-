import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = (order) => {

    const doc = new jsPDF();

    // ==========================
    // Header
    // ==========================

    doc.setFontSize(22);
    doc.setTextColor(255, 99, 71);
    doc.text(" SD SHOP SMART", 105, 20, { align: "center" });

    doc.setTextColor(0);
    doc.setFontSize(15);
    doc.text("Food Delivery Invoice", 105, 30, { align: "center" });

    doc.line(15, 36, 195, 36);

    // ==========================
    // Invoice Info
    // ==========================

    doc.setFontSize(11);

    doc.text(
        `Invoice No : INV-${order._id.slice(-6)}`,
        15,
        46
    );

    doc.text(
        `Order ID : ${order._id}`,
        15,
        54
    );

    doc.text(
        `Date : ${new Date(order.date).toLocaleDateString()}`,
        15,
        62
    );

    doc.text(
        `Payment : ${order.payment ? "Paid" : "Pending"}`,
        15,
        70
    );

    doc.text(
        `Status : ${order.status}`,
        15,
        78
    );

    // ==========================
    // Customer
    // ==========================

    doc.setFontSize(14);
    doc.text("Customer Details", 15, 92);

    doc.setFontSize(11);

    doc.text(
        `Name : ${order.address.firstName} ${order.address.lastName}`,
        15,
        102
    );

    doc.text(
        `Phone : ${order.address.phone}`,
        15,
        110
    );

    doc.text(
        `Street : ${order.address.street}`,
        15,
        118
    );

    doc.text(
        `City : ${order.address.city}`,
        15,
        126
    );

    doc.text(
        `State : ${order.address.state}`,
        15,
        134
    );

    doc.text(
        `Country : ${order.address.country}`,
        15,
        142
    );

    doc.text(
        `Pincode : ${order.address.pincode}`,
        15,
        150
    );

    // ==========================
    // Items Table
    // ==========================

    const rows = order.items.map((item, index) => [

        index + 1,

        item.name,

        item.quantity,

        `₹${item.price}`,

        `₹${item.price * item.quantity}`

    ]);

    autoTable(doc, {

        startY: 160,

        head: [[
            "SL",
            "Item",
            "Qty",
            "Price",
            "Total"
        ]],

        body: rows,

        styles: {

            halign: "center"

        },

        headStyles: {

            fillColor: [255, 99, 71]

        }

    });

    const endY = doc.lastAutoTable.finalY;

    // ==========================
    // Totals
    // ==========================

    const deliveryCharge = 20;
    const grandTotal = order.amount;

    doc.setFontSize(12);

    doc.text(
        `Delivery Charge : ₹${deliveryCharge}`,
        135,
        endY + 15
    );

    doc.text(
        `Grand Total : ₹${grandTotal}`,
        135,
        endY + 25
    );

    doc.line(
        15,
        endY + 35,
        195,
        endY + 35
    );

    // ==========================
    // Footer
    // ==========================

    doc.setFontSize(13);

    doc.text(
        "Thank You For Ordering!",
        105,
        endY + 48,
        {
            align: "center"
        }
    );

    doc.setFontSize(10);

    doc.text(
        "Computer Generated Invoice",
        105,
        endY + 56,
        {
            align: "center"
        }
    );

    doc.save(`Invoice_${order._id}.pdf`);

};

export default generateInvoice;