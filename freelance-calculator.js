/**
 * NovusTools - Vanilla JS Freelance Rate Calculator Logic
 * Calculates optimal hourly and daily rates, including tax, expense, and unbillable time breakdowns.
 */

function calculateFreelanceRate(targetNetIncome, annualExpenses, taxRatePercent, vacationWeeks, hoursPerWeek, efficiencyPercent) {
    // Constraints & Percentages
    const safeTaxes = Math.min(Math.max(taxRatePercent, 0), 99) / 100;
    const efficiency = Math.min(Math.max(efficiencyPercent, 1), 100) / 100;
    
    // Target Gross Revenue
    const requiredGross = (targetNetIncome + annualExpenses) / (1 - safeTaxes);
    
    // Time calculations
    const workedWeeks = Math.max(52 - vacationWeeks, 1);
    const totalWorkedHours = workedWeeks * hoursPerWeek;
    const billableHours = totalWorkedHours * efficiency;
    const unbillableHours = totalWorkedHours - billableHours;
    
    // Rate calculations
    const hourlyRate = billableHours > 0 ? requiredGross / billableHours : 0;
    const dailyRate = workedWeeks > 0 ? requiredGross / (workedWeeks * 5) : 0;
    
    // Hourly Breakdown
    const rateTax = hourlyRate * safeTaxes;
    const rateExpense = billableHours > 0 ? annualExpenses / billableHours : 0;
    const rateAdmin = billableHours > 0 ? (unbillableHours / billableHours) * (targetNetIncome / totalWorkedHours) : 0;
    const rateTakehome = hourlyRate - rateTax - rateExpense - rateAdmin;

    return {
        requiredGrossRevenue: requiredGross,
        totalBillableHours: billableHours,
        hourlyRate: hourlyRate,
        dailyRate: dailyRate,
        hourlyBreakdown: {
            takehome: rateTakehome,
            taxes: rateTax,
            expenses: rateExpense,
            adminUnbillableCost: rateAdmin
        }
    };
}

// Example Usage:
// const myRate = calculateFreelanceRate(75000, 12000, 25, 4, 40, 60);
// console.log(myRate);
