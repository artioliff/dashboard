/* FILTERS MODULE
   Filtra os dados de acordo com intervalo de datas
*/

const Filters = (function () {

  function filterByDate(customers, startDateStr, endDateStr) {
    if (!startDateStr && !endDateStr) return customers;

    const start = startDateStr ? new Date(startDateStr) : null;
    const end = endDateStr ? new Date(endDateStr) : null;

    return customers.filter((c) => {
      const d = new Date(c.date);

      if (start && d < start) return false;

      if (end) {
        const endCopy = new Date(end);
        endCopy.setHours(23, 59, 59, 999);
        if (d > endCopy) return false;
      }

      return true;
    });
  }

  return {
    filterByDate
  };
})();