# KAFF'S ENERGY STRIPS — COMMERCIAL BLUEPRINT & DISTRIBUTION GUIDE

**Executive Document:** Unit Economics, Profit Margins, Logistics & Channel Playbook  
**Products Analyzed:** Pack of 5 (MRP ₹229) & Pack of 10 (MRP ₹399)  
**Distribution Channels:** Own D2C Website | Amazon India (Easy Ship / FBA) | Quick Commerce (Blinkit, Zepto, Swiggy Instamart)  
**PDF Document:** [KAFFS_Energy_Economics_and_Distribution_Guide.pdf](./KAFFS_Energy_Economics_and_Distribution_Guide.pdf)

---

## 1. Product Baselines & Manufacturing Costs (COGS)

| SKU | Retail Selling Price (MRP) | Making Cost | Box & Finishing | Total Product Cost (COGS) |
| :--- | :---: | :---: | :---: | :---: |
| **Pack of 5 Strips** | **₹229.00** | ₹40.00 | ₹15.00 | **₹55.00** |
| **Pack of 10 Strips** | **₹399.00** | ₹65.00 | ₹35.00 | **₹100.00** |

---

## 2. Master Comparison: Unit Economics Across All 3 Channels

> **Important Policy Rule:** On your own website, **COD is completely disabled**. All orders are 100% Prepaid via UPI/Cards. This saves the ₹35 courier cash handling charge and eliminates return-to-origin (RTO) cancellation losses.

| Fee / Cost Component | Own Website (Pack of 5) | Own Website (Pack of 10) | Amazon IN (Pack of 5) | Amazon IN (Pack of 10) | Blinkit / Zepto (Pack of 5) | Blinkit / Zepto (Pack of 10) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Customer Price (MRP)** | **₹229.00** | **₹399.00** | **₹229.00** | **₹399.00** | **₹229.00** | **₹399.00** |
| Product Cost (Making + Box) | -₹55.00 | -₹100.00 | -₹55.00 | -₹100.00 | -₹55.00 | -₹100.00 |
| Platform / Commission Fee | -₹5.40 *(2.36%)* | -₹9.42 *(2.36%)* | -₹20.61 *(9%)* | -₹35.91 *(9%)* | -₹80.15 *(35%)* | -₹139.65 *(35%)* |
| Fixed Closing Fee | ₹0.00 | ₹0.00 | -₹12.00 | -₹26.00 | ₹0.00 | ₹0.00 |
| Customer Delivery / Shipping | -₹55.00 | -₹55.00 | -₹75.00 | -₹75.00 | ₹0.00 *(Platform)* | ₹0.00 *(Platform)* |
| Outer Packaging / Flyer & Label | -₹8.00 | -₹8.00 | -₹5.00 | -₹5.00 | -₹4.00 *(Bulk carton)* | -₹5.00 *(Bulk carton)* |
| GST on Courier / Platform Fees | *Included* | *Included* | -₹19.37 *(18%)* | -₹24.64 *(18%)* | *Included* | *Included* |
| Tracking SMS / WhatsApp Alerts | -₹0.60 | -₹0.60 | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| **TOTAL DEDUCTIONS** | **-₹124.00** | **-₹173.02** | **-₹186.98** | **-₹266.55** | **-₹139.15** | **-₹244.65** |
| **NET IN-HAND PROFIT** | **₹105.00** | **₹225.98 (~₹226)** | **₹42.02 (~₹42)** | **₹132.45 (~₹132)** | **₹89.85 (~₹90)** | **₹154.35 (~₹154)** |
| **Net Margin (% of MRP)** | **45.9%** | **56.6%** | **18.3%** | **33.2%** | **39.2%** | **38.7%** |

---

## 3. Key Financial Insights & Takeaways

1. **Own Website Yields Highest Cash Margins**:
   - You earn **₹226 in-hand profit per 10-pack** on your website compared to **₹132 on Amazon** and **₹154 on Quick Commerce**.
   - You make **₹93 more per unit** on your own site versus Amazon!
2. **Pack of 10 is the "Hero SKU"**:
   - Courier partners (Shiprocket, Delhivery) charge on a minimum **500g slab** regardless of whether you ship 5 strips or 10 strips (both weigh under 70 grams).
   - Because the shipping cost (₹55) is fixed, your net profit jumps from **₹105 (Pack of 5)** to **₹226 (Pack of 10)** — yielding **2.15x more cash in your bank** per customer!
3. **No-COD Advantage**:
   - Offering COD in India carries a ₹30–₹40 courier cash handling fee and a 20–30% Return-to-Origin (RTO) rejection rate. By remaining **100% Prepaid**, you eliminate ₹70–₹100 of courier waste per order.

---

## 4. Channel 1: Own Website Setup & Fulfillment (D2C)

### Payment Gateway Setup (Razorpay)
- **Why a Backend is Needed**: For security, payment creation and order verification must happen via server API endpoints (Node.js/Express or serverless) so merchant secret keys are not exposed in client React.
- **Accepted Modes**: Instant UPI (GPay, PhonePe, Paytm, CRED), NetBanking, and Debit/Credit Cards.
- **Fees**: 2% + 18% GST (approx. 2.36%).
- **Settlement**: Funds automatically settle into your Indian bank account on a **T+2 business days** schedule.

