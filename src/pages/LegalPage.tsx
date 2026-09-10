import React from 'react';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          Compliance & Legal Framework
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          {type === 'privacy' ? 'Privacy Policy (GDPR & CCPA Compliance)' : 'Terms & Conditions of Sale'}
        </h1>
        <p className="text-xs text-stone-500 font-mono">
          Last revised: September 2026 • Certified by Velora Legal Zurich
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-stone-600 dark:text-stone-400 space-y-6 leading-relaxed">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                1. Commitment to Data Sovereignty
              </h2>
              <p>
                Velora Atelier Inc. and its European subsidiaries respect your fundamental right to digital privacy. We operate in strict compliance with the European Union General Data Protection Regulation (Regulation (EU) 2016/679 - "GDPR"), the Swiss Federal Data Protection Act (FADP), and the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                2. Information Gathered & Purpose
              </h2>
              <p>
                We only collect information strictly requisite to fulfill White Glove courier consignments, authenticate NFC provenance certificates, and safeguard client accounts against fraudulent transactions. We do NOT sell, lease, or monetize patron telemetric data to third-party ad networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                3. Your Rights Under GDPR & CCPA
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right of Access (Article 15 GDPR):</strong> Request a complete cryptographic JSON archive of all personal records via the Patron Account portal.</li>
                <li><strong>Right to Rectification (Article 16 GDPR):</strong> Update or correct inaccurate delivery details at any time.</li>
                <li><strong>Right to Erasure / To Be Forgotten (Article 17 GDPR):</strong> Request immediate anonymization of your profile, subject to statutory tax record retention obligations.</li>
                <li><strong>Non-Discrimination:</strong> California patrons exercising CCPA rights will never face price discrimination or diminished service quality.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                4. Data Protection Officer (DPO) Contact
              </h2>
              <p>
                To lodge an inquiry or exercise statutory rights, address correspondence to <code className="text-stone-900 dark:text-stone-200">privacy@velora-atelier.com</code>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                1. Contract Formation & Authenticity
              </h2>
              <p>
                Every transaction completed on the Velora digital boutique constitutes a binding sales agreement governed by the commercial code of Zurich, Switzerland. Each piece is delivered with an irreversible cryptographic provenance token registered in our master ledger.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                2. White Glove Logistics & Risk of Loss
              </h2>
              <p>
                Risk of loss transfers only upon physical handoff and formal signature recorded by our White Glove courier. Should transit damage occur, Velora guarantees immediate replacement or full restitution.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                3. Three-Year Atelier Warranty
              </h2>
              <p>
                All mechanical timepieces, acoustic transducers, and leather goods are guaranteed against manufacturing defects for 36 months from delivery date.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
