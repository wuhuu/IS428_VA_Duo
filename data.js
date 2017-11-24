var ges_data;
var income_industry_data;
var income_overall_data;
var inflation_CP_data;
var inflation_GDP_data;
var rate_industry_data;
var rate_occupation_data;
var rate_overall_data;
var vacReason_education_data;
var vacReason_industry_data;

// Load all the CSV data file
d3.csv("data/ges.csv", function(data) {
    ges_data = data;
});

d3.csv("data/income_industry.csv", function(data) {
    income_industry_data = data;
});

d3.csv("data/income_overall.csv", function(data) {
    income_overall_data = data;
});

d3.csv("data/inflation_consumerPrice.csv", function(data) {
    inflation_CP_data = data;
});

d3.csv("data/inflation_GDPDeflator.csv", function(data) {
    inflation_GDP_data = data;
});

d3.csv("data/rate_industry.csv", function(data) {
    rate_industry_data = data;
});

d3.csv("data/rate_occupationGroup.csv", function(data) {
    rate_occupation_data = data;
});

d3.csv("data/rate_overall.csv", function(data) {
    rate_overall_data = data;
});

d3.csv("data/vacancyReason_education.csv", function(data) {
    vacReason_education_data = data;
});

d3.csv("data/vacancyReason_industry.csv", function(data) {
    vacReason_industry_data = data;
});

// Method to get the data from the respective csv file

var getGesData = new Promise(
    function (resolve, reject) {
        if (ges_data) {
            resolve(ges_data);
        } else {
            d3.csv("data/ges.csv", function(data) {
                ges_data = data;
                resolve(data);
            });
        }
    }
);

var getIncomeIndustryData = new Promise(
    function (resolve, reject) {
        if (income_industry_data) {
            resolve(income_industry_data);
        } else {
            d3.csv("data/income_industry.csv", function(data) {
                income_industry_data = data;
                resolve(data);
            });
        }
    }
);

var getIncomeOverallData = new Promise(
    function (resolve, reject) {
        if (income_overall_data) {
            resolve(income_overall_data);
        } else {
            d3.csv("data/income_overall.csv", function(data) {
                income_overall_data = data;
                resolve(data);
            });
        }
    }
);

var getInflationCPData = new Promise(
    function (resolve, reject) {
        if (inflation_CP_data) {
            resolve(inflation_CP_data);
        } else {
            d3.csv("data/inflation_consumerPrice.csv", function(data) {
                inflation_CP_data = data;
                resolve(data);
            });
        }
    }
);

var getInflationGDPData = new Promise(
    function (resolve, reject) {
        if (inflation_GDP_data) {
            resolve(inflation_GDP_data);
        } else {
            d3.csv("data/inflation_GDPDeflator.csv", function(data) {
                inflation_GDP_data = data;
                resolve(data);
            });
        }
    }
);

var getRateIndustryData = new Promise(
    function (resolve, reject) {
        if (rate_industry_data) {
            resolve(rate_industry_data);
        } else {
            d3.csv("data/rate_industry.csv", function(data) {
                rate_industry_data = data;
                resolve(data);
            });
        }
    }
);

var getRateOccupationData = new Promise(
    function (resolve, reject) {
        if (rate_occupation_data) {
            resolve(rate_occupation_data);
        } else {
            d3.csv("data/rate_occupationGroup.csv", function(data) {
                rate_occupation_data = data;
                resolve(data);
            });
        }
    }
);

var getRateOverallData = new Promise(
    function (resolve, reject) {
        if (rate_overall_data) {
            resolve(rate_overall_data);
        } else {
            d3.csv("data/rate_overall.csv", function(data) {
                rate_overall_data = data;
                resolve(data);
            });
        }
    }
);

var getVacReasonEducationData = new Promise(
    function (resolve, reject) {
        if (vacReason_education_data) {
            resolve(vacReason_education_data);
        } else {
            d3.csv("data/vacancyReason_education.csv", function(data) {
                vacReason_education_data = data;
                resolve(data);
            });
        }
    }
);


var getVacReasonIndustryData = new Promise(
    function (resolve, reject) {
        if (vacReason_industry_data) {
            resolve(vacReason_industry_data);
        } else {
            d3.csv("data/vacancyReason_industry.csv", function(data) {
                vacReason_industry_data = data;
                resolve(data);
            });
        }
    }
);