### Shipping & Courier Workflow (Shiprocket)
1. **Order Placed**: Customer pays ₹229 or ₹399 on your website.
2. **Order Sync**: Order details (Name, Address, Pincode, Phone) push to Shiprocket.
3. **Packaging**: Pack the strips into a small tamper-proof courier flyer (6x8 inch, ₹3–₹5 each) or branded tuck-in box.
4. **AWB & Label**: Generate shipping label in Shiprocket, print barcode sticker, and tape it to the package.
5. **Courier Pickup**: Courier executive (Delhivery, BlueDart, Shadowfax) arrives at your doorstep, scans the parcel, and delivers it across India in 2–4 days.
6. **Automated Tracking**: Shiprocket sends automated WhatsApp/SMS alerts with live tracking links to the customer.

---

## 5. Channel 2: Amazon India (Easy Ship & FBA)

### Fee Structure
- **Referral Fee**: 9% of selling price (Health & Personal Care / Supplements).
- **Closing Fee**: Fixed fee based on price band (₹12 for ≤ ₹250; ₹26 for ₹251–₹500).
- **Weight Handling (Shipping)**: Pan-India national shipping fee of ~₹75 per 500g via Amazon Easy Ship.
- **18% GST**: Applicable to all Amazon commission and courier fees.

### Operational Setup
1. Register on **Amazon Seller Central India**.
2. **Easy Ship Mode**: Keep inventory at home/office. When an order arrives, pack it in Amazon packaging and click *"Schedule Pickup"*. An Amazon ATS van arrives at your doorstep to pick it up.
3. **FBA Mode (Prime)**: Ship 100–500 units in bulk to an Amazon Fulfillment Center. Grants the **Prime badge** (1–2 day delivery), which significantly boosts conversion rates.

---

## 6. Channel 3: Quick Commerce (Blinkit, Zepto, Swiggy Instamart)

### The Dark Store Model
Quick commerce does not ship single parcels to individual buyers. You supply inventory in bulk to their **Mother Hub / Central Distribution Center (CDC)**. Their automated routing system distributes inventory across 50–200 neighborhood "dark stores" so delivery riders can reach customers in **10 minutes**.

### Commercial Terms
- **Trade Margin**: 30% to 40% discount off MRP (standard: 35%).
- **Courier / Delivery Cost to Customer**: **₹0 for you**. Borne completely by Blinkit/Zepto.
- **Your Logistics**: You only pay bulk cargo/freight from your location to the Mother Hub (~₹3–₹5 per unit).
- **Payment Cycle**: 30 to 45 days credit period after Goods Receipt Note (GRN) verification.

### Mandatory Legal & Packaging Gateways
1. **FSSAI License**: Mandatory central/state food safety license for dietary/energy strips.
2. **GS1 Barcodes**: Official EAN-13 barcodes registered via GS1 India printed on every retail box.
3. **NABL Lab Test Report (COA)**: Certificate of Analysis proving caffeine potency, microbiological safety, and shelf-life parameters.
4. **Packaging Norms**: Batch number, Manufacturing date, Expiry date, Net quantity, FSSAI logo, and Customer Care details.
5. **Remaining Shelf Life**: Minimum 70%–80% shelf life required at the time of delivery to the Mother Hub.

### Step-by-Step Onboarding Playbook
1. **Documentation Prep**: GST, FSSAI, GS1 barcodes, and Lab Report.
2. **Sell Sheet**: Create a 1-page pitch deck emphasizing high impulse value, compact dark store footprint, and 35% margin to platform.
3. **Category Manager Outreach**: Reach out directly to *Category Managers (Health & Wellness / Impulse / Snacks)* at Blinkit and Zepto on LinkedIn.
4. **Sampling**: Dispatch physical sample boxes to their corporate offices (Gurgaon / Mumbai).
5. **Vendor Code & PO**: Sign the vendor contract, receive your vendor code, and fulfill the initial Purchase Order (PO) to their central hub.

---

## 7. Strategic Pricing & Profit Maximization Playbook

### Tactic 1: The Delivery Threshold Strategy
- Currently, selling Pack of 5 at ₹229 with free delivery yields ₹105 profit.
- **Recommendation**: Charge a **₹40 delivery fee** on orders under ₹300 (Customer pays ₹229 + ₹40 = ₹269).
- Your net profit on Pack of 5 jumps from **₹105 to ₹145**.
- Offer **FREE SHIPPING exclusively on the Pack of 10 (₹399)**. This incentivizes over 70% of website visitors to upgrade to the ₹399 pack!

### Tactic 2: Channel Role Allocation
- **Own Website**: Maximum profitability (₹226/unit), customer data collection, and email/WhatsApp repeat marketing.
- **Amazon**: Scale, search traffic, and credibility.
- **Blinkit & Zepto**: High-frequency impulse purchases (pre-gym, late-night study sessions, office fatigue) with 10-minute convenience.

---

## 8. Immediate Action Checklist

- [ ] Complete merchant onboarding on **Razorpay.com** for your website.
- [ ] Create account on **Shiprocket.in** and recharge wallet with ₹1,000.
- [ ] Order 100 pcs tamper-proof courier flyer bags (6x8 inch) and A4 shipping sticker labels (~₹600).
- [ ] Register 2 barcodes on **GS1 India** (one for 5-pack, one for 10-pack).
- [ ] Keep active FSSAI certificate and NABL Lab Report ready for platform onboarding.
