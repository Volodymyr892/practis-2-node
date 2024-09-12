export const handleSaveError = (error,data, next) => {
    error.status= 400;
    next();
};

export const setUpdateoptions = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
};