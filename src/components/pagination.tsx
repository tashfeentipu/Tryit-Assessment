export function Pagination({ dataLength, itemsPerPage, setItemsPerPage, setPage, page }: any) {
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(Math.max(0, page - 3), Math.min(page, totalPages));

  if (page > totalPages) {
    setPage(totalPages);
  }

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <span>Page {page} of {Math.max(totalPages, 1)}</span>
      <select className="p-2 border rounded-md cursor-pointer" value={itemsPerPage} onChange={(e) => {
        setPage(1);
        setItemsPerPage(Number(e.target.value))
      }}>
        {[10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 cursor-pointer border rounded-md bg-blue-500 text-white disabled:opacity-50">Prev</button>
      {visiblePages.map((p) => (
        <button key={p} onClick={() => setPage(p)} className={`py-2 px-4 border rounded-full cursor-pointer ${p === page ? "bg-blue-500 text-white" : "bg-white"}`}>{p}</button>
      ))}
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 border cursor-pointer rounded-md bg-blue-500 text-white disabled:opacity-50">Next</button>
    </div>
  );
}