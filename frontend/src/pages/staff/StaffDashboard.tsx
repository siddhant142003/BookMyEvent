import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/shared/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ScanLine, 
  CheckCircle2, 
  XCircle, 
  Camera,
  AlertTriangle,
  Clock,
  Ticket,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { TicketValidationStatus } from '@/types';
import { useEffect, useState } from "react";
import { StaffAPI } from "@/lib/api/staff.api";
import type { Event } from "@/types/backend";
import QRCodeScanner from "@/components/staff/QRCodeScanner";
import { QRCodeSVG } from "qrcode.react";

type ScanResult = {
  id: string;
  status: TicketValidationStatus;
  ticketId: string;
  attendeeName: string;
  ticketType: string;
  timestamp: Date;
};

export default function StaffDashboard() {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const staffScanUrl = window.location.origin + "/staff";

  const handleQrScan = async (qrCode: string) => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch(
          `http://localhost:8080/api/tickets/validate/${encodeURIComponent(qrCode)}`
      );

      const data = await res.json();

      const scan: ScanResult = {
        id: Date.now().toString(),
        status: data.status,          // valid / already_used / invalid
        ticketId: data.ticketId,
        attendeeName: data.attendeeName,
        ticketType: data.ticketType,
        timestamp: new Date(),
      };

      setScanResult(scan);
      setScanHistory(prev => [scan, ...prev]);
    } catch (e) {
      setScanResult({
        id: Date.now().toString(),
        status: "invalid",
        ticketId: "UNKNOWN",
        attendeeName: "Unknown",
        ticketType: "Unknown",
        timestamp: new Date(),
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getStatusConfig = (status: TicketValidationStatus) => {
    switch (status) {
      case 'valid':
        return { 
          icon: CheckCircle2, 
          color: 'text-success', 
          bg: 'bg-success/10', 
          border: 'border-success',
          label: 'Valid Entry' 
        };
      case 'already_used':
        return { 
          icon: AlertTriangle, 
          color: 'text-warning', 
          bg: 'bg-warning/10', 
          border: 'border-warning',
          label: 'Already Scanned' 
        };
      case 'invalid':
      case 'expired':
        return { 
          icon: XCircle, 
          color: 'text-destructive', 
          bg: 'bg-destructive/10', 
          border: 'border-destructive',
          label: status === 'expired' ? 'Expired' : 'Invalid Ticket' 
        };
      default:
        return { icon: AlertTriangle, color: 'text-muted', bg: 'bg-muted', border: 'border-border', label: 'Unknown' };
    }
  };

  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const event = await StaffAPI.getActiveEvent();
        setActiveEvent(event);
      } catch (err) {
        console.error("Failed to fetch active event", err);
      }
    };

    fetchActiveEvent();
  }, []);

  const stats = {
    scannedToday: scanHistory.length,
    validScans: scanHistory.filter(s => s.status === "valid").length,
    invalidScans: scanHistory.filter(s => s.status !== "valid").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="staff" userName={user?.name ?? ""} />
      
      <main className="container py-8">
        {/* Current Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-primary text-primary-foreground p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge className="bg-accent text-accent-foreground mb-2">Now Active</Badge>
              {activeEvent && (
                  <>
                    <h2 className="text-2xl font-display font-bold">
                      {activeEvent.title}
                    </h2>

                    <p className="text-primary-foreground/70">
                      {activeEvent.location}
                    </p>

                    <p className="font-semibold">
                      {format(new Date(activeEvent.startDate), 'h:mm a')} -{' '}
                      {format(new Date(activeEvent.endDate), 'h:mm a')}
                    </p>
                  </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scanner Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border-2 border-border bg-card p-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-display font-bold mb-2">QR Code Scanner</h3>
                <p className="text-muted-foreground">Scan attendee tickets to validate entry</p>
              </div>

              {/* Staff QR Code (scan from mobile) */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Scan this QR from your mobile phone
                </p>

                <div className="bg-white p-4 rounded-xl shadow">
                  <QRCodeSVG
                      value={window.location.origin + "/staff"}
                      size={180}
                      level="H"
                      includeMargin
                  />
                </div>
              </div>

              {/* Scanner Area */}
              <div className="relative mx-auto w-full max-w-sm aspect-square rounded-2xl border-2 border-dashed border-border bg-secondary/30 mb-6 overflow-hidden">

                {cameraActive ? (
                    <QRCodeScanner
                        onScan={(qrText) => {
                          setCameraActive(false);
                          handleQrScan(qrText);
                        }}
                        onError={() => {}}
                    />
                ) : scanResult ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                          key={scanResult.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className={`absolute inset-4 rounded-xl ${getStatusConfig(scanResult.status).bg} ${getStatusConfig(scanResult.status).border} border-2 flex flex-col items-center justify-center p-6`}
                      >
                        {(() => {
                          const config = getStatusConfig(scanResult.status);
                          const Icon = config.icon;
                          return (
                              <>
                                <Icon className={`h-16 w-16 ${config.color} mb-4`} />
                                <h4 className={`text-xl font-bold ${config.color}`}>{config.label}</h4>
                                <div className="mt-4 text-center">
                                  <p className="font-semibold">{scanResult.attendeeName}</p>
                                  <p className="text-sm text-muted-foreground">{scanResult.ticketType}</p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    ID: {scanResult.ticketId}
                                  </p>
                                </div>
                              </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Ready to scan</p>
                    </div>
                )}
              </div>
              <Button
                  variant="hero"
                  size="xl"
                  className="w-full gap-3"
                  onClick={() => {
                    setScanResult(null);
                    setCameraActive(true);
                  }}
              >
              <ScanLine className="h-6 w-6" />
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </motion.div>

            {/* Scan History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
              <div className="space-y-3">
                {scanHistory.slice(0, 5).map((scan) => {
                  const config = getStatusConfig(scan.status);
                  const Icon = config.icon;
                  return (
                    <div
                      key={scan.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bg}`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-medium truncate">{scan.attendeeName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ticket className="h-3 w-3" />
                          <span>{scan.ticketType}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <Badge variant="outline" className={config.color}>
                          {config.label}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(scan.timestamp, 'h:mm:ss a')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <StatCard
              title="Scanned Today"
              value={stats.scannedToday}
              icon={ScanLine}
              delay={0.3}
            />
            <StatCard
              title="Valid Entries"
              value={stats.validScans}
              icon={CheckCircle2}
              variant="success"
              delay={0.4}
            />
            <StatCard
              title="Invalid Scans"
              value={stats.invalidScans}
              icon={XCircle}
              delay={0.5}
            />

            {/* Live Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium">Live Entry Counter</span>
              </div>
              <div className="text-center">
                <p className="text-5xl font-display font-bold">{stats.validScans}</p>
                <p className="text-muted-foreground">attendees checked in</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
