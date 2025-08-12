const getStatisticsDashboard = (statistics: StatisticType[], transactions: Transaction[]) => {
  if (!statistics || !transactions) {
    return statistics;
  }

  let statisticData = [...statistics];

  statisticData[0].value = transactions.filter(
    (value) =>
      value.status === 'pending' &&
      value.createdAt &&
      new Date(value.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  statisticData[0].subValue = Number(
    transactions
      .filter(
        (value) =>
          value.status === 'pending' &&
          value.createdAt &&
          new Date(value.createdAt).toDateString() === new Date().toDateString(),
      )
      .reduce((acc, current) => acc + current.totalPrice, 0)
      .toFixed(2),
  );

  statisticData[1].value = transactions.filter(
    (value) =>
      value.createdAt && new Date(value.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  statisticData[1].subValue = Number(
    transactions
      .filter(
        (value) =>
          value.createdAt && new Date(value.createdAt).toDateString() === new Date().toDateString(),
      )
      .reduce((acc, current) => acc + current.totalPrice, 0)
      .toFixed(2),
  );

  statisticData[2].value = transactions.filter(
    (value) =>
      value.status === 'completed' &&
      value.createdAt &&
      new Date(value.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  statisticData[2].subValue = Number(
    transactions
      .filter(
        (value) =>
          value.status === 'completed' &&
          value.createdAt &&
          new Date(value.createdAt).toDateString() === new Date().toDateString(),
      )
      .reduce((acc, current) => acc + current.totalPrice, 0)
      .toFixed(2),
  );

  statisticData[3].value = `${Number(
    transactions
      .filter((value) => value.status === 'completed')
      .reduce((acc, current) => acc + current.totalPrice, 0)
      .toFixed(2),
  ).toLocaleString()}`;
  statisticData[3].subValue = Number(
    transactions
      .filter(
        (value) =>
          value.status === 'completed' &&
          value.createdAt &&
          new Date(value.createdAt).toDateString() === new Date().toDateString(),
      )
      .reduce((acc, current) => acc + current.totalPrice, 0)
      .toFixed(2),
  );

  return statisticData;
};

export default getStatisticsDashboard;
