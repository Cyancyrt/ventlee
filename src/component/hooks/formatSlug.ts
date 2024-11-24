// utils/generateSlug.js
export function generateSlug(title, wordLimit = 5) {
  return title
    .toLowerCase()
    .split(/\s+/) // Pisahkan kata-kata berdasarkan spasi
    .slice(0, wordLimit) // Batasi jumlah kata sesuai wordLimit
    .join('-') // Gabungkan kata-kata dengan tanda '-'
    .replace(/[^a-z0-9-]+/g, '') // Hapus karakter non-alfanumerik kecuali '-'
    .replace(/(^-|-$)/g, '') // Hapus tanda '-' di awal atau akhir
}
