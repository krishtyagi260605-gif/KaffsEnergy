import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
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
            self.drawString(40, letter[1] - 30, "KAFF'S ENERGY  |  COMMERCIAL BLUEPRINT & UNIT ECONOMICS")
            self.drawRightString(letter[0] - 40, letter[1] - 30, "CONFIDENTIAL")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(40, letter[1] - 35, letter[0] - 40, letter[1] - 35)

        # Footer
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(40, 42, letter[0] - 40, 42)
        
        self.drawString(40, 30, "KAFF'S Energy — D2C, Amazon & Quick-Commerce Financial Model")
        self.drawRightString(letter[0] - 40, 30, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0f172a") # dark slate
    accent_color = colors.HexColor("#0284c7")  # cyan blue
    text_color = colors.HexColor("#1e293b")
    muted_color = colors.HexColor("#64748b")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=muted_color,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=primary_color,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_color,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_color,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )
    
    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
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
        fontSize=8,
        leading=11,
        textColor=text_color
    )

    td_bold = ParagraphStyle(
        'TableCellBold',
        parent=td_style,
        fontName='Helvetica-Bold'
    )

    td_right = ParagraphStyle(
        'TableCellRight',
        parent=td_style,
        alignment=2
    )

    td_right_bold = ParagraphStyle(
        'TableCellRightBold',
        parent=td_bold,
        alignment=2
    )
    
    td_green = ParagraphStyle(
        'TableCellGreen',
        parent=td_bold,
        alignment=2,
        textColor=colors.HexColor("#15803d")
    )

    card_header = ParagraphStyle(
        'CardHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=primary_color
    )

    card_body = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=text_color
    )

    story = []

    # Title Banner
    story.append(Paragraph("KAFF'S ENERGY STRIPS", title_style))
    story.append(Paragraph("Comprehensive Commercial Blueprint: Unit Economics, Distribution Channels & Operational Procedures (D2C Website vs. Amazon vs. Blinkit / Zepto)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0284c7"), spaceAfter=12))

    # Executive Summary Card
    exec_text = """
    <b>EXECUTIVE BRIEF:</b> This blueprint provides a complete unit economics model, fee structure, and distribution roadmap for <b>KAFF'S Energy Strips</b>. 
    It evaluates the two core SKUs (<b>Pack of 5 @ ₹229</b> and <b>Pack of 10 @ ₹399</b>) across three critical sales channels:
    <b>1) Own D2C Website (Prepaid via UPI/Cards with Shiprocket delivery)</b>, 
    <b>2) Amazon India (Easy Ship Pan-India fulfillment)</b>, and 
    <b>3) Quick Commerce (Blinkit & Zepto 10-minute dark store supply)</b>.
    """
    card_table = Table([[Paragraph(exec_text, card_body)]], colWidths=[532])
    card_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(card_table)
    story.append(Spacer(1, 10))

    # Section 1: Product Specifications & Baselines
    story.append(Paragraph("1. PRODUCT SPECIFICATIONS & PRODUCTION COSTS (COGS)", h1_style))
    
    spec_data = [
        [Paragraph("SKU Name", th_style), Paragraph("Retail Selling Price (MRP)", th_center), Paragraph("Manufacturing Cost", th_center), Paragraph("Packaging / Finishing", th_center), Paragraph("Total Product Cost (COGS)", th_center)],
        [Paragraph("<b>Pack of 5 Strips</b>", td_style), Paragraph("<b>₹229.00</b>", td_style), Paragraph("₹40.00", td_style), Paragraph("₹15.00", td_style), Paragraph("<b>₹55.00</b>", td_bold)],
        [Paragraph("<b>Pack of 10 Strips</b>", td_style), Paragraph("<b>₹399.00</b>", td_style), Paragraph("₹65.00", td_style), Paragraph("₹35.00", td_style), Paragraph("<b>₹100.00</b>", td_bold)],
    ]
    t_spec = Table(spec_data, colWidths=[120, 100, 100, 105, 107])
    t_spec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_spec)
    story.append(Spacer(1, 12))

    # Section 2: Master Unit Economics Across All 3 Channels
    story.append(Paragraph("2. MASTER UNIT ECONOMICS & PROFIT MARGIN COMPARISON", h1_style))
    story.append(Paragraph("Direct comparison of revenues, deductions, logistics costs, and in-hand net profits across channels. <b>Note: COD is disabled on D2C website</b> to guarantee zero RTO returns and zero courier cash-collection surcharges.", body_style))

    econ_data = [
        [Paragraph("Cost / Revenue Component", th_style), 
         Paragraph("Own Website<br/>Pack of 5", th_center), 
         Paragraph("Own Website<br/>Pack of 10", th_center), 
         Paragraph("Amazon IN<br/>Pack of 5", th_center), 
         Paragraph("Amazon IN<br/>Pack of 10", th_center), 
         Paragraph("Blinkit/Zepto<br/>Pack of 5", th_center), 
         Paragraph("Blinkit/Zepto<br/>Pack of 10", th_center)],

        [Paragraph("<b>Customer Price (MRP)</b>", td_bold), Paragraph("<b>₹229.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold), Paragraph("<b>₹229.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold), Paragraph("<b>₹229.00</b>", td_bold), Paragraph("<b>₹399.00</b>", td_bold)],
        [Paragraph("Product Cost (Making + Box)", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹100.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹100.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹100.00", td_style)],
        [Paragraph("Platform / Commission Fee", td_style), Paragraph("-₹5.40 (2.36%)", td_style), Paragraph("-₹9.42 (2.36%)", td_style), Paragraph("-₹20.61 (9%)", td_style), Paragraph("-₹35.91 (9%)", td_style), Paragraph("-₹80.15 (35%)", td_style), Paragraph("-₹139.65 (35%)", td_style)],
        [Paragraph("Fixed Closing / Transaction Fee", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("-₹12.00", td_style), Paragraph("-₹26.00", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style)],
        [Paragraph("Customer Delivery / Shipping Fee", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹55.00", td_style), Paragraph("-₹75.00", td_style), Paragraph("-₹75.00", td_style), Paragraph("₹0.00 (Borne by app)", td_style), Paragraph("₹0.00 (Borne by app)", td_style)],
        [Paragraph("Outer Packaging / Flyer & Label", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹8.00", td_style), Paragraph("-₹5.00", td_style), Paragraph("-₹5.00", td_style), Paragraph("-₹4.00 (Bulk crt)", td_style), Paragraph("-₹5.00 (Bulk crt)", td_style)],
        [Paragraph("GST on Shipping & Platform Fees", td_style), Paragraph("Included", td_style), Paragraph("Included", td_style), Paragraph("-₹19.37 (18%)", td_style), Paragraph("-₹24.64 (18%)", td_style), Paragraph("Included", td_style), Paragraph("Included", td_style)],
        [Paragraph("SMS / WhatsApp Tracking Alerts", td_style), Paragraph("-₹0.60", td_style), Paragraph("-₹0.60", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style), Paragraph("₹0.00", td_style)],
        [Paragraph("<b>TOTAL DEDUCTIONS</b>", td_bold), Paragraph("-₹124.00", td_bold), Paragraph("-₹173.02", td_bold), Paragraph("-₹186.98", td_bold), Paragraph("-₹266.55", td_bold), Paragraph("-₹139.15", td_bold), Paragraph("-₹244.65", td_bold)],
        [Paragraph("<b>NET IN-HAND PROFIT</b>", td_bold), 
         Paragraph("<b>₹105.00</b>", td_green), 
         Paragraph("<b>₹225.98 (~₹226)</b>", td_green), 
         Paragraph("<b>₹42.02 (~₹42)</b>", td_bold), 
         Paragraph("<b>₹132.45 (~₹132)</b>", td_bold), 
         Paragraph("<b>₹89.85 (~₹90)</b>", td_bold), 
         Paragraph("<b>₹154.35 (~₹154)</b>", td_bold)],
        [Paragraph("<b>Net Margin (% of MRP)</b>", td_bold), Paragraph("<b>45.9%</b>", td_green), Paragraph("<b>56.6%</b>", td_green), Paragraph("<b>18.3%</b>", td_style), Paragraph("<b>33.2%</b>", td_style), Paragraph("<b>39.2%</b>", td_style), Paragraph("<b>38.7%</b>", td_style)]
    ]

    t_econ = Table(econ_data, colWidths=[142, 65, 65, 65, 65, 65, 65])
    t_econ.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-3), [colors.white, colors.HexColor("#f8fafc")]),
        ('BACKGROUND', (0,-3), (-1,-3), colors.HexColor("#e2e8f0")),
        ('BACKGROUND', (0,-2), (-1,-2), colors.HexColor("#dcfce7")),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#f0fdf4")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_econ)
    story.append(Spacer(1, 14))

    # Channel Key Findings Box
    findings = """
    <b>CORE FINANCIAL INSIGHTS:</b><br/>
    • <b>Own D2C Website generates the highest cash margin:</b> You make <b>₹226 net profit</b> on every Pack of 10 (vs. ₹132 on Amazon and ₹154 on Blinkit/Zepto).<br/>
    • <b>Pack of 10 is your 'Hero SKU':</b> The fixed shipping cost (₹55) is identical for both packs. Selling Pack of 10 gives <b>2.15x more cash profit</b> per dispatch than Pack of 5.<br/>
    • <b>No COD Strategy Saves ₹65–₹100/order:</b> Eliminating COD removes the ₹35 courier handling charge and protects you from the 20–30% industry-wide Return-to-Origin (RTO) loss.
    """
    box_findings = Table([[Paragraph(findings, card_body)]], colWidths=[532])
    box_findings.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#eff6ff")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#93c5fd")),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 9),
        ('RIGHTPADDING', (0,0), (-1,-1), 9),
    ]))
    story.append(box_findings)
    
    story.append(PageBreak())

    # Page 2: Detailed Operational Breakdown for Channel 1 (Own Website)
    story.append(Paragraph("3. CHANNEL 1: OWN WEBSITE SETUP & FULFILLMENT (D2C)", h1_style))
    story.append(Paragraph("How the end-to-end payment and delivery infrastructure operates for your live site.", body_style))

    story.append(Paragraph("A. Payment Gateway Architecture (Razorpay)", h2_style))
    story.append(Paragraph("• <b>Security Compliance:</b> Payments cannot be captured directly in frontend React. The frontend requests order creation from a backend API, which securely calls Razorpay using private merchant credentials.", bullet_style))
    story.append(Paragraph("• <b>Payment Methods:</b> Instant UPI (Google Pay, PhonePe, Paytm, CRED), NetBanking, and Debit/Credit Cards. Standard fee: 2% + 18% GST (2.36% effective).", bullet_style))
    story.append(Paragraph("• <b>Settlement Timeline:</b> T+2 business days direct into your Indian Current Account.", bullet_style))
    story.append(Paragraph("• <b>Prepaid Verification:</b> Webhooks verify payment status before pushing orders into packing queue.", bullet_style))

    story.append(Paragraph("B. Logistics & Courier Fulfillment (Shiprocket Aggregator)", h2_style))
    story.append(Paragraph("• <b>Multi-Courier Access:</b> Shiprocket aggregates Delhivery, Blue Dart, DTDC, Shadowfax, and Xpressbees under one dashboard.", bullet_style))
    story.append(Paragraph("• <b>Weight Slab Economics:</b> Strips weigh &lt; 50g, but couriers bill at the minimum <b>500g slab</b>. Pan-India average cost is ₹50–₹60 + GST (~₹55).", bullet_style))
    story.append(Paragraph("• <b>Operational Fulfillment Cycle:</b>", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;1. <b>Order Received:</b> Customer completes payment on website. Order details appear in your dashboard.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;2. <b>Packaging:</b> Pack strips in tamper-evident courier flyer / mailer box (cost: ~₹6–₹8).", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;3. <b>AWB & Shipping Label:</b> Click 'Generate Label' in Shiprocket. Print thermal barcode sticker with address (cost: ~₹1.50).", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;4. <b>Courier Pickup:</b> Schedule pickup. Courier executive scans and picks up parcels from your doorstep.", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;5. <b>Automated Tracking:</b> Automated SMS/WhatsApp notifications sent to customer with real-time tracking links.", bullet_style))
    story.append(Spacer(1, 8))

    # Section 4: Channel 2 (Amazon India)
    story.append(Paragraph("4. CHANNEL 2: AMAZON INDIA (EASY SHIP / FBA)", h1_style))
    story.append(Paragraph("Amazon is ideal for volume, organic customer discovery, and buyer trust.", body_style))

    story.append(Paragraph("A. Fee Structure Breakdown (Health & Nutrition / Dietary Supplements)", h2_style))
    story.append(Paragraph("• <b>Referral Fee:</b> 9% on gross selling price for consumable health items.", bullet_style))
    story.append(Paragraph("• <b>Closing Fee:</b> Fixed fee tiered by item price (₹12 for items under ₹250; ₹26 for items between ₹251–₹500).", bullet_style))
    story.append(Paragraph("• <b>Weight Handling (Easy Ship):</b> National delivery fee of ~₹75 per 500g parcel.", bullet_style))
    story.append(Paragraph("• <b>GST on Fees:</b> 18% GST applies to all referral, closing, and shipping fees deducted by Amazon.", bullet_style))

    story.append(Paragraph("B. Fulfillment Models: Easy Ship vs. FBA", h2_style))
    story.append(Paragraph("• <b>Amazon Easy Ship (Recommended for Startups):</b> Stock is kept at your office. Amazon's logistics van picks up parcels directly from your premises daily.", bullet_style))
    story.append(Paragraph("• <b>Amazon FBA (Fulfillment by Amazon):</b> Send bulk cartons to an Amazon Fulfillment Center. Grants the coveted <b>Prime Badge</b> (1–2 day delivery), which increases conversions by up to 3x.", bullet_style))
    story.append(Spacer(1, 8))

    # Section 5: Channel 3 (Blinkit & Zepto)
    story.append(Paragraph("5. CHANNEL 3: QUICK COMMERCE (BLINKIT, ZEPTO, INSTAMART)", h1_style))
    story.append(Paragraph("Quick commerce operates on 10-minute micro-warehouses ('dark stores') distributed across urban residential hubs.", body_style))

    story.append(Paragraph("A. Commercial & Operating Model", h2_style))
    story.append(Paragraph("• <b>Wholesale Margin:</b> Quick commerce requires a <b>30% to 40% trade discount off MRP</b> (industry standard: 35%).", bullet_style))
    story.append(Paragraph("• <b>Zero Last-Mile Courier Fee:</b> The platform absorbs all last-mile rider and fuel costs. You only pay bulk freight to their Central Distribution Center (Mother Hub) (~₹3 to ₹5 per box).", bullet_style))
    story.append(Paragraph("• <b>Payment Cycle:</b> B2B credit terms of <b>30 to 45 days</b> after Purchase Order (PO) receipt and GRN (Goods Receipt Note) verification.", bullet_style))
    story.append(Paragraph("• <b>In-App Advertising:</b> Brands typically allocate 5%–10% of revenue to in-app sponsored search placements to maintain sales velocity.", bullet_style))

    story.append(Paragraph("B. Mandatory Legal & Compliance Gateways", h2_style))
    story.append(Paragraph("1. <b>FSSAI License:</b> Valid FSSAI registration/license for dietary/caffeinated supplements (both manufacturer & marketer).", bullet_style))
    story.append(Paragraph("2. <b>GS1 EAN-13 Barcodes:</b> Official scannable barcode registered with GS1 India printed on every retail box.", bullet_style))
    story.append(Paragraph("3. <b>NABL Lab Test Report (COA):</b> Certificate of Analysis verifying nutritional claims, caffeine purity, and safety tests.", bullet_style))
    story.append(Paragraph("4. <b>Legal Metrology Packaging:</b> Clear display of Batch No., Mfg/Exp dates, Veg/Non-veg icon, MRP, Net quantity, and consumer helpline.", bullet_style))
    story.append(Paragraph("5. <b>Shelf Life Requirement:</b> Products must have at least <b>70%–80% remaining shelf life</b> upon arrival at the Mother Hub.", bullet_style))

    story.append(PageBreak())

    # Page 3: Step-by-Step Onboarding Playbook & Strategic Roadmap
    story.append(Paragraph("6. STEP-BY-STEP ONBOARDING PLAYBOOK (BLINKIT & ZEPTO)", h1_style))
    story.append(Paragraph("The fastest industry-tested process to get vendor approval and launch on quick-commerce dark stores:", body_style))

    playbook_data = [
        [Paragraph("Step", th_style), Paragraph("Action Item", th_style), Paragraph("Key Deliverables / Tactics", th_style)],
        [Paragraph("<b>Step 1</b>", td_bold), Paragraph("<b>Documentation Readiness</b>", td_style), Paragraph("Active GST certificate, FSSAI license, GS1 barcode registration, and NABL lab test report.", td_style)],
        [Paragraph("<b>Step 2</b>", td_bold), Paragraph("<b>1-Page Pitch Deck (Sell Sheet)</b>", td_style), Paragraph("Highlight: Impulse format, high-energy category, compact storage footprint, 35% margin to platform, and social proof.", td_style)],
        [Paragraph("<b>Step 3</b>", td_bold), Paragraph("<b>Direct Category Manager Outreach</b>", td_style), Paragraph("Connect with <i>'Category Manager - Health & Wellness / Impulse'</i> on LinkedIn. Cold forms take months; direct sample kits to HQ expedite approvals.", td_style)],
        [Paragraph("<b>Step 4</b>", td_bold), Paragraph("<b>Commercial Agreement</b>", td_style), Paragraph("Sign master vendor contract (35% margin, 30–45 day payment cycle, damage/expiry replacement terms).", td_style)],
        [Paragraph("<b>Step 5</b>", td_bold), Paragraph("<b>Initial Purchase Order (PO)</b>", td_style), Paragraph("Platform issues trial PO (e.g. 200–500 units for Delhi NCR or Mumbai hub). Dispatch master cartons to Mother Hub.", td_style)],
        [Paragraph("<b>Step 6</b>", td_bold), Paragraph("<b>Dark Store Distribution & Go-Live</b>", td_style), Paragraph("Platform algorithm stocks local dark stores. Product goes live for 10-minute consumer delivery.", td_style)],
    ]

    t_playbook = Table(playbook_data, colWidths=[48, 140, 344])
    t_playbook.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_playbook)
    story.append(Spacer(1, 14))

    # Section 7: Strategic Growth & Pricing Recommendations
    story.append(Paragraph("7. STRATEGIC GROWTH & PRICING RECOMMENDATIONS FOR KAFF'S", h1_style))

    rec_1 = """
    <b>1. Implement a Delivery Fee Threshold on Your Website:</b><br/>
    • Currently, selling Pack of 5 at ₹229 with free shipping leaves ₹105 profit.<br/>
    • <b>Action:</b> Charge a <b>₹40 delivery fee</b> on orders under ₹300 (Customer pays ₹229 + ₹40 = ₹269). This increases Pack of 5 profit from <b>₹105 to ₹145</b>.<br/>
    • Offer <b>FREE SHIPPING exclusively on the Pack of 10 (₹399)</b>. This immediately pushes 70%+ of website visitors to choose the ₹399 pack!
    """
    box_rec1 = Table([[Paragraph(rec_1, card_body)]], colWidths=[532])
    box_rec1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_rec1)
    story.append(Spacer(1, 8))

    rec_2 = """
    <b>2. Strategic Multi-Channel Role Allocation:</b><br/>
    • <b>Own Website:</b> Maximize profits (₹226/unit on Pack of 10), collect customer WhatsApp numbers/emails, and build subscription bundles.<br/>
    • <b>Amazon:</b> Focus on discovery and scale. Run Amazon Sponsored Product ads on keywords like <i>'caffeine strips'</i>, <i>'energy booster'</i>, <i>'pre-workout'</i>.<br/>
    • <b>Blinkit & Zepto:</b> Capitalize on <b>impulse purchases</b> (late-night studying, pre-gym energy, long work shifts) where instant 10-minute delivery is king.
    """
    box_rec2 = Table([[Paragraph(rec_2, card_body)]], colWidths=[532])
    box_rec2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_rec2)
    story.append(Spacer(1, 14))

    # Action Checklist
    story.append(Paragraph("8. IMMEDIATE LAUNCH CHECKLIST", h1_style))
    checklist_text = """
    [ ] <b>Step 1:</b> Sign up for <b>Razorpay</b> merchant account (needs PAN, GST/Business details, Bank Account).<br/>
    [ ] <b>Step 2:</b> Sign up for <b>Shiprocket</b> account and load ₹1,000 initial courier credits.<br/>
    [ ] <b>Step 3:</b> Procure 100 pcs tamper-proof courier bags (size 6x8 inch) and 50 A4 thermal sticker sheets (~₹600 total).<br/>
    [ ] <b>Step 4:</b> Register 2 barcodes on <b>GS1 India</b> (1 for Pack of 5, 1 for Pack of 10).<br/>
    [ ] <b>Step 5:</b> Keep NABL Lab Report (COA) and active FSSAI certificate on file for Amazon & Quick Commerce onboarding.
    """
    box_chk = Table([[Paragraph(checklist_text, card_body)]], colWidths=[532])
    box_chk.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(box_chk)

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully built: {filename}")

if __name__ == '__main__':
    output_path = "/Users/krishtyagi/Documents/kaffs energy/KAFFS_Energy_Economics_and_Distribution_Guide.pdf"
    build_pdf(output_path)
