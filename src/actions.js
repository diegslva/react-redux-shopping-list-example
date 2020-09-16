export const addProduct = (data) => ({
  type: "ADD_PRODUCT",
  data
});

export const removeProduct = (data) => ({
  type: 'REMOVE_PRODUCT',
  data,
})

export const saveFavorite = (data) => ({
  type: 'SAVE_FAVORITE',
  data,
});

export const removeFavorite = (data) => ({
  type: 'REMOVE_FAVORITE',
  data,
})
