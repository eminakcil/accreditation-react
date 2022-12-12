import Divider from '@components/Divider'
import React from 'react'
import Collapsable from './components/Collapsable'

const Accreditation = () => {
  const prep = (list, indent = 0) => {
    return list.map((item) => {
      if ('children' in item) {
        item.children = prep(item.children, indent + 1)
      }

      return { ...item, indent }
    })
  }

  const list = prep([
    {
      name: 'Temel Yeterlilikler',
      children: [
        {
          no: '1.1.',
          name: 'Yönetim ve Borsa Mevzuatı',
          children: [
            {
              no: '1.1.1.',
              name: 'Vizyon ve açıkça tanımlanmış Misyon beyanının hazırlandığını, (Misyon Ve Vizyon Beyanları)',
              proofList: [
                {
                  title: 'Eğitim Vermek',
                },
              ],
            },
            {
              no: '1.1.2.',
              name: '5174 sayılı Türkiye Odalar ve Borsalar Birliği ile Odalar ve Borsalar Kanunu, ilgili tüm yönetmelikler ve tüzüklere uygunluğun sağlandığını, ortaya koyabilmeli(Meclis ve Meslek Komiteleri bilgi ve toplantı Tutanakları )',
              proofList: [
                {
                  title: 'Personel Kapasitesini Arttırmak',
                },
              ],
            },
            {
              no: '1.1.3.',
              name: 'Yönetim Kurulunun stratejik hedefleri belirlediğini, yatırım politakasına karar verdiğini, performans kriterlerini kabul ettiğini, söz konusu politikanın detaylı planlaması ve uygulanması görevini idari kadroya devrettiğini, (Stratejik Plan çalışmalarında Yönetim Kurulunun yer alması, vizyon, amaç, hedefler ve stratejilerin oluşturulmasındaki katkılarıa dair kanıtlar)',
            },
            {
              no: '1.1.4.',
              name: 'Yönetim Kurulunun, düzenli faaliyet raporları ve plan, bütçe tahmin raporları gibi Kurula rapor verme yükümlülüğünü idari kadroya vererek, ölçüm ve faaliyetlerini kontrol ederek, faaliyetlerinden sorumlu tutarak politikaları ve hedeflerin başarılma durumlarını takip ettiğini, (Akreditasyon izleme Komitesi işleyişi, toplantı tutanakları,yıllık iş planları gerçekleşme takibine ilişkin kanıtlar)',
            },
            {
              no: '1.1.5.',
              name: 'Yönetim Kurulunun Genel Sekreteri istihdam etmekten ve performans yönetiminden sorumluluğu',
            },
            {
              no: '1.1.6.',
              name: 'Stratejik hedeflerine ulaşması için yeterli yönetim kontrollori olduğunu, (Stratejik amaç ve hedeflerin gerçekleşme durumunu ortaya koyan sistem/ yöntem)',
            },
            {
              no: '1.1.7.',
              name: 'Büyüklük ve amaçlarına uygun ve anlaşılır organizasyon yapısına sahip olması ',
            },
            {
              no: '1.1.8.',
              name: 'Yönetim Kurulu toplantılarının yapıldığını ve toplantı tutanaklarının bir dosyada tutulduğunu, (Kurul toplantılarının tutanakları,karar takip sistemi,katılım oranları)',
            },
            {
              no: '1.1.9.',
              name: 'Tüm Kurul üyeleri için oryantasyon sürecinin olduğunu ortaya koyabilmelidir.[Oryantasyon Programı (YK, Meclis, Meslek Komitesi üyeleri için hazırlanan), Gelişim Programı (Toplantı, eğitim vb.), Yöneticilerin El Kitabı (YK, Meclis, Meslek Komitesi üyeleri için hazırlanan iş yönergeleri), Meclis, Yönetim Kurulu ve Komite oryantasyon materyalleri.]',
            },
          ],
        },
        {
          no: '1.2.',
          name: 'Mali Yönetim',
          children: [
            {
              no: '1.2.1.',
              name: 'Borç ve yükümlülüklerini yerine getirmelerini ve çalışma planında yer alan hususları yerine getirmelerini sağlayacak yeterli kaynakların olduğunu, (Yıllık iş planını destekleyici bütçe yapısı, geçmiş yıllara ait yıllık iş planı bütçesel gerçekleşme oranı,gelecek yıla ait iş planı bütçe planlaması kanıtları cari yıla ait nakit akış tahmini)',
            },
            {
              no: '1.2.2.',
              name: 'Oda/borsaların Yönetim Kurulları ve Meclisleri tarafından onaylanan kapsamlı bir yıllık işletme bütçesinin bulunduğunu, (Oda/borsanın cari yıla ait detaylı bütçesi)',
            },
            {
              no: '1.2.3.',
              name: 'Mali beyanların ve yönetim hesaplarının tutulduğunu, (Geçen yıla ait mali rapor, Cari yıla ait nakit akış gerçekleşme tabloları)',
            },
            {
              no: '1.2.4.',
              name: 'Meclis ve Yönetim Kurulunun en az ayda bir tüm mali beyanları gözden geçirdiğini,',
            },
            {
              no: '1.2.5.',
              name: 'Yönetim Kurulunca onaylanan mali strateji gereklerini karşılayan Mali Politikalara ve Kontrollore uyduğunu, (Oda/borsanın mali politikası (Harcama yetkilileri, fon yönetimi bütçe talimatlı risk yönetimi vb kayıtlar)',
            },
            {
              no: '1.2.6.',
              name: 'Mali planlama ilkelerine uygun olarak faaliyet gösterdiğini, ( Mali Politikaya uygunluğu destekleyecek kanıtlar)',
            },
            {
              no: '1.2.7.',
              name: 'Menkul kıymetlerin korunması ve idari etkinliğin artırılmasl için yeterli kontrollori gerçekleştirdiğini, (Hesapları İnceleme Komisyonu niteliği,yetkinliği ve raporları)',
            },
            {
              no: '1.2.8.',
              name: 'Gerektiği hallerde Yönetim Kurulu, Finans ve Denetim alt grupları ya da ilgili komiteler kurulduğunu, düzenli olarak toplanmalarının sağlanabildiğini ve söz konusu grup ya da komiteler doğrudan Yönetim organlarına raporlama yapabileceğini ortaya koyabilmelidir. (Hesapları inceleme Komisyonu raporları, üst düzey mali idarecilerin görev tanımı/görev şartnameleri)',
            },
          ],
        },
        {
          no: '1.3.',
          name: 'İnsan Kaynakları Yönetimi',
          children: [
            {
              name: 'Uygun, hakkaniyetli ve yasalara uygun politikaları bulunduğunu, (Uygulamalarla desteklenmiş politika, Oda/Borsa İç Yönergesi)',
              no: '1.3.1.',
            },
            {
              name: 'Profesyonel, kalifiye ve yetenekli kişiler istihdam edildiğini, (Tanımlanmış işe alma yöntemi, Oda/Borsa İç Yönergesi, görev tanımları, yetkinlikleri vb., oryantasyon uygulaması)',
              no: '1.3.2.',
            },
            {
              name: 'Personel görüşlerinin farkındadır ve gerekmesi halinde harekete geçmektedir.(Personel geri bildirimleri,değerlendirme yöntemi ve iyileştirmeler) ',
              no: '1.3.3.',
            },
            {
              name: 'Personelle etkin ve düzenli bir iletişim bulunmaktadır.(Personelle düzenli iletişim yöntem ve kanıtları)',
              no: '1.3.4.',
            },
            {
              name: 'Personelin görevini etkin biçimde yapılabilmesini temin etmek amacıyla uygun ve güncel eğitim, gelişim imkanlarına sahiptir. (Personel eğitim ve gelişim uygulamaları)',
              no: '1.3.5.',
            },
            {
              name: 'Hedefler ve amaçlar çalışma planıyla açıkça bağlantılıdır. (Yıllık iş planı,birim hedefleri)',
              no: '1.3.6.',
            },
            {
              name: 'Üyelere hizmet verme üzerinde olumlu etki yapması için eğitim ve gelişim faaliyetleri değerlendirilmektedir. (Üye ile iletişimi geliştirmeye yönelik davranışsal gelişim eğitimleri ve etkinlik değerlendirmesi)',
              no: '1.3.7.',
            },
            {
              name: 'Kendi performanslarını benzer Oda/Borsalarla kıyaslayarak çalışanlarını değerlendirmekte ve gerekmesi halinde uygun biçimde tedbirler almaktadır.(Raporlar)',
              no: '1.3.8.',
            },
            {
              name: 'Etkin bir performans ölçüm ve geliştirme sunan Performans Yönetim Sistemi bulunmaktadır. Tanımlanmış bir performans değerlendirme yöntemi, Performans değerlendirme çıktıları, çıktılara ilişkin aksiyonlar)',
              no: '1.3.9',
            },
          ],
        },
        {
          no: '1.4.',
          name: 'İş Planlaması ve Yönetimi',
          children: [
            {
              no: '1.4.1.',
              name: 'Yönetim Kurulu tarafından onaylanan kapsamlı yıllık çalışma planını,(Stratejik plandan üretilmiş yıllık iş planı)',
            },
            {
              no: '1.4.2.',
              name: 'Yönetim Kurulu Tarafından geliştirilen ve onaylanan en az dört yıllık stratejik planını,',
            },
            {
              no: '1.4.3.',
              name: 'Çalışma hedeflerinin Yönetim Kurulu tarafından düzenli olarak ölçülmekte ve gözden geçirilmekte olduğunu, (Performans izleme kayıtları, Akreditasyon İzleme Komitesi kayıtları, en son yapılan güçlü/zayıf yönler, fırsatlar ve tehditler(SWOT) analizi)',
            },
            {
              no: '1.4.4.',
              name: 'Stratejik öncelikler geliştirmek ve uygulamak için uygun kaynaklarının olduğunu,(Kaynak Planıama Süreçleri, bütçe kayıtları)',
            },
            {
              no: '1.4.5.',
              name: 'Düzenli araştırma ve diğer yetkin yöntemlar kullanılarak personel/üye geri bildirimlerinin alınmakta olduğunu ve sonuçlara göre eylem yapmak suretiyle söz konusu geri bildirimlerin takip edildiğini,(üyeden elde edilen geri bildirim sonuçları nasıl kullanılıyor,iş planını etkiliyor mu)',
            },
            {
              no: '1.4.6.',
              name: 'İş hedeflerine ulaşmak için hizmetlerin kapsam, derinlik ve yönetimine karar verilmesine yönelik açık stratejilerinin varlığını, (Stratejik hedeflere ulaşılmasını sağlayacak açıkça tanımlanmış stratejiler ve faaliyetler)',
            },
            {
              no: '1.4.7.',
              name: 'Üyelere yıllık rapor sunulduğunu ortaya koyabilmelidir. (yıllık iş planı ile uyumlu olan yıllık faaliyet raporu)',
            },
          ],
        },
        {
          no: '1.5.',
          name: 'Haberleşme ve Yayınlar',
          children: [
            {
              no: '1.5.1.',
              name: 'Oda/borsa iş planı hedeflerine ulaşmak için dataylı haberleşma stratejisi, uygulama planı ve politikası olduğunu,',
            },
            {
              no: '1.5.2.',
              name: 'Kendisinin, politikalarının, hizmetlerinin ve faaliyetlerinin tanıtımı için medyanın kapsamlı biçimde kullanıldığını, (Basın Açıklamaları,medyada yer alan haber kayıtları,sosyal medya kullanımı)',
            },
            {
              no: '1.5.3.',
              name: 'Yerel basın ve medya ile etkili bir iletişim içerisinde olduğunu,',
            },
            {
              no: '1.5.4.',
              name: 'Yerel medya ve besin için yazılı ve görsel medyada yayınlanmak üzere basın bültenleri oluşturduğunu,',
            },
            {
              no: '1.5.5.',
              name: 'Oda/Borsa, Yönetim Kurulu, Meslek Komiteleri, personel ve üyeleri hakkında kapsamlı bilgiler vermenin yanı sıra üyelerine yararlı bilgiler sunan, düzenli olarak güncellenen, yabancı dil destekli bir web sitesi bulunduğunu,(Dinamik Web Sitesi, Yabancı dil destekli, sorgulanabilir, güncel üye veri tabanı)',
            },
            {
              no: '1.5.6.',
              name: 'Bu konuda yetenekli ve eğitimli personel istihdam ettiğini ya da uygun harici hizmet sağlayıcılar kullandığını, (Personel görevlendirme kararı vb.)',
            },
            {
              no: '1.5.7.',
              name: 'Tüm iletişim faaliyetlerinin etkinliliğini değerlendirildiğini,(Yıllık Rapor İletişim faaliyetlerinin tamamına yönelik kullanım ve geri bildirim raporları ve istatistikler)',
            },
            {
              no: '1.5.8.',
              name: 'Tercih ettikleri iletişim yöntemi konusunda üyelerine danıştığını ortaya koyabilmelidir.(Üye anketi)',
            },
          ],
        },
        {
          no: '1.6.',
          name: 'Bilgi ve İletişim Teknolojileri Kullanımı',
          children: [
            {
              no: '1.6.1.',
              name: 'Kapsamlı yönetim bilgileri ve raporları hazırlanması dahil tüm kilit ofis fonksiyonlarını yerine getiren bilgi, İletişim sistemleri ve yazılımlarının olduğunu,(Amaca uygun donanım ve yazılım)',
            },
            {
              no: '1.6.2.',
              name: 'Üyelere ait dateyları, faaliyet geçmişlerini ve ilişkilerini içeren sağlam bir raporlama fonksiyonuna sahip güncel "Üye Yönetim Sistemi"nin var olduğunu,(Üye Yönetim Sistemi)',
            },
            {
              no: '1.6.3.',
              name: 'İnteraktif uygulamaların bulunduğu fonksiyonel bir web sitesine sahip olduğunu, (Fonksiyonel web sitesi)',
            },
            {
              no: '1.6.4.',
              name: 'Risk değerlendirmeyi de içeren Bilgi ve İletişim Teknolojileri planı, yedeklendirme ve acil durum planı mevcut olduğunu, (Yedekleme ve acil durum planı ve tatbikat çıktıları, Risk Değerlendirme)',
            },
            {
              no: '1.6.5.',
              name: 'Yerinde güncelleme ve gözden geçirme mekanızmalarıyla birlikte Bilgi ve İletişim Teknolojileri politikaları, prosedürleri ve protokollori mevcut olduğunu, (Bilgi ve İletişim Teknolojisi Planları, Politikaları ve Prosedürleri, bakım yenileme planları, program kullanım yeterlilikleri ve sorumlulukları)',
            },
            {
              no: '1.6.6.',
              name: 'Bu konuda yetkin ve eğitimli personelinin olduğunu, ortaya koyabilmelidir. (Eğitim Kayıtları, Görev Tanımları ve Yetkinlikler) ',
            },
          ],
        },
        {
          no: '1.7.',
          name: 'Üye İlişkileri',
          children: [
            {
              no: '1.7.1.',
              name: 'Üyeleriyle başarılı ilişkiler kurduğunu,(Toplantı ve etkinlikler,katılımı arttırıcı faaliyetler)',
            },
            {
              no: '1.7.2.',
              name: 'İlk temas noktasında üye ihtiyaçları tanımladığını,',
            },
            {
              no: '1.7.3.',
              name: 'Üyelerin oda/borsayla irtibat kurmak suretiyle, kendi alanlarındaki iş destek hizmetleri yelpazesine tam erişim sağlayabildiğini,(Üyelerin geri bildirimleri ile uyumlu iş destek hizmetleri)',
            },
            {
              no: '1.7.4.',
              name: 'Üyelerin kendilerine sunulan hizmetten ne beklediklerini açıklayan amaç ve hedeflerin belirlendiğini,(Geri Bildirimlerin sonuçlarının değerlendirilmesi)',
            },
            {
              no: '1.7.5.',
              name: 'Üye ihtiyaçlarının düzenli ve sürekli olarak gözden geçirildiğini,(beklenti anketleri, öneriler)',
            },
            {
              no: '1.7.6.',
              name: 'Üye bilgilerinin planlı bir şekilde gözden geçirilerek güncelliğinin sağlandığını,(Güncelleme yöntemleri) ',
            },
            {
              no: '1.7.7.',
              name: 'Uygulanabildiğinde üyelere herhangi bir hizmet verilmesinin ardından takip yaptığını,(Üye referansları ve başarı hikayeleri, Üye memnuniyet ve hizmet kullanım seviyelerini gözden geçirme ve izleme mekanizması)',
            },
            {
              no: '1.7.8.',
              name: 'Üye şikayetlerinin her zaman takip edildiğini ve uygun biçimde çözüme kavuşturulduğunu,(Şikayet Yönetim Sistemi) ',
            },
            {
              no: '1.7.9.',
              name: 'Sürekli ilerleme sayesinde oda/borsanın deneyimlerden ders çıkardığını ve sonuç olarak hizmetlerini geliştirdiğini ortaya koyabilme yeteneğinin olduğunu göstermelidir.(Üye Geri Beslemeleri ile uyumlu faaliyetler)',
            },
          ],
        },
        {
          no: '1.8.',
          name: 'Kalite',
          children: [
            {
              no: '1.8.1.',
              name: 'Hizmet sunumunu destekleyici öncelikleri tanımlayabildiğini,(Akreditasyon sistemini destekleyen oda/borsa ölçeğine uygun/uyumlu süreç ve dokümantasyon yapısı)',
            },
            {
              no: '1.8.2.',
              name: 'Kaliteyi destekleyici yönetim yapısını,(Yönetim Kurulunun kalite sürecine katılımı)',
            },
            {
              no: '1.8.3.',
              name: 'İş performans ve etki değerlendirmesi yaptığını,(Yapılan iç/dış denetim geliştirme ziyareti, kayıtları ve bunlara ait değerlendirme kayıtları, diğer oda/borsalarla kıyaslama, süreç izleme ve ölçme kayıtları)',
            },
            {
              no: '1.8.4.',
              name: 'Performans sonuçlarından elde edilen bilgileri oda/borsa performansını geliştirmek için kullandığını ortaya koyabilmelidir.(Düzeltici faaliyet kayıtları ve iyileştirme faaliyetleri)',
            },
          ],
        },
      ],
    },
    {
      name: 'Temel Hizmetler',
      children: [
        {
          no: '2.1.',
          name: 'İletişim Ağı',
          children: [
            {
              no: '2.1.1.',
              name: 'İletişim ağı hizmetlerinden faydalanmayla ilgili bilgileri analiz edebildiğini,(üyelerin aldığı hizmetlerin izlenebilirliği ve analizi, üye anketleri)',
            },
            {
              no: '2.1.2.',
              name: 'Uluslararası ticaret, kaynak tedariki, ortak girişim ve politika oluşturma gibi üyelerin ihtiyaçlarını yansıtan ve tanımlı ihtiyaçları karşılama bakımından etkinlik değerlendirmesi yapılan faaliyetleri desteklemeye yönelik iletişim ağı faaliyetleri yıllık programını,(İletişim ağını geliştirmeye yönelik etkinlik takvimi)',
            },
            {
              no: '2.1.3.',
              name: 'Tüm oda/borsa faaliyetleri düşünülerek üyelerin ihtiyaçlarını, beklentilerini ve tatmin seviyelerini tanımlayan düzenli üye anketini,(Üye anketleri ve anket sonucundaki gelişimsel değişikler)',
            },
            {
              no: '2.1.4.',
              name: 'İş topluluğunun yararına olan ürün ve hizmetler portföyünü,(Ekonomik araştırmalar, bölgesel ve yerel raporlar, istatistikler)',
            },
            {
              no: '2.1.5.',
              name: 'İyi uygulamaları bölgesel ve ulusal oda/borsa iletişim ağı gruplarında paylaştığını ortaya koyabilmelidir.(İyi uygulamaları paylaştığına dair kanıtlar)',
            },
          ],
        },
        {
          no: '2.2.',
          name: 'Politika ve Temsil',
          children: [
            {
              no: '2.2.1.',
              name: 'Üyelerinin öncelikli konularını düzenli olarak tanımlamaya ve bunları karar alıcılara ve paydaşlara iletmeye yönelik bir işlemi olduğunu, (Tanımlanmış görüş oluşturma yöntemi)',
            },
            {
              no: '2.2.2.',
              name: 'Politika konularını koordine etmek için atanmış ve yeterli deneyime sahip personeli olduğunu, ',
            },
            {
              no: '2.2.3.',
              name: 'Ortak çözüm gruplarına katılımı teşvik ederek üyelerin ilgi ve uzmanlık alanlarını tanımlamaya yönelik bir işlemi olduğunu, (Ortak çözüm grupları, politika forumları ve meslek komitelerine dair detaylar)',
            },
            {
              no: '2.2.4.',
              name: "En yüksek geri bildirimi almak için; sektörel ilgi grupları oluşturduğunu, forumlar ve anketlar yaptığını; üyeleri ile birlikte TOBB'un ulusal/bölgesel anketlerine ve istişarelerine aktif katılımını,",
            },
            {
              no: '2.2.5.',
              name: "Ulusal profil ve medya faaliyetlerinin desteklenmesine yönelik etkinlik çalışmaları için TOBB'dan gelen taleplere anında cevap verebildiğini,(TOBB'un öncülük etmek istediği lobi faaliyetlerinde geri bildirim örnekleri)",
            },
            {
              no: '2.2.6.',
              name: 'Üyelere kilit karar alıcılar ve etki sahipleriyle yüz yüze görüşme ve tanımlı öncelikli konuları müzakere etme fırsatı verdiğini,(üyelerin görüşlerini almak ve üyelerle, karar alıcılarla politika konularında iletişim kurmak üzere web tabanlı teknolojilerin kullanımı, politikacı ve yetkililerle yapılan iletişim ve ilişkilere dair kanıtlar, Politika ve temsil faaliyetlerine üyelerin katılımını izlemeye yönelik yöntemler )',
            },
            {
              no: '2.2.7.',
              name: 'Politika ve temsil faaliyetine odaklanan ve yürüten bir üye temsilci organı olduğunu,(Lobi faaliyetlerinin başarı ve etkilerini ölçmeye ve gözden geçirmeye yönelik bir değerlendirme sistemi)',
            },
            {
              no: '2.2.8.',
              name: 'Yerel, bölgesel, ulusal ve uluslarası düzeyde kilit karar alıcılar ve paydaşlar için tanımlanmış ve uygun iletişim/etkileme stratejisi geliştirdiğini,(Politikacı ve yetkililerle yapılan iletişim ve ilişkilere dair kanıtlar)',
            },
            {
              no: '2.2.9.',
              name: 'Yerel, bölgesel ve ulusal düzeyde politikacılar, üst düzey memurlar ve yetkilerle doğrudan ilişkiler ve düzenli iletişimi olduğunu,(Uluslararası kurumlarla olan iş ilişkilerinin güçlendirilmesi, Politikacı ve yetkililerle yapılan iletişim ve ilişkilere dair kanıtlar)',
            },
            {
              no: '2.2.10.',
              name: 'Üyeler adına konuların takibini yaptığını,(Lobi faaliyetlerinin başarı ve etkilerini ölçmeye, gözden geçirmeye yönelik bir değerlendirme sistemi)',
            },
            {
              no: '2.2.11.',
              name: 'Yerel, bölgesel ve ulusal düzeyde üyelerin görüş ve isteklerini medyada temsil ettiğini,(Gazete kupürü örnekleri ve yazılı ve görsel medyada görünme hacimleri)',
            },
            {
              no: '2.2.12.',
              name: 'Politika kararlarını bildirmek ve lobicilik, temsil faaliyetini güçlendirmek için araştırma yapttğını ve delil topladığını,(Araştırma programı ve sonuçları)',
            },
            {
              no: '2.2.13.',
              name: "Üyelerin seslerinin bölgesel ve ulusal düzeyde daha etkili duyulmasını sağlamaya yönelik bölgesel ve ulusal yapılar oluşturmak üzere diğer oda ve borsalarla işbirliği içinde olduğunu ortaya koyabilmelidir.(TOBB'un yerel ve bölgesel faaliyetlerine katılım, Ortak çözüm grupları politika forumları ve dair detaylar, Diğer oda/borsalarla ve katma değer sağlayan diğer organlarla ortak lobi çalışmaları)",
            },
          ],
        },
        {
          no: '2.3.',
          name: 'Bilgi, Danışmanlık ve Destek',
          children: [
            {
              no: '2.3.1.',
              name: 'Üyelerin bilgi ihtiyaçlarının tanımlandığını ve çeşitli faaliyetlerle desteklendiğini,(Üyelerin ihtiyaç duyduğu bilgilerin tanımlanması, bu taleplerin karşılanmasına yönelik danışmanlık,proje yazılım desteği,raporlama gibi faaliyetler)',
            },
            {
              no: '2.3.2.',
              name: 'Yaygın iç ve dış bilgi kaynakları yelpazesine erişim sağlandığını,(Abonelikler, linkler)',
            },
            {
              no: '2.3.3.',
              name: 'Yerel ekonomik teşvikler, istatistikler, iş geliştirme yardımları hakkında kapsamlı bilgi sahibi olduğunu,(Ekonomik istatistikler, araştırma raporları,teşviklerle ilgili bilgilendirme)',
            },
            {
              no: '2.3.4.',
              name: 'Nitelikli bilgi ve iş destek çözümleri sunmayı destekleyen Bilgi ve İletişim Teknolojileri altyapısının olduğunu,(Nitelikli bilgiye ulaşım kolaylığı sağlayan bir altyapı)',
            },
            {
              no: '2.3.5.',
              name: 'Bilgi destek ağının sunduğu hizmetlerdeki değişikliklerden ilgili personeli haberdar ettiğini,(Dış kaynaklı dokümanların takibi ve kurum içi bilgi paylaşımı) ',
            },
          ],
        },
        {
          no: '2.4.',
          name: 'İş Geliştirme ve Eğitim',
          children: [
            {
              no: '2.4.1.',
              name: 'İş geliştirme eğitimi ve geliştirme ihtiyaç ve talebini öğrenmek için daha geniş iş çevrelerinde ve üyeler arasında düzenli anketler yaptığını,(Üye ihtiyaç analizleri, iş çevresi beklenti anketleri)',
            },
            {
              no: '2.4.2.',
              name: 'Hizmet sunumundaki boşlukların dolayısıyla da fırsatların tanımlanabilmesi için piyasa analizleri olduğunu,(Piyasa analizi sonuçları)',
            },
            {
              no: '2.4.3.',
              name: 'İş planı hedeflerini karşılayacak şekilde kapsamlı faaliyet planını,(Üyelere yönelik oluşturulmuş faaliyet/eğitim/iletişim programı)',
            },
            {
              no: '2.4.4.',
              name: 'İş geliştirme amaçlı verilen eğitimlerin etkinlik analizleri yapılarak sonuçlarının değerlendirildiğini,(Eğitim Değerlendirme anket sonuçları)',
            },
            {
              no: '2.4.5.',
              name: 'Temsilcilerin ve katılımcıların ihtiyaçlarına cevap verebilecek ve konuya uygun kaliteli bir öğrenme ortamı olduğunu,(Eğitim imkanları)',
            },
            {
              no: '2.4.6.',
              name: 'Eğitim ve geliştirme hizmetleri işlemlerini ve tanımlı etkin biçimde yönetilmesini sağlamak için yeterli yönetim kaynağı bulunduğunu, ortaya koyabilmalidir. (Personel/Hizmet sağlayıcı geliştirme planları)',
            },
          ],
        },
        {
          no: '2.5.',
          name: 'Uluslararası Ticaret',
          extras: '(Sadece Odalar için geçerlidir.)',
          children: [
            {
              no: '2.5.1',
              name: 'Ulusal, bölgesel ve uluslararası Ticaret faaliyetlerine aktif katılım ve küresel ticaret hakkında geniş bilgiyi,(Dış Pazar ziyaretleri ve faaliyet raporları)',
            },
            {
              no: '2.5.2',
              name: 'Üyelerin uluslararası ticaret gerekliliklerini iyi biçimde tanımlayan ve istikrarlı biçimde bunlara cevap veren işlemleri,(Anket raporları, Dış- İç piyasa talep ve ihtiyaçları)',
            },
            {
              no: '2.5.3',
              name: 'Yerel, bölgesel ve ulusal ihracat teşvikleri konusunda geniş bilgiyi,(İhracat teşviklerine yönelik eğitim programları, bilgilendirme ve seminerler) ',
            },
            {
              no: '2.5.4',
              name: 'Yerel ihracatları ve ihracat potansiyeli bulunanları tanıdığını,(Mevcut ve potansiyel ihracatçı listesi)',
            },
            {
              no: '2.5.5',
              name: 'Uluslararası piyasalar ve odalar/borsalar ile bağlantıları, ',
            },
            {
              no: '2.5.6',
              name: "Yeni piyasa potansiyallerinin değerlendirildiğini, ihracat olanaklarının teşhis edildiğini, ihracat planları ve piyasaya giriş stratejilerinin oluşturulduğunu,(Üyelere Türkiye'de ve yurtdışında potansiyel işbirliği yapabilecek ortaklarının tanıtımı, Dış Pazar ziyaretleri ve faaliyet raporları)",
            },
            {
              no: '2.5.7',
              name: "Ticaret ve yatırım imkanlarını tanımlayabildağini ve tavsiye edebildiğini, (Üyelere Türkiye'de ve yurtdışında potansiyel işbirliği yapabilecek ortaklarının tanıtımı, Piyasa analizi)",
            },
            {
              no: '2.5.8',
              name: 'Piyasaya özel ticaret bilgileriyle destek verdiğini,(il/ilçenin ekonomik hayatı ile ilgili bilgiler)',
            },
            {
              no: '2.5.9',
              name: 'Yerel iş alemine döküman ve sertifikasyon sunma yetkisini,(uluslararası ticaret belgeleri)',
            },
            {
              no: '2.5.10',
              name: 'Nitelikli uluslararası piyasa araştırma raporları sunduğunu,(sektörel ve ülke potansiyeli raporları)',
            },
            {
              no: '2.5.11',
              name: 'Dış Ticaret geliştirme aktivileri programına katılımını,(Dış Pazar ziyaretleri ve faaliyet raporları)',
            },
            {
              no: '2.5.12',
              name: 'Sektörler, ülkeler, ekonomiler hakkında uzman bilgisini,(ihtiyaç olduğu hallerde Dış ticaret uzmanı)',
            },
            {
              no: '2.5.13',
              name: 'Uzmanların ve kurumların sunduğu geniş programlara katılımını,(Seminer ve eğitim programları)',
            },
            {
              no: '2.5.14',
              name: 'Üyelerin ihracat potansiyallerini analiz etmede ve yeni piyasaların gelişmesinde yardımcı olmada yetkin deneyimli ve kalifiye uluslararası ticaret ekibinin olduğunu ortaya koyabilmelidir.',
            },
          ],
        },
        {
          no: '2.6.',
          name: 'Borsacılık Faaliyetleri',
          extras: '(Sadece Borsalar için geçerlidir.)',
        },
      ],
    },
  ])

  return (
    <>
      <div className="space-y-3">
        <Divider thin />
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl">TOBB ODA/BORSA AKREDİTASYON STANDARDI</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-3">
          {list.map((item, index) => (
            <Collapsable
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Accreditation
