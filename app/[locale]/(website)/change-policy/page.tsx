export default function ChangePolicyPage() {
  return (
    <main className="container mx-auto space-y-12 py-10 pt-38">
      <h1 className="text-center text-2xl font-bold lg:text-4xl ltr:hidden">
        سياسة الاستبدال
      </h1>
      <h2 className="text-center text-2xl font-bold lg:text-4xl rtl:hidden">
        Exchange Policy
      </h2>

      {/* Arabic */}
      <section className="space-y-6 ltr:hidden">
        <h1 className="text-2xl font-semibold">الاستبدال وفق ضوابط مبسّطة</h1>
        <p>
          سياسة "الاستبدال وفق ضوابط مبسّطة" سيتم صياغتها من قبل الأدمن وفق
          متطلبات النشاط التجاري والقوانين المحلية. هذا المولد يوفر لك قالبًا
          أوليًا قابلًا للتعديل، ويجب على الأدمن مراجعة النص وتعديله قبل اعتماده
          رسميًا.
        </p>
        <p>
          "نحن نلتزم بتوفير خدمة استبدال المنتجات وفق ضوابط مبسّطة تضمن حقوق
          العملاء وتسهل إجراءات الاستبدال، بما يتماشى مع قوانين حماية المستهلك
          والمعايير المتبعة."
        </p>
      </section>

      {/* English */}
      <section className="space-y-6 rtl:hidden">
        <h1 className="text-2xl font-semibold">
          Exchange Under Simplified Rules
        </h1>
        <p>
          The "Exchange Under Simplified Rules" policy will be drafted by the
          admin in line with the business requirements and local laws. This
          generator provides an initial, editable template. The admin must
          review and adapt the text before officially adopting it.
        </p>
        <p>
          We are committed to providing a product exchange service under
          simplified rules that safeguard customers&apos; rights and streamline
          the process, in accordance with consumer protection laws and accepted
          standards.
        </p>
      </section>
    </main>
  )
}
