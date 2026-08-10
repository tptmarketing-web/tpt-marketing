import { connectDB } from './mongodb';
import { SiteSettings } from './models/site-settings';

const PRIVACY_POLICY = `Privacy Policy

Last Updated: January 1, 2024

This Privacy Policy describes how your personal information is collected, used, and shared when you visit this website (the "Site"). This Site is operated by an independent educator and seller on the Teachers Pay Teachers (TPT) platform. The Site serves as a marketing and informational landing page for educational resources available for purchase on the TPT marketplace.

1. Information We Collect

When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."

We collect Device Information using the following technologies:
- "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.
- "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
- "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.

2. Google Ads and Remarketing

This Site may use Google Ads and Google Remarketing services. Google uses cookies to serve ads based on your prior visits to this Site or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads). Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.

We may also use Google Analytics to track and analyze website traffic. Google Analytics uses cookies to collect information about your use of the Site. This information is used to compile reports and help us improve the Site. The information collected is anonymous and includes the number of visitors to the Site, where visitors have come to the Site from, and the pages they visited.

3. How We Use Your Information

We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns). We do not sell, trade, or otherwise transfer your personal information to outside parties.

4. No Direct Sales on This Site

This Site does not process any transactions directly. All purchases of educational resources are conducted through the Teachers Pay Teachers (TPT) marketplace platform. Any personal information you provide during a purchase transaction is subject to the TPT Privacy Policy, which can be found at teacherspayteachers.com.

5. Children's Privacy (COPPA Compliance)

This Site is intended for use by educators, parents, and other adults. We do not knowingly collect personal information from children under the age of 13. If we learn that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information as quickly as possible. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately at the email address provided below.

6. Data Retention

We retain Device Information for our records unless and until you ask us to delete this information.

7. Your Rights

If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us using the information below. Additionally, if you are a European resident we note that we are processing your information in order to pursue our legitimate business interests.

8. Changes

We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.

9. Governing Law

This Privacy Policy and any disputes related thereto shall be governed by and construed in accordance with the laws of the United States of America.

10. Contact Us

For more information about our privacy practices, or if you have questions or complaints, please contact us by email at the address listed on the Contact section of this Site.`;

const TERMS_OF_SERVICE = `Terms of Service

Last Updated: January 1, 2024

Please read these Terms of Service ("Terms") carefully before using this website (the "Site"). By accessing or using the Site, you agree to be bound by these Terms.

1. Overview

This Site is operated by an independent educator and seller on the Teachers Pay Teachers (TPT) platform. The Site serves as a marketing and informational landing page for educational resources that are available for purchase through the TPT marketplace. The seller is an independent individual and is not an employee, agent, or representative of Teachers Pay Teachers.

2. Products and Purchases

All educational resources advertised on this Site are sold exclusively through the Teachers Pay Teachers platform. By clicking any "Buy" or "View on TPT" link, you will be redirected to the TPT website where all transactions are processed. All purchases, payments, and order fulfillment are subject to the TPT Terms of Use, which can be found at teacherspayteachers.com. We do not process payments, handle billing, or manage order fulfillment directly on this Site.

3. Intellectual Property

All content on this Site, including but not limited to text, graphics, logos, images, educational materials, and software, is the property of the seller or its content suppliers and is protected by United States and international copyright laws. The educational resources listed on this Site are original creations of the seller. All rights are reserved.

You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on this Site without the express prior written consent of the seller. Purchased resources are licensed for use by the purchasing individual only. Resources may not be redistributed, shared with other educators, uploaded to shared drives for non-purchasers, or resold commercially.

4. Permitted Use

You are granted a limited, non-exclusive, non-transferable license to access and use the Site for personal and informational purposes. You agree not to use the Site for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Site.

5. Disclaimer of Warranties

The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, timely, secure, or error-free.

6. Limitation of Liability

In no event shall the seller be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.

7. Governing Law

These Terms shall be governed by and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.

8. Changes to Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the Site after any changes constitutes acceptance of the new Terms.

9. Contact Information

For questions about these Terms, please contact us using the email address listed in the Contact section of this Site.`;

