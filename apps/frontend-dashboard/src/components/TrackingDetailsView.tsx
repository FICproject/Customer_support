import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TicketVisionButton } from './TicketVisionFlowModal';

interface TrackingDetailsViewProps {
  onSelectSubTab?: (subTab: string) => void;
  onOpenSession?: (sessionOrPhone: string) => void;
}

export const TrackingDetailsView: React.FC<TrackingDetailsViewProps> = ({
  onSelectSubTab,
  onOpenSession
}) => {
  // Universal Lookup State (Order ID / Membership Card / Phone / Email)
  const [lookupQuery, setLookupQuery] = useState<string>('ORD-9920148');
  const [isSearchingLookup, setIsSearchingLookup] = useState<boolean>(false);
  const [lookupType, setLookupType] = useState<'ORDER_ID' | 'MEMBERSHIP_CARD'>('ORDER_ID');
  const [lookupResult, setLookupResult] = useState<any | null>({
    customerName: 'David Miller',
    phone: '+91-98765-43210',
    email: 'david.miller@enterprise.io',
    membershipCardNumber: 'CARD-IN-442109',
    membershipTier: 'PLATINUM VIP ENTERPRISE',
    memberSince: '14 Jan 2024',
    validUntil: '31 Dec 2027',
    rewardPoints: '14,850 Pts',
    accountBalance: '₹45,200.00 Credit',
    tierDiscount: '20% Lifetime Enterprise Rebate',
    order: {
      orderId: 'ORD-9920148',
      placedDate: '19 Aug 2026, 09:30 AM',
      currentStatus: 'OUT_FOR_DELIVERY',
      carrier: 'BlueDart Express Air',
      trackingNumber: 'BLUEDART-8829104',
      estimatedDelivery: 'Today, 21 Aug 2026 by 02:00 PM',
      shippingAddress: 'Flat 402, Prestige Cyber Towers, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103',
      billingAddress: 'Enterprise Cloud Solutions Pvt Ltd, GSTIN: 29AAACE8829F1Z5',
      paymentMethod: 'Razorpay UPI Autopay (HDFC Bank)',
      paymentRef: 'pay_RZP99201488102',
      items: [
        { name: 'Forge AI Biometric Sentinel Terminal (Gen 3)', sku: 'HW-BIO-992', qty: 2, unitPrice: '₹14,999.00', total: '₹29,998.00', category: 'Hardware' },
        { name: 'Enterprise OCR High-Speed Scanner Dock', sku: 'HW-OCR-402', qty: 1, unitPrice: '₹8,500.00', total: '₹8,500.00', category: 'Accessories' },
        { name: 'Annual AI Voice Bot Telephony SIP License', sku: 'SW-SIP-1YR', qty: 1, unitPrice: '₹12,000.00', total: '₹12,000.00', category: 'Software SaaS' }
      ],
      subTotal: '₹50,498.00',
      gstTax: '₹9,089.64 (18% GST)',
      discountApplied: '-₹10,099.60 (20% Platinum VIP)',
      totalAmount: '₹49,488.04'
    },
    membershipPerks: [
      'Priority SLA Queue: < 30-Second AI & Human Intervention Response Time',
      'Dedicated Account Officer: Sarah Connor (Query Operations TL Desk)',
      'Zero-Fee Instant Replacement Warranty on Biometric Sentinel Hardware',
      'Unlimited Free Multi-Language Speech Transcription API Credits'
    ]
  });

  const handleExecuteLookup = (customQuery?: string) => {
    const query = customQuery || lookupQuery;
    if (!query.trim()) return;

    setIsSearchingLookup(true);
    setTimeout(() => {
      setIsSearchingLookup(false);
      if (query.toUpperCase().includes('FRANK') || query.includes('119283')) {
        setLookupResult({
          customerName: 'Frank Miller',
          phone: '+91-91234-56789',
          email: 'frank.m@innovatetech.com',
          membershipCardNumber: 'CARD-IN-119283',
          membershipTier: 'GOLD PARTNER ELITE',
          memberSince: '02 Mar 2025',
          validUntil: '15 Mar 2026',
          rewardPoints: '4,200 Pts',
          accountBalance: '₹12,000.00 Credit',
          tierDiscount: '10% Partner Rebate',
          order: {
            orderId: 'ORD-7718290',
            placedDate: '20 Aug 2026, 11:15 AM',
            currentStatus: 'SHIPPED',
            carrier: 'FedEx Priority',
            trackingNumber: 'FDX-9948201',
            estimatedDelivery: 'Tomorrow, 22 Aug 2026 by 05:00 PM',
            shippingAddress: 'Plot 12, Sector 5, Salt Lake, Kolkata, West Bengal - 700091',
            billingAddress: 'Innovate Tech Solutions, GSTIN: 19AABCI9928H1Z8',
            paymentMethod: 'Corporate Net Banking (ICICI)',
            paymentRef: 'pay_ICICI4491028',
            items: [
              { name: 'Dual Screen Customer Service Smart Terminal', sku: 'HW-DS-101', qty: 1, unitPrice: '₹22,000.00', total: '₹22,000.00', category: 'Hardware' }
            ],
            subTotal: '₹22,000.00',
            gstTax: '₹3,960.00 (18% GST)',
            discountApplied: '-₹2,200.00 (10% Gold Discount)',
            totalAmount: '₹23,760.00'
          },
          membershipPerks: [
            '2-Hour SLA Resolution Commitment for Critical System Outages',
            'Complimentary Next-Day Air Express Shipping on all hardware upgrades'
          ]
        });
      } else {
        setLookupResult({
          customerName: 'David Miller',
          phone: '+91-98765-43210',
          email: 'david.miller@enterprise.io',
          membershipCardNumber: 'CARD-IN-442109',
          membershipTier: 'PLATINUM VIP ENTERPRISE',
          memberSince: '14 Jan 2024',
          validUntil: '31 Dec 2027',
          rewardPoints: '14,850 Pts',
          accountBalance: '₹45,200.00 Credit',
          tierDiscount: '20% Lifetime Enterprise Rebate',
          order: {
            orderId: 'ORD-9920148',
            placedDate: '19 Aug 2026, 09:30 AM',
            currentStatus: 'OUT_FOR_DELIVERY',
            carrier: 'BlueDart Express Air',
            trackingNumber: 'BLUEDART-8829104',
            estimatedDelivery: 'Today, 21 Aug 2026 by 02:00 PM',
            shippingAddress: 'Flat 402, Prestige Cyber Towers, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103',
            billingAddress: 'Enterprise Cloud Solutions Pvt Ltd, GSTIN: 29AAACE8829F1Z5',
            paymentMethod: 'Razorpay UPI Autopay (HDFC Bank)',
            paymentRef: 'pay_RZP99201488102',
            items: [
              { name: 'Forge AI Biometric Sentinel Terminal (Gen 3)', sku: 'HW-BIO-992', qty: 2, unitPrice: '₹14,999.00', total: '₹29,998.00', category: 'Hardware' },
              { name: 'Enterprise OCR High-Speed Scanner Dock', sku: 'HW-OCR-402', qty: 1, unitPrice: '₹8,500.00', total: '₹8,500.00', category: 'Accessories' },
              { name: 'Annual AI Voice Bot Telephony SIP License', sku: 'SW-SIP-1YR', qty: 1, unitPrice: '₹12,000.00', total: '₹12,000.00', category: 'Software SaaS' }
            ],
            subTotal: '₹50,498.00',
            gstTax: '₹9,089.64 (18% GST)',
            discountApplied: '-₹10,099.60 (20% Platinum VIP)',
            totalAmount: '₹49,488.04'
          },
          membershipPerks: [
            'Priority SLA Queue: < 30-Second AI & Human Intervention Response Time',
            'Dedicated Account Officer: Sarah Connor (Query Operations TL Desk)',
            'Zero-Fee Instant Replacement Warranty on Biometric Sentinel Hardware',
            'Unlimited Free Multi-Language Speech Transcription API Credits'
          ]
        });
      }
    }, 450);
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', boxSizing: 'border-box' }}>
      
      {/* Top Search & Filter Bar Card */}
      <div className="glass-panel" style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} color="#0284c7" /> Tracking the Details
            </h2>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Universal lookup for shipment journey, delivery milestones, official invoice, and membership tier intelligence.
            </p>
          </div>
          <span className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}>
            Gateway Connected (BlueDart • FedEx • Razorpay)
          </span>
        </div>

        {/* Input & Action Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-9920148), Membership Card #, Phone (+91-98765-43210), or Email..."
              value={lookupQuery}
              onChange={e => setLookupQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleExecuteLookup();
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid var(--border-color)',
                background: 'var(--bg-dark)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleExecuteLookup()}
            disabled={isSearchingLookup}
            style={{ padding: '0.75rem 1.45rem', fontSize: '0.84rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: '8px' }}
          >
            {isSearchingLookup ? 'Tracking...' : 'Track Details'}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setLookupQuery('');
              setLookupResult(null);
            }}
            style={{ padding: '0.75rem 1.1rem', fontSize: '0.8rem', borderRadius: '8px' }}
          >
            Clear
          </button>
        </div>

        {/* Quick Demo Pre-fill Shortcuts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span>Quick Samples:</span>
          <button
            onClick={() => {
              setLookupQuery('ORD-9920148');
              handleExecuteLookup('ORD-9920148');
            }}
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#0284c7', cursor: 'pointer', fontSize: '0.72rem' }}
          >
            ORD-9920148 (Order ID)
          </button>
          <button
            onClick={() => {
              setLookupQuery('+91-98765-43210');
              handleExecuteLookup('+91-98765-43210');
            }}
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#059669', cursor: 'pointer', fontSize: '0.72rem' }}
          >
            +91-98765-43210 (Phone)
          </button>
          <button
            onClick={() => {
              setLookupQuery('CARD-IN-442109');
              handleExecuteLookup('CARD-IN-442109');
            }}
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#d97706', cursor: 'pointer', fontSize: '0.72rem' }}
          >
            CARD-IN-442109 (Membership Card)
          </button>
          <button
            onClick={() => {
              setLookupQuery('CARD-IN-119283');
              handleExecuteLookup('CARD-IN-119283');
            }}
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#8b5cf6', cursor: 'pointer', fontSize: '0.72rem' }}
          >
            CARD-IN-119283 (Frank Miller)
          </button>
        </div>
      </div>

      {/* Search Result Display View */}
      {lookupResult ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Customer Banner Header Card */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid #f7b500' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800 }}>
                {lookupResult.customerName.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800 }}>
                    {lookupResult.customerName}
                  </h3>
                  <span className="badge badge-warning" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                    {lookupResult.membershipTier}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                  <span><strong>{lookupResult.phone}</strong></span>
                  <span><strong>{lookupResult.email}</strong></span>
                  <span>Card: <strong style={{ color: '#d97706' }}>{lookupResult.membershipCardNumber}</strong></span>
                  <span>Member: <strong>{lookupResult.memberSince}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {onSelectSubTab && (
                <button
                  className="btn btn-secondary"
                  onClick={() => onSelectSubTab('WHATSAPP_SMS_DISPATCH')}
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                >
                  Quick Dispatch
                </button>
              )}
              {onOpenSession && (
                <button
                  className="btn btn-primary"
                  onClick={() => onOpenSession(lookupResult.phone)}
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                >
                  Open in Live Desk
                </button>
              )}
            </div>
          </div>

          {/* View Switcher Tabs: Order Fulfillment vs VIP Membership 360 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setLookupType('ORDER_ID')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                border: lookupType === 'ORDER_ID' ? '1.5px solid #0284c7' : '1px solid var(--border-color)',
                background: lookupType === 'ORDER_ID' ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-surface)',
                color: lookupType === 'ORDER_ID' ? '#0284c7' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Order Fulfillment & Tracking ({lookupResult.order.orderId})
            </button>
            <button
              onClick={() => setLookupType('MEMBERSHIP_CARD')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                border: lookupType === 'MEMBERSHIP_CARD' ? '1.5px solid #d97706' : '1px solid var(--border-color)',
                background: lookupType === 'MEMBERSHIP_CARD' ? 'rgba(217, 119, 6, 0.12)' : 'var(--bg-surface)',
                color: lookupType === 'MEMBERSHIP_CARD' ? '#d97706' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              VIP Membership & Benefits 360 ({lookupResult.membershipCardNumber})
            </button>
          </div>

          {/* TAB 1: DEEP ORDER DETAILS & FULFILLMENT AUDIT VIEW */}
          {lookupType === 'ORDER_ID' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', alignItems: 'start' }}>
              
              {/* Left Column Box: Vertical Shipment Journey Stepper */}
              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Tracking Header */}
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Real-Time Courier Journey
                  </span>
                  <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 800 }}>
                    Arriving {lookupResult.order.estimatedDelivery}
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Courier: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.carrier}</strong> • Waybill AWB #<strong style={{ color: '#d97706', fontFamily: 'monospace' }}>{lookupResult.order.trackingNumber}</strong>
                  </div>
                </div>

                {/* VERTICAL STEPPER TIMELINE */}
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0.25rem' }}>
                  {[
                    {
                      stage: 'Order Confirmed',
                      date: '19 Aug, 09:30 AM',
                      desc: 'Order placed & payment verified via Razorpay gateway.',
                      icon: '',
                      completed: true,
                      active: false
                    },
                    {
                      stage: 'Packed & Invoiced',
                      date: '19 Aug, 02:00 PM',
                      desc: 'Official GST invoice generated. Hardware packed at Electronic City Warehouse.',
                      icon: '',
                      completed: true,
                      active: false
                    },
                    {
                      stage: 'Shipped (In Transit)',
                      date: '20 Aug, 08:30 AM',
                      desc: 'Package dispatched via BlueDart Express Air Courier with tracking #BLUEDART-8829104.',
                      icon: '',
                      completed: true,
                      active: false
                    },
                    {
                      stage: 'Out for Delivery',
                      date: '21 Aug, 07:15 AM',
                      desc: 'Courier associate Ramesh Kumar has picked up shipment from Ashok Nagar Hub.',
                      icon: '',
                      completed: true,
                      active: true
                    },
                    {
                      stage: 'Delivered',
                      date: 'Est. 21 Aug, 02:00 PM',
                      desc: 'Package will be handed over at customer shipping address.',
                      icon: '',
                      completed: false,
                      active: false
                    }
                  ].map((step, idx, arr) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                      
                      {/* Vertical Line Connector */}
                      {idx < arr.length - 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '15px',
                            top: '32px',
                            bottom: '-4px',
                            width: '2px',
                            background: step.completed && arr[idx + 1].completed ? '#10b981' : step.completed ? 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.2) 100%)' : 'var(--border-color)',
                            zIndex: 1
                          }}
                        />
                      )}

                      {/* Circular Icon Node */}
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: step.completed ? (step.active ? '#f7b500' : '#10b981') : 'var(--bg-dark)',
                          border: step.completed ? (step.active ? '2px solid #fff' : '2px solid #10b981') : '2px dashed var(--border-color)',
                          color: step.completed ? (step.active ? '#000' : '#fff') : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          zIndex: 2,
                          flexShrink: 0,
                          boxShadow: step.active ? '0 0 10px rgba(247, 181, 0, 0.5)' : 'none'
                        }}
                      >
                        {step.completed ? (step.active ? step.icon : '') : step.icon}
                      </div>

                      {/* Step Description Content */}
                      <div style={{ paddingBottom: idx < arr.length - 1 ? '1.25rem' : '0.25rem', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <strong style={{ fontSize: '0.86rem', color: step.active ? '#d97706' : step.completed ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {step.stage}
                          </strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {step.date}
                          </span>
                        </div>
                        <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.35' }}>
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Delivery Associate Info Box */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800 }}>
                                      </div>
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>Ramesh Kumar (Delivery Associate)</strong>
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Out for Delivery with shipment</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      Hub Facility: <strong>+91-80-4920-1100</strong> (BlueDart Bengaluru South Facility)
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column Box: Order Line Items, Financials & Addresses */}
              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Line Items List */}
                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.6rem' }}>
                    Ordered Line Items ({lookupResult.order.items.length} items)
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {lookupResult.order.items.map((item: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.45rem' }}>
                        <div>
                          <strong style={{ color: '#0284c7', fontSize: '0.8rem', display: 'block' }}>{item.name}</strong>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            SKU: {item.sku} • Qty: <strong>{item.qty}</strong> • <span className="badge badge-secondary" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>{item.category}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ color: '#059669', fontSize: '0.85rem' }}>{item.total}</strong>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.unitPrice} each</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoice & Pricing Breakdown */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.76rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Subtotal:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.subTotal}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>GST / Taxes:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.gstTax}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Discounts:</span>
                    <strong style={{ color: '#059669' }}>{lookupResult.order.discountApplied}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.45rem', fontSize: '0.95rem', fontWeight: 800 }}>
                    <span style={{ color: 'var(--text-main)' }}>Final Total Paid:</span>
                    <span style={{ color: '#059669' }}>{lookupResult.order.totalAmount}</span>
                  </div>
                </div>

                {/* Shipping & Billing Address Box */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Shipping Destination Address:</span>
                    <strong style={{ color: 'var(--text-main)', lineHeight: '1.35' }}>{lookupResult.order.shippingAddress}</strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Billing Entity & Tax ID:</span>
                    <strong style={{ color: 'var(--text-main)', lineHeight: '1.35' }}>{lookupResult.order.billingAddress}</strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Gateway Transaction Reference:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <code style={{ color: '#0284c7', background: 'var(--bg-dark)', padding: '0.15rem 0.4rem', borderRadius: '4px', display: 'inline-block' }}>{lookupResult.order.paymentRef}</code>
                      <TicketVisionButton ticket={{ id: lookupResult.order.paymentRef, ticketNumber: lookupResult.order.paymentRef, customerName: lookupResult.customerName, departmentLabel: 'Billing & Order Desk', status: 'PAID' }} compact size="sm" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: DEEP VIP MEMBERSHIP CARD & BENEFITS 360 VIEW */}
          {lookupType === 'MEMBERSHIP_CARD' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Digital VIP Membership Smart Card Display */}
              <div
                className="glass-panel"
                style={{
                  borderRadius: '14px',
                  border: '2px solid #f7b500',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 8px 24px rgba(247, 181, 0, 0.15)',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  background: 'var(--bg-surface)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.5rem' }}></span>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#d97706', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 800 }}>
                        Forge Enterprise Partner Club
                      </span>
                      <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800 }}>
                        {lookupResult.membershipTier}
                      </h3>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.5px', fontWeight: 700 }}>MEMBERSHIP CARD NUMBER</span>
                    <div style={{ fontSize: '1.15rem', color: '#d97706', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '1.5px' }}>
                      {lookupResult.membershipCardNumber}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem', flexWrap: 'wrap' }}>
                    <span>Cardholder: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.customerName}</strong></span>
                    <span>Member Since: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.memberSince}</strong></span>
                    <span>Valid Until: <strong style={{ color: '#059669' }}>{lookupResult.validUntil}</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ background: 'rgba(247, 181, 0, 0.12)', border: '1px solid #f7b500', padding: '0.45rem 0.9rem', borderRadius: '8px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.66rem', color: '#d97706', display: 'block', fontWeight: 800 }}>REWARD LOYALTY BALANCE</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{lookupResult.rewardPoints}</strong>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', padding: '0.45rem 0.9rem', borderRadius: '8px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.66rem', color: '#059669', display: 'block', fontWeight: 800 }}>WALLET ADVANCE CREDIT</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{lookupResult.accountBalance}</strong>
                  </div>
                </div>
              </div>

              {/* 3-Column Membership Intelligence Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                
                {/* Exclusive Membership Benefits & Privileges */}
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Tier Privileges & Contract Benefits
                  </strong>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {lookupResult.membershipPerks.map((perk: string, idx: number) => (
                      <div key={idx} style={{ background: 'var(--bg-dark)', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-main)', lineHeight: '1.35', fontWeight: 500 }}>
                        {perk}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(247, 181, 0, 0.08)', border: '1px solid rgba(247, 181, 0, 0.3)', borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.74rem' }}>
                    <strong style={{ color: '#d97706', display: 'block', marginBottom: '0.15rem' }}>Partner Discount Rule:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{lookupResult.tierDiscount} applied automatically at checkout for all renewals.</span>
                  </div>
                </div>

                {/* Dedicated Agent & KYC Verification */}
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Governance, KYC & Account Lead
                  </strong>

                  <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Assigned Query Team Lead:</span>
                    <strong style={{ color: 'var(--text-main)' }}>Sarah Connor (Operations Supervisor)</strong>
                  </div>

                  <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>KYC Identity Verification:</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>100% Passed (Aadhaar & PAN Linked)</span>
                  </div>

                  <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Escrow & Payment Authorization:</span>
                    <span style={{ color: '#0284c7', fontWeight: 700 }}>Pre-Approved Autonomous Credit</span>
                  </div>
                </div>

                {/* Loyalty Tier Progress & Milestones */}
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Next Tier Upgrade Milestone
                  </strong>

                  <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Progress to Diamond Elite:</span>
                      <strong style={{ color: '#059669' }}>74% Achieved</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #0284c7 100%)' }} />
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>5,150 more points needed for 25% Lifetime Rebate.</span>
                  </div>

                  <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.72rem', color: 'var(--text-main)' }}>
                    <strong>Next Renewal:</strong> 31 Dec 2027 • Auto-renewal active via corporate card.
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Search size={36} style={{ color: 'var(--border-color)', margin: '0 auto 0.75rem auto', display: 'block' }} />
          <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>No Search Results Displayed</strong>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem' }}>
            Enter an Order ID (e.g. <code>ORD-9920148</code>), Membership Card Number, or Phone Number to view full 360° courier journey and customer details.
          </p>
        </div>
      )}

    </div>
  );
};

export default TrackingDetailsView;
