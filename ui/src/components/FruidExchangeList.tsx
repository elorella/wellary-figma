import { Sidebar } from "./Sidebar";
import { Card } from "./ui/card";
import { ProfileDropdown } from "./ProfileDropdown";

interface FruidExchangeListProps {
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onPageChange: (page: string) => void;
  userEmail?: string;
  onLogout?: () => void;
}

interface FruitItem {
  turkishName: string;
  englishName: string;
  portion: string;
  weight: number;
  fiber: number;
}

const fruitData: { [key: string]: FruitItem[] } = {
  veryLowGlycemic: [
    {
      turkishName: "Böğürtlen",
      englishName: "Blackberry",
      portion: "18-20 adet",
      weight: 140,
      fiber: 7.4,
    },
    {
      turkishName: "Çarkıfelek meyvesi",
      englishName: "Passionfruit",
      portion: "3,5 meyve",
      weight: 65,
      fiber: 6.5,
    },
    {
      turkishName: "Ahududu",
      englishName: "Raspberry",
      portion: "18-20 adet",
      weight: 100,
      fiber: 6.5,
    },
    {
      turkishName: "Guava",
      englishName: "Guava",
      portion: "2 adet",
      weight: 100,
      fiber: 5.4,
    },
    {
      turkishName: "Frenk üzümü",
      englishName: "Currant",
      portion: "3-4 dal",
      weight: 100,
      fiber: 4.3,
    },
    {
      turkishName: "Nar",
      englishName: "Pomegranate",
      portion: "Yarım",
      weight: 90,
      fiber: 3.5,
    },
    {
      turkishName: "Armut",
      englishName: "Pear",
      portion: "1 adet",
      weight: 100,
      fiber: 3,
    },
    {
      turkishName: "Turna yemişi",
      englishName: "Cranberry",
      portion: "10 adet",
      weight: 100,
      fiber: 3,
    },
    {
      turkishName: "Altın çilek",
      englishName: "Golden berry",
      portion: "15 adet",
      weight: 100,
      fiber: 3,
    },
    {
      turkishName: "Muşmula",
      englishName: "Medlar",
      portion: "6 adet",
      weight: 124,
      fiber: 2.9,
    },
    {
      turkishName: "Yeşil elma",
      englishName: "Granny Smith",
      portion: "Yarım büyük",
      weight: 100,
      fiber: 2.8,
    },
    {
      turkishName: "Kırmızı elma",
      englishName: "Gala/red",
      portion: "Yarım büyük",
      weight: 100,
      fiber: 2.4,
    },
    {
      turkishName: "Greyfurt",
      englishName: "Grapefruit",
      portion: "Yarım büyük",
      weight: 154,
      fiber: 2.4,
    },
    {
      turkishName: "Kiraz /Vişne",
      englishName: "Cherry/sour cherry",
      portion: "15 adet",
      weight: 100,
      fiber: 2.1,
    },
    {
      turkishName: "Kayısı",
      englishName: "Apricot",
      portion: "3 -4adet",
      weight: 110,
      fiber: 2,
    },
    {
      turkishName: "Ayva",
      englishName: "Quince",
      portion: "Çeyrek",
      weight: 100,
      fiber: 1.9,
    },
    {
      turkishName: "Yeşil Erik",
      englishName: "Green plum",
      portion: "6 adet",
      weight: 114,
      fiber: 1.8,
    },
    {
      turkishName: "İncir",
      englishName: "Fig",
      portion: "1 adet büyük",
      weight: 75,
      fiber: 1.5,
    },
    {
      turkishName: "Çilek",
      englishName: "Strawberry",
      portion: "12 adet",
      weight: 160,
      fiber: 3.3,
    },
    {
      turkishName: "Kivi",
      englishName: "Kiwi",
      portion: "1 adet büyük",
      weight: 100,
      fiber: 3,
    },
  ],
  lowGlycemic: [
    {
      turkishName: "Muz",
      englishName: "Banana",
      portion: "1/3 muz",
      weight: 65,
      fiber: 2,
    },
    {
      turkishName: "Yaban mersini",
      englishName: "Blueberry",
      portion: "25 adet",
      weight: 100,
      fiber: 2.4,
    },
    {
      turkishName: "Papaya",
      englishName: "Papaya",
      portion: "Yarım",
      weight: 145,
      fiber: 2.4,
    },
    {
      turkishName: "Dut",
      englishName: "Mulberry",
      portion: "20-25 adet",
      weight: 140,
      fiber: 2.3,
    },
    {
      turkishName: "Portakal",
      englishName: "Orange",
      portion: "1 küçük",
      weight: 100,
      fiber: 2.2,
    },
    {
      turkishName: "Mandalina",
      englishName: "Tangerine",
      portion: "1 adet",
      weight: 125,
      fiber: 2.2,
    },
    {
      turkishName: "Şeftali/Nektarin",
      englishName: "Peach/Nectarine",
      portion: "1 adet",
      weight: 150,
      fiber: 2.2,
    },
    {
      turkishName: "Mürdüm/Kırmızı erik",
      englishName: "Damson plum",
      portion: "3 adet",
      weight: 125,
      fiber: 2,
    },
    {
      turkishName: "Kırmızı elma",
      englishName: "Fuji",
      portion: "Yarım büyük",
      weight: 100,
      fiber: 2.1,
    },
    {
      turkishName: "Ananas",
      englishName: "Pineapple",
      portion: "2 dilim",
      weight: 100,
      fiber: 1.8,
    },
    {
      turkishName: "Malta Eriği/Yenidünya",
      englishName: "Loquat",
      portion: "5-6 adet",
      weight: 100,
      fiber: 1.7,
    },
    {
      turkishName: "Mango",
      englishName: "Mango",
      portion: "Yarım büyük",
      weight: 100,
      fiber: 1.6,
    },
    {
      turkishName: "Pitaya",
      englishName: "Dragon fruit",
      portion: "1 adet",
      weight: 75,
      fiber: 1.5,
    },
    {
      turkishName: "Üzüm yeşil/kırmızı",
      englishName: "Grape",
      portion: "1 küçük salkım",
      weight: 75,
      fiber: 1.4,
    },
    {
      turkishName: "Lychee",
      englishName: "Lychee",
      portion: "10 adet",
      weight: 100,
      fiber: 1.3,
    },
    {
      turkishName: "Kavun",
      englishName: "Honey/S.Claus Melon",
      portion: "1 ince dilim",
      weight: 155,
      fiber: 1.2,
    },
    {
      turkishName: "Goji berry",
      englishName: "Goji berry",
      portion: "2 yemek kaşığı",
      weight: 10,
      fiber: 1,
    },
  ],
  mediumHighGlycemic: [
    {
      turkishName: "Kuru incir",
      englishName: "Dried fig",
      portion: "3 adet",
      weight: 16,
      fiber: 2.1,
    },
    {
      turkishName: "Kuru erik",
      englishName: "Dried plum",
      portion: "2 adet",
      weight: 20,
      fiber: 1.8,
    },
    {
      turkishName: "Hurma",
      englishName: "Date",
      portion: "2 adet",
      weight: 18,
      fiber: 1.2,
    },
    {
      turkishName: "Kuru kayısı",
      englishName: "Dried apricot",
      portion: "2 adet",
      weight: 20,
      fiber: 1.5,
    },
    {
      turkishName: "Kuru turna yemişi",
      englishName: "Dried cranberry",
      portion: "25 adet",
      weight: 20,
      fiber: 1,
    },
    {
      turkishName: "Kuru üzüm",
      englishName: "Raisin",
      portion: "8 adet",
      weight: 14,
      fiber: 0.6,
    },
    {
      turkishName: "Kavun",
      englishName: "Turkish cantaloupe",
      portion: "1 ince dilim",
      weight: 125,
      fiber: 1,
    },
    {
      turkishName: "Karpuz",
      englishName: "Watermelon",
      portion: "1 küçük üçgen",
      weight: 200,
      fiber: 0.8,
    },
  ],
};

