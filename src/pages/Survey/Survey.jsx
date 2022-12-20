import React from 'react'

const Survey = () => {
  return (
    <>
      {' '}
      <div className="flex flex-col gap-3">
        <span className="text-2xl font-medium self-center">Deneme Anketi</span>
        <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">Selamlama / Giriş / Açıklama</span>
          <span>Deneme Anketinin Giriş Yazısı</span>
        </div>
        {/* Text soru */}
        <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span>
            <span className="font-medium">Soru: </span>
            Soru: Evcil hayvanları seviyor musunuz?
          </span>
          {/* Table */}

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6"
                  >
                    Cevap
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                  >
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Evet çok severim hayvanlarla birlikte olmaya bayılırım.
                  </th>
                  <td className="py-4 px-6">18.10.2022 16:05</td>
                </tr>
                <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Severim ama hayvanlardan korkarım
                  </th>
                  <td className="py-4 px-6">19.10.2022 18:12</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Uzaktan severim
                  </th>
                  <td className="py-4 px-6">19.10.2022 20:45</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table */}
          <span className="flex font-medium text-blue-700 text-sm">
            Cevaplamak zorunlu
            <span className="ml-auto">18.10.2022 16:05</span>
          </span>
        </div>
        {/* Text soru */}
        {/* Select soru */}
        <div className="flex gap-3 flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span>
            <span className="font-medium">Soru: </span>
            Evcil hayvanınız var mı?
          </span>
          <span className="py-3 px-1 font-medium">**Tek cevap işaretlenebilir**</span>
          {/**deneme */}
          {/* <PieChart /> */}
          {/**deneme */}
          <span className="flex font-medium text-blue-700 text-sm">
            Cevaplamak zorunlu
            <span className="ml-auto">18.10.2022 16:05</span>
          </span>
        </div>
        {/* Select soru */}
        {/* Rate soru */}
        <div className="flex gap-3 flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span>
            <span className="font-medium">Soru: </span>
            Bu bir derecelendirme sorudur. Hepsini cevaplayınız.
          </span>
          {/**deneme */}
          {/* <BarChart /> */}
          {/**deneme */}
          <span className="flex font-medium text-blue-700 text-sm">
            Cevaplamak zorunlu
            <span className="ml-auto">18.10.2022 16:05</span>
          </span>
        </div>
        {/* Rate soru */}
        <div className="flex flex-col py-3 px-2 border border-solid border-gray-200 rounded-xl">
          <span className="font-medium">Özel "Teşekkür" Metni</span>
          <span>Deneme Anketinin Teşekkür Yazısı</span>
        </div>
      </div>
    </>
  )
}

export default Survey
