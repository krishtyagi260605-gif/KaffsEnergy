import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(36, letter[1] - 30, "KAFF'S ENERGY  |  COMMERCIAL BLUEPRINT & UNIT ECONOMICS (DEMO MODEL)")
            self.drawRightString(letter[0] - 36, letter[1] - 30, "COMMERCIAL IN CONFIDENCE")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(36, letter[1] - 34, letter[0] - 36, letter[1] - 34)

        # Footer
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(36, 40, letter[0] - 36, 40)
        
        self.drawString(36, 28, "KAFF'S Energy — D2C, COD, Amazon & Quick-Commerce Financial Model")
        self.drawRightString(letter[0] - 36, 28, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#0f172a") # dark slate
    accent_color = colors.HexColor("#0284c7")  # cyan blue
    text_color = colors.HexColor("#1e293b")
    muted_color = colors.HexColor("#64748b")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=primary_color,
        spaceAfter=3
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=muted_color,
        spaceAfter=10
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=primary_color,
        spaceBefore=9,
        spaceAfter=5,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=accent_color,
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=text_color,
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=text_color,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2.5
    )
    
    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=0
    )

    th_center = ParagraphStyle(
        'TableHeaderCenter',
        parent=th_style,
        alignment=1
    )

    td_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=text_color
    )

    td_bold = ParagraphStyle(
        'TableCellBold',
        parent=td_style,
        fontName='Helvetica-Bold'
    )

    td_center = ParagraphStyle(
        'TableCellCenter',
        parent=td_style,
        alignment=1
    )

    td_center_bold = ParagraphStyle(
        'TableCellCenterBold',
        parent=td_bold,
        alignment=1
    )

    td_green = ParagraphStyle(
        'TableCellGreen',
        parent=td_bold,
        alignment=1,
        textColor=colors.HexColor("#15803d")
    )

    td_orange = ParagraphStyle(
        'TableCellOrange',
        parent=td_bold,
        alignment=1,
        textColor=colors.HexColor("#c2410c")
    )

    td_red = ParagraphStyle(
        'TableCellRed',
        parent=td_bold,
        alignment=1,
        textColor=colors.HexColor("#b91c1c")
    )

    card_body = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=11,
        textColor=text_color
    )

    story = []

    # Title Banner
    story.append(Paragraph("KAFF'S ENERGY STRIPS", title_style))
    story.append(Paragraph("Commercial Unit Economics & Multi-Channel Distribution Model (Demo Presentation Model with Full COD Breakdown)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0284c7"), spaceAfter=8))

    # Executive Summary Card
    exec_text = """
    <b>EXECUTIVE SUMMARY (DEMO MODEL):</b> This document outlines the commercial economics and channel feasibility for <b>KAFF'S Energy Strips</b>. 
    It models base production costs of <b>₹100 Making + ₹15 Packaging = ₹115 for Pack of 5 (MRP ₹229)</b> and <b>₹200 Making + ₹35 Packaging = ₹235 for Pack of 10 (MRP ₹399)</b>. 
    It details full unit-level economics across: <b>1) Website Prepaid (UPI/Cards)</b>, <b>2) Website Cash on Delivery (COD)</b>, 
    <b>3) Amazon India (Easy Ship Pan-India)</b>, and <b>4) Quick Commerce (Blinkit & Zepto 10-minute dark store delivery)</b>.
    """
    card_table = Table([[Paragraph(exec_text, card_body)]], colWidths=[540])
    card_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(card_table)
    story.append(Spacer(1, 8))

    # Section 1: Product Specifications & Baselines
    story.append(Paragraph("1. PRODUCT SPECIFICATIONS & PRODUCTION COST BASELINE (COGS)", h1_style))
    
    spec_data = [
        [Paragraph("SKU Description", th_style), Paragraph("Retail MRP", th_center), Paragraph("Base Making Cost", th_center), Paragraph("Packaging & Box Finishing", th_center), Paragraph("Total Product Cost (COGS)", th_center)],
        [Paragraph("<b>Pack of 5 Strips</b>", td_style), Paragraph("<b>₹229.00</b>", td_center), Paragraph("₹100.00", td_center), Paragraph("₹15.00", td_center), Paragraph("<b>₹115.00</b>", td_center_bold)],
        [Paragraph("<b>Pack of 10 Strips</b>", td_style), Paragraph("<b>₹399.00</b>", td_center), Paragraph("₹200.00", td_center), Paragraph("₹35.00", td_center), Paragraph("<b>₹235.00</b>", td_center_bold)],
    ]
    t_spec = Table(spec_data, colWidths=[130, 95, 105, 110, 100])
    t_spec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_spec)
    story.append(Spacer(1, 10))

    # Section 2: Master Unit Economics Across All Channels (Including COD!)
    story.append(Paragraph("2. MASTER UNIT ECONOMICS (WEBSITE PREPAID vs. COD vs. AMAZON vs. QUICK COMMERCE)", h1_style))
    story.append(Paragraph("Direct comparison showing the exact deductions, courier fees, platform commissions, and net cash margins.", body_style))

    econ_data = [
        [Paragraph("Cost / Revenue Component", th_style), 
         Paragraph("Website<br/>Prepaid (5)", th_center), 
         Paragraph("Website<br/>COD (5)", th_center), 
         Paragraph("Website<br/>Prepaid (10)", th_center), 
         Paragraph("Website<br/>COD (10)", th_center), 
         Paragraph("Amazon IN<br/>Pack of 10", th_center), 
         Paragraph("Blinkit/Zepto<br/>Pack of 10", th_center)],

        [Paragraph("<b>Customer Selling Price (MRP)</b>", td_bold), Paragraph("<b>₹229.00</b>", td_bold), Paragraph("<b>₹229.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold)],
        [Paragraph("Product Cost (Making + Packaging)", td_style), Paragraph("-₹115.00", td_style), Paragraph("-₹115.00", td_style), Paragraph("-₹235.00", td_style), Paragraph("-₹235.00", td_style), Paragraph("-₹235.00", td_style), Paragraph("-₹235.00", td_style)],
        [Paragraph("Platform / Gateway Fee", td_style), Paragraph("-₹5.40 (2.36%)", td_style), Paragraph("₹0.00", td_style), Paragraph("-₹9.42 (2.36%)", td_style), Paragraph("₹0.00", td_style), Paragraph("-₹35.91 (9%)", td_style), Paragraph("-₹139.65 (35%)", td_style)],
        [Paragraph("Fixed Closing / Channel Fee", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("-₹26.00", td_style), Paragraph("₹0.00", td_style)],
        [Paragraph("Customer Delivery / Courier Fee", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹75.00", td_style), Paragraph("₹0.00 (Platform)", td_style)],
        [Paragraph("<b>COD Courier Handling Fee</b>", td_bold), Paragraph("₹0.00", td_style), Paragraph("<b>-₹35.00</b>", td_orange), Paragraph("₹0.00", td_style), Paragraph("<b>-₹35.00</b>", td_orange), Paragraph("Included", td_style), Paragraph("N/A", td_style)],
        [Paragraph("Outer Packaging / Flyer & Label", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹5.00", td_style), Paragraph("-₹5.00 (Bulk crt)", td_style)],
        [Paragraph("GST on Shipping & Platform Fees", td_style), Paragraph("Included", td_style), Paragraph("Included", td_style), Paragraph("Included", td_style), Paragraph("Included", td_style), Paragraph("-₹24.64 (18%)", td_style), Paragraph("Included", td_style)],
        [Paragraph("SMS / WhatsApp Tracking Alerts", td_style), Paragraph("-₹0.60", td_style), Paragraph("-₹0.60", td_style), Paragraph("-₹0.60", td_style), Paragraph("-₹0.60", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style)],
        [Paragraph("<b>TOTAL DEDUCTIONS</b>", td_bold), Paragraph("-₹184.00", td_bold), Paragraph("-₹213.60", td_bold), Paragraph("-₹308.02", td_bold), Paragraph("-₹333.60", td_bold), Paragraph("-₹401.55", td_bold), Paragraph("-₹379.65", td_bold)],
        [Paragraph("<b>NET IN-HAND PROFIT</b>", td_bold), 
         Paragraph("<b>₹45.00</b>", td_green), 
         Paragraph("<b>₹15.40 (~₹15)</b>", td_orange), 
         Paragraph("<b>₹90.98 (~₹91)</b>", td_green), 
         Paragraph("<b>₹65.40 (~₹65)</b>", td_green), 
         Paragraph("<b>-₹2.55 (~-₹3)</b>", td_red), 
         Paragraph("<b>₹19.35 (~₹19)</b>", td_green)],
        [Paragraph("<b>Net Margin (% of MRP)</b>", td_bold), Paragraph("<b>19.7%</b>", td_green), Paragraph("<b>6.7%</b>", td_orange), Paragraph("<b>22.8%</b>", td_green), Paragraph("<b>16.4%</b>", td_green), Paragraph("<b>-0.6%</b>", td_red), Paragraph("<b>4.9%</b>", td_green)]
    ]

    t_econ = Table(econ_data, colWidths=[138, 67, 67, 67, 67, 67, 67])
    t_econ.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-3), [colors.white, colors.HexColor("#f8fafc")]),
        ('BACKGROUND', (0,-3), (-1,-3), colors.HexColor("#e2e8f0")),
        ('BACKGROUND', (0,-2), (-1,-2), colors.HexColor("#dcfce7")),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#f0fdf4")),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_econ)
    story.append(Spacer(1, 9))

    # COD Insight Box
    cod_notes = """
    <b>CRITICAL DEMO INSIGHTS (COD & CHANNELS):</b><br/>
    • <b>COD Impact:</b> Couriers charge <b>₹35 per shipment</b> for handling cash, reducing Pack of 5 profit from <b>₹45 (Prepaid) down to ₹15 (COD)</b>, and Pack of 10 from <b>₹91 down to ₹65</b>.<br/>
    • <b>The COD Fee Strategy:</b> Charging a <b>₹40 Cash on Delivery Fee</b> at checkout protects your margins and encourages customers to choose UPI payment.<br/>
    • <b>Amazon Dynamics:</b> At ₹235 product cost + Amazon's 9% referral + ₹26 closing fee + ₹75 shipping + GST, selling a single Pack of 10 at ₹399 is break-even (-₹3). On Amazon, products must be priced at <b>₹449–₹499</b> or sold in multi-pack bundles (2x or 3x packs).
    """
    box_cod = Table([[Paragraph(cod_notes, card_body)]], colWidths=[540])
    box_cod.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fff7ed")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#fed7aa")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_cod)
    
    story.append(PageBreak())

    # Page 2: Operational Workflows (Website, Logistics, COD, Amazon, Quick Commerce)
    story.append(Paragraph("3. OPERATIONAL WORKFLOW: D2C WEBSITE & CASH ON DELIVERY (COD)", h1_style))
    story.append(Paragraph("How orders move from website checkout to doorstep cash collection and settlement.", body_style))

    story.append(Paragraph("A. Payment & COD Processing Architecture", h2_style))
    story.append(Paragraph("• <b>Prepaid Modes (Razorpay):</b> Instant UPI QR (GPay, PhonePe, Paytm, CRED), NetBanking, and Cards. Sells and settles on a T+2 business days cycle.", bullet_style))
    story.append(Paragraph("• <b>Cash on Delivery (COD) Mechanism:</b> Customer confirms order with mobile OTP verification to prevent fake addresses. Courier collects cash or dynamic UPI QR upon delivery.", bullet_style))
    story.append(Paragraph("• <b>COD Remittance (Bank Transfer):</b> Logistics partner (Shiprocket / Delhivery) holds collected cash and transfers it in weekly batches directly to your bank account.", bullet_style))

    story.append(Paragraph("B. Packaging & Logistics Fulfillment (Shiprocket Aggregator)", h2_style))
    story.append(Paragraph("• <b>Courier Network:</b> Shiprocket auto-allocates the best courier based on destination (Delhivery, BlueDart, Shadowfax, Xpressbees).", bullet_style))
    story.append(Paragraph("• <b>Fulfillment Sequence:</b>", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;1. Order appears in Merchant Dashboard with shipping address and payment status (Prepaid vs. COD).", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;2. Pack strips into tamper-proof courier flyer (cost: ~₹6–₹8).", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;3. Generate Air Waybill (AWB) shipping label and stick onto outer pouch.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;4. Courier executive picks up packages from your home/warehouse daily.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;5. Customer receives automated WhatsApp/SMS notifications with live tracking.", bullet_style))
    story.append(Spacer(1, 8))

    # Section 4: Channel 2 (Amazon India)
    story.append(Paragraph("4. CHANNEL 2: AMAZON INDIA (EASY SHIP / FBA)", h1_style))
    story.append(Paragraph("Amazon is optimal for consumer trust, search volume, and repeat re-orders.", body_style))

    story.append(Paragraph("A. Fee Breakdown (Health & Nutrition / Dietary Supplements)", h2_style))
    story.append(Paragraph("• <b>Referral Fee:</b> 9% of selling price for dietary and energy strip products.", bullet_style))
    story.append(Paragraph("• <b>Closing Fee:</b> Tiered fixed fee (₹12 for items &le; ₹250; ₹26 for items between ₹251–₹500).", bullet_style))
    story.append(Paragraph("• <b>Weight Handling (National):</b> ~₹75 per 500g delivery fee via Amazon Easy Ship.", bullet_style))
    story.append(Paragraph("• <b>18% GST:</b> Applied on all Amazon commission and courier fees.", bullet_style))

    story.append(Paragraph("B. Delivery Models", h2_style))
    story.append(Paragraph("• <b>Amazon Easy Ship:</b> You store stock at your facility. Amazon ATS delivery vans pick up orders from your door daily.", bullet_style))
    story.append(Paragraph("• <b>Fulfillment by Amazon (FBA):</b> Ship master cartons to Amazon warehouse to unlock the <b>Prime Badge</b> (1–2 day guaranteed delivery).", bullet_style))
    story.append(Spacer(1, 8))

    # Section 5: Channel 3 (Blinkit & Zepto)
    story.append(Paragraph("5. CHANNEL 3: QUICK COMMERCE (BLINKIT, ZEPTO, INSTAMART)", h1_style))
    story.append(Paragraph("Quick commerce platforms deliver to consumers within 10 minutes via localized neighborhood dark stores.", body_style))

    story.append(Paragraph("A. Commercial Terms", h2_style))
    story.append(Paragraph("• <b>Trade Discount:</b> 30% to 40% retailer margin off MRP (standard industry baseline: 35%).", bullet_style))
    story.append(Paragraph("• <b>Customer Delivery Cost:</b> <b>₹0 for you</b> (borne entirely by Blinkit/Zepto). You only pay bulk freight to their Central Mother Hub (~₹4–₹5/box).", bullet_style))
    story.append(Paragraph("• <b>Payment Terms:</b> B2B credit cycle of <b>30 to 45 days</b> following Purchase Order (PO) receipt and inspection.", bullet_style))

    story.append(Paragraph("B. Mandatory Compliance & Packaging Requirements", h2_style))
    story.append(Paragraph("1. <b>FSSAI License:</b> Valid food safety license for caffeinated/dietary formulations.", bullet_style))
    story.append(Paragraph("2. <b>GS1 EAN-13 Barcodes:</b> Scannable barcode registered with GS1 India printed on every retail box.", bullet_style))
    story.append(Paragraph("3. <b>NABL Lab Test Report (COA):</b> Valid Certificate of Analysis verifying nutritional specs, caffeine content, and microbiological safety.", bullet_style))
    story.append(Paragraph("4. <b>Shelf Life Requirement:</b> Products must retain at least <b>70%–80% shelf life</b> when delivered to the central distribution hub.", bullet_style))

    story.append(PageBreak())

    # Page 3: Strategic Playbook & Action Roadmap
    story.append(Paragraph("6. STEP-BY-STEP ONBOARDING ROADMAP (BLINKIT & ZEPTO)", h1_style))
    story.append(Paragraph("Industry-standard process to secure category manager approvals and dark store listings:", body_style))

    playbook_data = [
        [Paragraph("Step", th_style), Paragraph("Action Item", th_style), Paragraph("Key Deliverables / Tactics", th_style)],
        [Paragraph("<b>Step 1</b>", td_bold), Paragraph("<b>Compliance Audit</b>", td_style), Paragraph("Active GST certificate, FSSAI brand license, GS1 barcode registration, and NABL lab test report.", td_style)],
        [Paragraph("<b>Step 2</b>", td_bold), Paragraph("<b>1-Page Pitch Deck (Sell Sheet)</b>", td_style), Paragraph("Highlight: Impulse consumption, sleek pocket-sized format, high dark-store storage density, 35% margin to platform.", td_style)],
        [Paragraph("<b>Step 3</b>", td_bold), Paragraph("<b>Category Manager Outreach</b>", td_style), Paragraph("Connect with <i>'Category Manager - Health & Wellness / Impulse'</i> on LinkedIn. Send product sample kits directly to corporate headquarters.", td_style)],
        [Paragraph("<b>Step 4</b>", td_bold), Paragraph("<b>Vendor Agreement</b>", td_style), Paragraph("Execute master supplier contract (35% margin, 30–45 day payment cycle, damage/expiry replacement terms).", td_style)],
        [Paragraph("<b>Step 5</b>", td_bold), Paragraph("<b>Trial Purchase Order (PO)</b>", td_style), Paragraph("Platform issues trial PO (200–500 units for Delhi NCR or Mumbai hub). Dispatch master cartons to Mother Hub.", td_style)],
        [Paragraph("<b>Step 6</b>", td_bold), Paragraph("<b>Dark Store Rollout & Go-Live</b>", td_style), Paragraph("Stock automatically distributed to 50+ neighborhood micro-warehouses. Live for 10-minute consumer ordering.", td_style)],
    ]

    t_playbook = Table(playbook_data, colWidths=[45, 135, 360])
    t_playbook.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_playbook)
    story.append(Spacer(1, 10))

    # Section 7: Strategic Growth & Pricing Recommendations
    story.append(Paragraph("7. STRATEGIC GROWTH & PRICING RECOMMENDATIONS", h1_style))

    rec_1 = """
    <b>1. Smart COD Fee Structure:</b><br/>
    • Charge a <b>₹40 Cash on Delivery Fee</b> at checkout while keeping <b>UPI payments completely FREE</b>.<br/>
    • This protects your net margin on COD orders (raising Pack of 5 profit from ₹15 to ₹55, and Pack of 10 from ₹65 to ₹105).<br/>
    • More importantly, it motivates 70%+ of customers to pay instantly via UPI, eliminating courier return (RTO) risks.
    """
    box_rec1 = Table([[Paragraph(rec_1, card_body)]], colWidths=[540])
    box_rec1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_rec1)
    story.append(Spacer(1, 7))

    rec_2 = """
    <b>2. Focus Marketing on the Hero SKU (Pack of 10):</b><br/>
    • Because courier delivery (₹55) and packaging are fixed costs, the <b>Pack of 10 generates over 2x to 4x more cash in your bank</b> than Pack of 5.<br/>
    • Make the <b>Pack of 10 the default hero selection</b> on your website, ads, and product bundles.
    """
    box_rec2 = Table([[Paragraph(rec_2, card_body)]], colWidths=[540])
    box_rec2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_rec2)
    story.append(Spacer(1, 9))

    # Action Checklist
    story.append(Paragraph("8. SETUP & ONBOARDING CHECKLIST", h1_style))
    checklist_text = """
    [ ] <b>Step 1:</b> Set up <b>Razorpay</b> merchant account for instant UPI/Card payments.<br/>
    [ ] <b>Step 2:</b> Register on <b>Shiprocket</b> with ₹1,000 wallet recharge for integrated Pan-India courier shipping.<br/>
    [ ] <b>Step 3:</b> Configure shipping options on website: <b>Free Delivery on Prepaid</b> and <b>₹40 Courier Fee on COD</b>.<br/>
    [ ] <b>Step 4:</b> Procure 100 pcs tamper-proof courier flyer bags (6x8 inch) and A4 shipping sticker labels.<br/>
    [ ] <b>Step 5:</b> Register 2 official barcodes on <b>GS1 India</b> for retail and dark-store scanning.<br/>
    [ ] <b>Step 6:</b> Prepare NABL Lab Test Report and FSSAI license for Amazon and Quick Commerce onboarding.
    """
    box_chk = Table([[Paragraph(checklist_text, card_body)]], colWidths=[540])
    box_chk.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_chk)

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully built: {filename}")

if __name__ == '__main__':
    output_path = "/Users/krishtyagi/Documents/kaffs energy/KAFFS_Energy_Commercial_Model_Demo.pdf"
    build_pdf(output_path)
