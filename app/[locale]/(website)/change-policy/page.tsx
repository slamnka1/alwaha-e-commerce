export default function ChangePolicyPage() {
  return (
    <main className="container mx-auto space-y-12 py-10 pt-38">
      <h1 className="text-center text-2xl font-bold lg:text-4xl ltr:hidden">
        سياسة الاستبدال والإرجاع
      </h1>
      <h2 className="text-center text-2xl font-bold lg:text-4xl rtl:hidden">
        Returns & Exchange Policy
      </h2>

      {/* Arabic */}
      <section className="space-y-6 ltr:hidden">
        <h1 className="text-2xl font-semibold">
          ما هي سياستنا بشأن عمليات الاستبدال والإرجاع؟
        </h1>
        <h2 className="text-xl font-semibold">حقائق عامة</h2>
        <ul className="list-disc space-y-2 ps-6">
          <li>
            يمكنك إرجاع العناصر المؤهلة لاسترداد أموالك خلال 14 يومًا من استلام
            طلبك الأصلي.
          </li>
          <li>
            يمكنك التحقق مما إذا كان المنتج الذي تلقيته هو بالضبط نفس المنتج
            الذي طلبته عبر الإنترنت عبر مطابقة رقم SKU للمنتج الموجود على علامة
            المنتج مع الفاتورة المرسلة إلى بريدك الإلكتروني.
          </li>
          <li>لا يمكن إرجاع أو استبدال الملحقات.</li>
          <li>العناصر التي تضررت بسبب المحاولة غير الدقيقة لا تعتبر معيبة.</li>
          <li>
            يرجى ملاحظة أن البضائع هي مسؤوليتك حتى تصل إلينا. يرجى التأكد من
            تغليفها بشكل صحيح وعدم تعرضها للتلف في الطريق.
          </li>
          <li>
            نظرًا لأنه في حالات نادرة يمكن اكتشاف بعض عيوب التصنيع، يتم فحص كل
            منتج جيدًا قبل شحنه إلى عملائنا، وفي حالة استلامه كإرجاع أيضًا،
            لضمان مستوى خدمة مناسب لعملائنا.
          </li>
          <li>
            يجب أن تكون الفاتورة الأصلية متضمنة مع السلعة/المنتجات المرتجعة.
          </li>
          <li>
            نظرًا لمرونتنا في قبول المرتجعات، نقبل العناصر التي يتم إرجاعها بدون
            عبواتها الأصلية، بشرط أن تكون جميع علامات السعر والتفاصيل الموجودة
            على المنتج مرفقة وسليمة، وأن يكون المنتج/المنتجات معبأة جيدًا ومحمية
            ومرفقة بأي ملحقات و/أو عناصر الحزمة التي تأتي مع المنتج. يجب أن يكون
            المنتج بحالته الجديدة تمامًا، وفي حال استعمال المنتج فإن حق الإرجاع
            يسقط.
          </li>
          <li>
            قد يستغرق استرداد الأموال من 10 إلى 15 يوم عمل من تاريخ استلامنا
            للمنتج/المنتجات المرتجعة.
          </li>
          <li>
            يجب تقديم أي استفسارات أو شكاوى بخصوص الشحنة المستلمة خلال مدة
            أقصاها يومان من تاريخ التسليم.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">مبلغ الاسترداد</h2>
        <ul className="list-disc space-y-2 ps-6">
          <li>
            وفقًا لسياستنا، نقوم برد مبلغ العناصر المشتراة فقط، ولن يتم استرداد
            رسوم الشحن.
          </li>
          <li>رسوم التغليف الفاخر غير قابلة للاسترداد.</li>
        </ul>

        <h2 className="text-xl font-semibold">التبادل</h2>
        <p>
          لا يمكننا حاليًا تقديم عمليات التبادل. بدلاً من ذلك، يجب أن تتبع جميع
          العناصر عملية الإرجاع، ويتم تقديم طلب جديد للعناصر البديلة.
        </p>

        <h2 className="text-xl font-semibold">العوائد الدولية</h2>
        <p>
          قد تستغرق عملية استرداد الأموال ما يصل إلى 10 أيام عمل بعد استلامنا
          للمنتج المرتجع. سيتم خصم مبلغ 10$ من قيمة المبلغ المسترد كرسوم إعادة
          الشحن.
        </p>

        <h2 className="text-xl font-semibold">خطوات إرجاع منتج تم شراؤه</h2>
        <ol className="list-decimal space-y-2 ps-6">
          <li>
            لبدء عملية الإرجاع، يرجى الذهاب إلى نموذج الإرجاع وملؤه. بمجرد أن
            نتلقى النموذج، سوف نتواصل معك عبر البريد الإلكتروني لتأكيد طلب
            الإرجاع وإرشادك خلال الإجراءات التالية.
          </li>
          <li>
            قم بتعبئة الإرجاع بشكل آمن، في العبوة الأصلية إن أمكن، وارفق
            الفاتورة الكاملة.
          </li>
          <li>
            عندما تصبح طردتك جاهزة، ستقوم شركة الشحن باستلام الطرد عند باب
            منزلك.
          </li>
          <li>
            إرجاع طلبات "الاستلام من المتجر" في المتجر حصراً، لن تتمكن من إنشاء
            طلب إرجاع عبر الموقع.
          </li>
        </ol>

        <div className="space-y-2">
          <p>
            إذا كان لديك أي تعليقات أو شكاوى أو استفسارات، يرجى الاتصال بفريق
            خدمة العملاء لدينا على البريد: @alzainfashion.com
          </p>
          <p>
            أو يمكنك الاتصال بنا أو مراسلتنا عبر الواتساب على الرقم:
            00971566142600 من الساعة 10 صباحًا حتى الساعة 12 صباحًا (توقيت
            جرينتش +3) طوال أيام الأسبوع.
          </p>
          <p>تطبق الشروط والأحكام.</p>
        </div>
      </section>

      {/* English */}
      <section className="space-y-6 rtl:hidden">
        <h1 className="text-2xl font-semibold">
          What is our Returns and Exchange Policy?
        </h1>

        <h2 className="text-xl font-semibold">General Facts</h2>
        <ul className="list-disc space-y-2 ps-6">
          <li>
            You may return eligible items for a refund within 14 days of
            receiving your original order.
          </li>
          <li>
            You can verify the product received matches your online order by
            matching the product SKU on the tag with the invoice sent to your
            email.
          </li>
          <li>Accessories are not eligible for return or exchange.</li>
          <li>
            Items damaged due to improper trying-on are not considered
            defective.
          </li>
          <li>
            Please note that the goods remain your responsibility until they
            reach us. Ensure proper packaging to avoid damage in transit.
          </li>
          <li>
            Although rare manufacturing defects may be discovered, every product
            is thoroughly inspected before shipping to customers and also upon
            receipt as a return to ensure an appropriate level of service.
          </li>
          <li>
            The original invoice must be included with the returned item(s).
          </li>
          <li>
            We accept returns without original packaging, provided all price
            tags and product details are attached and intact, and the item(s)
            are well packed, protected, and include any accessories and/or
            in-box items that came with the product. The product must be in
            brand-new condition. If the product has been used, the right to
            return is forfeited.
          </li>
          <li>
            Refunds may take 10–15 business days from the date we receive the
            returned item(s).
          </li>
          <li>
            Any inquiries or complaints regarding the received shipment must be
            submitted within a maximum of 2 days from the delivery date.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Refund Amount</h2>
        <ul className="list-disc space-y-2 ps-6">
          <li>
            According to our policy, we refund only the value of purchased
            items. Shipping fees are non-refundable.
          </li>
          <li>Premium/gift wrapping fees are non-refundable.</li>
        </ul>

        <h2 className="text-xl font-semibold">Exchange</h2>
        <p>
          We currently do not offer exchanges. Instead, all items must follow
          the return process, and a new order should be placed for replacement
          items.
        </p>

        <h2 className="text-xl font-semibold">International Returns</h2>
        <p>
          Refund processing may take up to 10 business days after we receive the
          returned item. A fee of $10 will be deducted from the refund as a
          reshipment/return shipping fee.
        </p>

        <h2 className="text-xl font-semibold">
          Steps to Return a Purchased Product
        </h2>
        <ol className="list-decimal space-y-2 ps-6">
          <li>
            To initiate a return, please go to the return form and fill it out.
            Once we receive your form, we will contact you by email to confirm
            your request and guide you through the next steps.
          </li>
          <li>
            Securely pack the return, in the original packaging if possible, and
            include the full invoice.
          </li>
          <li>
            When your parcel is ready, the courier will collect it from your
            doorstep.
          </li>
          <li>
            Orders placed with “Store Pickup” must be returned in-store only;
            you won’t be able to create an online return request.
          </li>
        </ol>

        <div className="space-y-2">
          <p>
            If you have any comments, complaints, or inquiries, please contact
            our customer service team at: @alzainfashion.com
          </p>
          <p>
            Or reach us on WhatsApp at: +971 56 614 2600 from 10:00 AM to 12:00
            AM (GMT+3), 7 days a week.
          </p>
          <p>Terms and conditions apply.</p>
        </div>
      </section>
    </main>
  )
}