export function FruidExchangeList({
  isSidebarCollapsed,
  onSidebarToggle,
  onPageChange,
  userEmail,
  onLogout,
}: FruidExchangeListProps) {
  return (
    <div
      className={`transition-all duration-300 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={onSidebarToggle}
        activePage="fruid-exchange"
        onPageChange={onPageChange}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-6 pb-8">
        {/* Header with Profile Dropdown */}
        <div className="mb-8 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground mb-1">
                Meyve Değişim Listesi
              </h1>
            </div>
            <ProfileDropdown
              userEmail={userEmail}
              onPageChange={onPageChange}
              onLogout={onLogout}
            />
          </div>
        </div>

        {/* Header info card */}
        <Card className="p-6 rounded-2xl border-border bg-emerald-50 mb-6">
          <p className="text-emerald-900 leading-relaxed">
            1 porsiyon meyve yaklaşık 50-60 kaloridir, 12-15
            gram karbonhidrat içerir. Glisemik indeksi düşük
            olanların şekeri yükseltme hızı ve miktarı daha
            azdır. Glisemik indeksi düşük meyveleri tercih
            ediniz.
          </p>
        </Card>

        {/* Very Low Glycemic Load Section - Purple */}
        <div className="mb-8">
          <div className="bg-purple-100 px-6 py-3 rounded-t-2xl border-l-4 border-purple-600">
            <h2 className="text-purple-900">
              ÇOK DÜŞÜK GLİSEMİK YÜKLÜ OLANLAR (5-6)
            </h2>
            <p className="text-purple-800 text-sm">
              Very Low Glycemic Load (5-6)
            </p>
          </div>
          <Card className="rounded-t-none rounded-2xl border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="px-4 py-3 text-left border-b border-purple-200">
                      Yiyecek Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-purple-200">
                      İngilizce Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-purple-200">
                      1 Porsiyon
                    </th>
                    <th className="px-4 py-3 text-left border-b border-purple-200">
                      Ağırlık (gr)
                    </th>
                    <th className="px-4 py-3 text-left border-b border-purple-200">
                      Lif
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fruitData.veryLowGlycemic.map(
                    (fruit, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-purple-50/30"
                        }
                      >
                        <td className="px-4 py-3 border-b border-gray-100">
                          {fruit.turkishName}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 italic text-purple-700">
                          {fruit.englishName}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-purple-700">
                          {fruit.portion}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-center">
                          {fruit.weight}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-center">
                          {fruit.fiber}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Low Glycemic Load Section - Yellow */}
        <div className="mb-8">
          <div className="bg-yellow-100 px-6 py-3 rounded-t-2xl border-l-4 border-yellow-600">
            <h2 className="text-yellow-900">
              DÜŞÜK GLİSEMİK YÜKLÜ OLANLAR (5-9)
            </h2>
            <p className="text-yellow-800 text-sm">
              Low Glycemic Load (5-9)
            </p>
          </div>
          <Card className="rounded-t-none rounded-2xl border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-4 py-3 text-left border-b border-yellow-200">
                      Yiyecek Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-yellow-200">
                      İngilizce Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-yellow-200">
                      1 Porsiyon
                    </th>
                    <th className="px-4 py-3 text-left border-b border-yellow-200">
                      Ağırlık (gr)
                    </th>
                    <th className="px-4 py-3 text-left border-b border-yellow-200">
                      Lif
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fruitData.lowGlycemic.map((fruit, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-yellow-50/30"
                      }
                    >
                      <td className="px-4 py-3 border-b border-gray-100">
                        {fruit.turkishName}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-100 italic text-yellow-700">
                        {fruit.englishName}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-100 text-yellow-700">
                        {fruit.portion}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-100 text-center">
                        {fruit.weight}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-100 text-center">
                        {fruit.fiber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Medium-High Glycemic Load Section - Green */}
        <div className="mb-8">
          <div className="bg-green-100 px-6 py-3 rounded-t-2xl border-l-4 border-green-600">
            <h2 className="text-green-900">
              ORTA-YÜKSEK GLİSEMİK YÜKLÜ OLANLAR ve KURU
            </h2>
            <p className="text-green-800 text-sm">
              Medium-High Glycemic Load and Dried
            </p>
          </div>
          <Card className="rounded-t-none rounded-2xl border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-3 text-left border-b border-green-200">
                      Yiyecek Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-green-200">
                      İngilizce Adı
                    </th>
                    <th className="px-4 py-3 text-left border-b border-green-200">
                      1 Porsiyon
                    </th>
                    <th className="px-4 py-3 text-left border-b border-green-200">
                      Ağırlık (gr)
                    </th>
                    <th className="px-4 py-3 text-left border-b border-green-200">
                      Lif
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fruitData.mediumHighGlycemic.map(
                    (fruit, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-green-50/30"
                        }
                      >
                        <td className="px-4 py-3 border-b border-gray-100">
                          {fruit.turkishName}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 italic text-green-700">
                          {fruit.englishName}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-green-700">
                          {fruit.portion}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-center">
                          {fruit.weight}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-center">
                          {fruit.fiber}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}