const REFUND_POLICY = `Refund Policy

Last Updated: January 1, 2024

Thank you for purchasing educational resources from our Teachers Pay Teachers (TPT) store. We want you to be completely satisfied with your purchase.

1. Digital Products — Non-Refundable After Download

All products sold through our TPT store are digital downloads. Due to the nature of digital products, all sales are final once the product has been downloaded. Once a digital file has been accessed or downloaded, it cannot be "returned" in the traditional sense, and therefore we are unable to offer refunds for downloaded products. This is standard policy for digital goods on the Teachers Pay Teachers platform.

2. TPT Buyer Protection

All purchases are made through the Teachers Pay Teachers marketplace, which offers its own buyer protection program. If you experience issues with a purchase, you may be eligible for a refund or credit through TPT's buyer protection policy. To request a refund through TPT, please visit your "My Purchases" page on the TPT website and follow the refund request process outlined by TPT. Refund eligibility and processing are subject to TPT's own terms and policies.

3. Technical Issues

If you experience any technical difficulties with a product you have purchased — such as corrupted files, missing pages, or formatting issues — please contact us directly at the email address listed on our Contact page. We will work promptly to resolve the issue, which may include providing a corrected file, an alternative format, or other appropriate resolution. We are committed to ensuring that every customer receives a fully functional product.

4. No Physical Goods

We do not sell or ship physical goods. All products are delivered digitally through the TPT platform. There are no shipping, handling, or physical return processes applicable to our products.

5. Exchanges

We do not offer exchanges between different products. If you have purchased a product that does not meet your needs, we encourage you to review the product description, preview files, and customer reviews before making future purchases.

6. Contact Us

If you have any questions or concerns about this refund policy or a specific purchase, please reach out to us via the contact email provided on our Site. We strive to respond to all inquiries within 48 business hours.`;

const DEFAULT_FAQS = [
  {
    question: 'How do I use the resources offered here?',
    answer: 'Each resource is a ready-to-use digital file (such as a PDF, Google Slides, or printable worksheet). After purchasing on Teachers Pay Teachers, simply download the file and print or share it with your students. Every product page includes details on the format and what is included so you know exactly how to use it in your classroom.',
  },
  {
    question: 'How can I purchase these resources?',
    answer: 'All resources are sold securely through the Teachers Pay Teachers (TPT) marketplace. Just click the "View & Buy on Teachers Pay Teachers" button on any product page, and you will be taken to TPT to complete your purchase. Payment, download, and buyer protection are all handled by TPT.',
  },
  {
    question: 'Who are these resources designed for?',
    answer: 'Our materials are created for teachers, homeschool parents, and tutors. Each product lists the recommended grade levels and target audience, so you can quickly find resources that fit your students’ needs.',
  },
  {
    question: 'What file formats do the resources come in?',
    answer: 'Formats vary by product and may include PDF, Google Slides, PowerPoint, or other digital files. The exact format is always listed on each product page under "Format" so you know what you are getting before you buy.',
  },
  {
    question: 'Can I get a refund if a resource does not meet my needs?',
    answer: 'Because all products are digital downloads, sales are final once downloaded. However, all purchases are covered by TPT’s buyer protection program, and if you experience any technical issues with a file, please contact us directly — we are happy to help resolve it.',
  },
];

export async function seedDatabase() {
  await connectDB();
  const existing = await SiteSettings.findOne();
  if (existing) {
    if (!existing.faqs || existing.faqs.length === 0) {
      existing.faqs = DEFAULT_FAQS as any;
      if (!existing.faqTitle) existing.faqTitle = 'Frequently Asked Questions';
      await existing.save();
      console.log('Default FAQs backfilled into existing SiteSettings');
    }
    console.log('SiteSettings already exist, skipping seed');
    return;
  }
  if (!existing) {
    await SiteSettings.create({
      brandName: 'My TPT Store',
      tagline: 'Quality Educational Resources for Every Classroom',
      aboutText: 'Welcome to my Teachers Pay Teachers store! I create high-quality educational resources designed to engage students and save teachers time.',
      sellerName: 'Your Name',
      sellerBio: 'Experienced educator passionate about creating engaging, standards-aligned resources.',
      tptStoreUrl: 'https://www.teacherspayteachers.com',
      contactEmail: 'contact@example.com',
      contactPhone: null,
      sellerAvatarUrl: null,
      privacyPolicy: PRIVACY_POLICY,
      termsOfService: TERMS_OF_SERVICE,
      refundPolicy: REFUND_POLICY,
      faqTitle: 'Frequently Asked Questions',
      faqs: DEFAULT_FAQS,
    });
    console.log('SiteSettings seeded successfully');
  }
}
