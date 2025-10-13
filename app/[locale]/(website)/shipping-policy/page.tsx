export default function ShippingPolicyPage() {
  return (
    <main className="container mx-auto space-y-12 py-10 pt-38">
      <h1 className="text-center text-2xl font-bold lg:text-4xl ltr:hidden">
        سياسة الشحن والتوصيل
      </h1>
      <h2 className="text-center text-2xl font-bold lg:text-4xl rtl:hidden">
        Shipping & Delivery Policy
      </h2>

      {/* Arabic */}
      <section className="space-y-6 ltr:hidden">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            التوصيل داخل دولة الإمارات العربية المتحده
          </h2>
          <p>
            نقوم بالتوصيل داخل دولة الإمارات العربية المتحده. يمكنك اختيار إتمام
            عملية الدفع من خلال بطاقة الائتمان/الخصم.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">رسوم التوصيل</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">1 - التوصيل الفوري</h3>
            <p>
              يستغرق التوصيل الفوري من ربع ساعة إلى ساعتين وذلك بحسب المكان
              المطلوب التوصيل له داخل دولة الإمارات العربية المتحده، يتراوح سعر
              التوصيل من 50 درهم حتى 200 درهم، ولأجل خدمة التوصيل الفوري يجب
              الإتصال المباشر معنا عبر الرقم 00971505758362 أو 00971566142600
              لإعطاء كافة التفاصيل وتأكيد الطلب / أبوظبي على الرقم
              (00971506613848).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">2 - التوصيل العادي</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">المدينة</th>
                    <th className="border px-3 py-2">المنطقة</th>
                    <th className="border px-3 py-2">سعر التوصيل</th>
                    <th className="border px-3 py-2">مدة الشحن</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">الشارقة</td>
                    <td className="border px-3 py-2">
                      القاسمية - التعاون - القليعة - البطينة - النهدة - المجاز -
                      النباعة
                    </td>
                    <td className="border px-3 py-2">15 درهم</td>
                    <td className="border px-3 py-2">خلال 6 ساعات</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      المدينة الجامعية - مويلح - المدام ......
                    </td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">عجمان</td>
                    <td className="border px-3 py-2">عجمان</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">أم القوين</td>
                    <td className="border px-3 py-2">أم القوين</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">دبي</td>
                    <td className="border px-3 py-2">دبي</td>
                    <td className="border px-3 py-2">25 दरهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">الفجيرة</td>
                    <td className="border px-3 py-2">الفجيرة</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">رأس الخيمة</td>
                    <td className="border px-3 py-2">رأس الخيمة</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">العين</td>
                    <td className="border px-3 py-2">مركز مدينة العين</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      الفقع - الزهراء - القوع - الخزنة - الختم - أبو سمرا
                      .....{' '}
                    </td>
                    <td className="border px-3 py-2">40 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">أبوظبي</td>
                    <td className="border px-3 py-2">أبو ظبي المدينة</td>
                    <td className="border px-3 py-2">25 درهم</td>
                    <td className="border px-3 py-2">يوم عمل واحد</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      الغربية - الرويس - غياثي - بدع زايد - الظفرة - السلع -
                      مدينة زايد ...
                    </td>
                    <td className="border px-3 py-2">40 درهم</td>
                    <td className="border px-3 py-2">3 أيام عمل</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">الشحن الدولي</h2>
          <p>
            نقوم بالتوصيل إلى معظم البلدان حول العالم عن طريق (دى اتش ال) (عدى
            العراق ومصر). يتم احتساب تكلفة الشحن الدولي على أساس وزن إجمالي
            القطع التي يتم شحنها. سيتم عرض رسوم الشحن النهائية عند الخروج،
            لتتمكن من مراجعتها والموافقة عليها قبل تقديم الطلب، ولأجل التوصيل
            الدولي يجب التواصل معنا عبر الواتساب 00971505758362 – 00971566142600
            لإعطاء كافة التفاصيل وتأكيد الطلب.
          </p>
          <p>
            يرجى ملاحظة أنه في بعض البلدان يتم تطبيق الرسوم الجمركية على الشحنة.
            في مثل هذه الحالة، سيتم استيفاء هذه الرسوم من قبل المستلم.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">وقت التسليم التقريبي</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-3 py-2">الوجهة</th>
                  <th className="border px-3 py-2">شركة الشحن</th>
                  <th className="border px-3 py-2">تجهيز الطلب</th>
                  <th className="border px-3 py-2">مدة الشحن</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">عُمان</td>
                  <td className="border px-3 py-2">AL NAJM</td>
                  <td className="border px-3 py-2">يوم</td>
                  <td className="border px-3 py-2">يومين</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">الشرق الأوسط</td>
                  <td className="border px-3 py-2">Aramex, Elite</td>
                  <td className="border px-3 py-2">يومين</td>
                  <td className="border px-3 py-2">خمس أيام</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">أوروبا وآسيا</td>
                  <td className="border px-3 py-2">DHL</td>
                  <td className="border px-3 py-2">يومين</td>
                  <td className="border px-3 py-2">خمس أيام</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">الأمريكتين وأفريقيا</td>
                  <td className="border px-3 py-2">DHL</td>
                  <td className="border px-3 py-2">يومين</td>
                  <td className="border px-3 py-2">خمس أيام</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            ملاحظة: الأيام المذكورة هي أيام عمل، وبالتالي لا تشمل أيام السبت
            والأحد.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">جدير بالمعرفة</h2>
          <ul className="list-disc space-y-1 pr-6">
            <li>
              تعتبر الأطر الزمنية للتسليم تقريبية اعتمادًا على الانتقال السلس
              لطردك عبر الجمارك. لا يمكننا التنبؤ بالإجراءات الجمركية أو
              التأخيرات في بلدك أو تحمل المسؤولية عنها.
            </li>
            <li>
              تتطلب جميع الطلبات التوقيع عند الاستلام ولن تقوم شركة الشحن بتسليم
              الطرد الخاص بك دون توقيع.
            </li>
            <li>
              يمكن أن تحدث تأخيرات أيضًا بسبب عدم توفرك للتوقيع على الحزمة
              الخاصة بك.
            </li>
            <li>
              لا يمكننا إعادة توجيه أي شحنات بمجرد مغادرتها مستودعاتنا. لذا،
              يرجى التأكد من تواجدك أنت أو أي شخص مفوض من قبلك على العنوان الذي
              تحدده في تفاصيل شحن طلبك.
            </li>
            <li>
              يتم تأمين جميع الشحنات من قبل واحة الزين حتى تصل إلى عنوان التسليم
              الخاص بك، وتقوم أنت - أو ممثلك - بالتوقيع على استلامها، مما ينقل
              تلقائيًا كافة المسؤولية عن الطرد إليك أو إلى ممثلك.
            </li>
            <li>
              يتم فرض رسوم التوصيل على جميع المشتريات (DDP)، وبالتالي فإن سعر
              الشراء النهائي سيتضمن رسوم الشحن والضريبة.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">عند الاستلام</h2>
          <p>
            عند استلام أي طلب، يجب عليك التأكد من عدم العبث به أو فتحه قبل
            التوقيع. في حالة أن الصندوق مفتوح أو في حالة سيئة، يحق لك معاينة
            محتويات الصندوق، وتسوية أي اختلافات مع الفاتورة المضمنة داخل الطرد.
            يجب عليك عدم التوقيع على الطرد مع ملاحظة أي تناقضات مع الشاحن الخاص
            بنا وإبلاغنا بذلك عبر البريد الإلكتروني على @alzainfashion.com أو
            على رقم WhatsApp الخاص بنا 00971566142600 / 00971505758362.
          </p>
        </div>
      </section>

      {/* English */}
      <section className="space-y-6 rtl:hidden">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            Domestic Delivery within the UAE
          </h2>
          <p>
            We deliver across the United Arab Emirates. You can complete payment
            by credit/debit card.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Delivery Fees</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">1 - Express Delivery</h3>
            <p>
              Express delivery takes approximately 15 minutes to 2 hours
              depending on the destination within the UAE. Fees range from AED
              50 to AED 200. For express service, please contact us directly at
              00971505758362 or 00971566142600 to provide details and confirm
              your order. For Abu Dhabi, please call (00971506613848).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">2 - Standard Delivery</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">City</th>
                    <th className="border px-3 py-2">Area</th>
                    <th className="border px-3 py-2">Fee</th>
                    <th className="border px-3 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Sharjah</td>
                    <td className="border px-3 py-2">
                      Al Qasimia, Al Taawun, Al Qulayaah, Al Butina, Al Nahda,
                      Al Majaz, Al Nabba
                    </td>
                    <td className="border px-3 py-2">AED 15</td>
                    <td className="border px-3 py-2">Within 6 hours</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      University City, Muwailih, Al Madam ......
                    </td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Ajman</td>
                    <td className="border px-3 py-2">Ajman</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Umm Al Quwain</td>
                    <td className="border px-3 py-2">Umm Al Quwain</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Dubai</td>
                    <td className="border px-3 py-2">Dubai</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Fujairah</td>
                    <td className="border px-3 py-2">Fujairah</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Ras Al Khaimah</td>
                    <td className="border px-3 py-2">Ras Al Khaimah</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Al Ain</td>
                    <td className="border px-3 py-2">Al Ain city center</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      Al Faqa, Al Zahra, Al Qua, Al Khazna, Al Khattam, Abu
                      Samra .....{' '}
                    </td>
                    <td className="border px-3 py-2">AED 40</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Abu Dhabi</td>
                    <td className="border px-3 py-2">Abu Dhabi City</td>
                    <td className="border px-3 py-2">AED 25</td>
                    <td className="border px-3 py-2">1 business day</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      Al Gharbia, Al Ruwais, Ghayathi, Bida Zayed, Al Dhafra, Al
                      Sila, Madinat Zayed ...
                    </td>
                    <td className="border px-3 py-2">AED 40</td>
                    <td className="border px-3 py-2">3 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">International Shipping</h2>
          <p>
            We ship to most countries worldwide via DHL (excluding Iraq and
            Egypt). International shipping costs are calculated based on the
            total weight of the items shipped. Final charges will be shown at
            checkout for your review and approval before placing the order. For
            international delivery, please contact us on WhatsApp at
            00971505758362 or 00971566142600 to provide details and confirm your
            order.
          </p>
          <p>
            Please note that customs duties may apply in some countries and will
            be collected from the recipient if applicable.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Approximate Delivery Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-3 py-2">Destination</th>
                  <th className="border px-3 py-2">Carrier</th>
                  <th className="border px-3 py-2">Processing</th>
                  <th className="border px-3 py-2">Transit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Oman</td>
                  <td className="border px-3 py-2">AL NAJM</td>
                  <td className="border px-3 py-2">1 day</td>
                  <td className="border px-3 py-2">2 days</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Middle East</td>
                  <td className="border px-3 py-2">Aramex, Elite</td>
                  <td className="border px-3 py-2">2 days</td>
                  <td className="border px-3 py-2">5 days</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Europe & Asia</td>
                  <td className="border px-3 py-2">DHL</td>
                  <td className="border px-3 py-2">2 days</td>
                  <td className="border px-3 py-2">5 days</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Americas & Africa</td>
                  <td className="border px-3 py-2">DHL</td>
                  <td className="border px-3 py-2">2 days</td>
                  <td className="border px-3 py-2">5 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Note: Days listed are business days and exclude Saturday and Sunday.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Good to Know</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Delivery time frames are approximate and depend on smooth customs
              clearance. We cannot predict or be responsible for customs
              procedures or delays in your country.
            </li>
            <li>
              All orders require a signature on delivery; couriers will not
              deliver without one.
            </li>
            <li>
              Delays may also occur if you are unavailable to sign for your
              package.
            </li>
            <li>
              We cannot re-route shipments once they leave our warehouses.
              Ensure you or an authorized person is available at the shipping
              address provided in your order details.
            </li>
            <li>
              All shipments are insured by Wahat Al Zain until they reach your
              delivery address and are signed for by you or your representative,
              after which responsibility transfers to you.
            </li>
            <li>
              All purchases are Delivered Duty Paid (DDP); final price includes
              shipping and tax.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Upon Receipt</h2>
          <p>
            Upon receiving any order, ensure it has not been tampered with or
            opened before signing. If the box is open or in poor condition, you
            have the right to inspect the contents and reconcile any
            discrepancies with the invoice inside. Do not sign for the parcel
            while noting discrepancies with our shipper; instead, inform us at
            @alzainfashion.com or via WhatsApp at 00971566142600 /
            00971505758362.
          </p>
        </div>
      </section>
    </main>
  )
}
