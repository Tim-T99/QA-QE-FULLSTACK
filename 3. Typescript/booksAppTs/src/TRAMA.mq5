//+------------------------------------------------------------------+
//| Trendlines with Breaks (LuxAlgo-inspired) for XAU/USD M15        |
//| Built for XM Forex MT5 by xAI Grok                            |
//+------------------------------------------------------------------+

#property copyright "xAI Grok"
#property link      "https://xai.com"
#property version   "1.00"
#property strict
#property indicator_chart_window
#property indicator_buffers 2
#property indicator_plots   2

// Indicator properties
#property indicator_label1  "Upper Trendline"
#property indicator_type1   DRAW_LINE
#property indicator_color1  clrRed
#property indicator_style1  STYLE_SOLID
#property indicator_width1  2

#property indicator_label2  "Lower Trendline"
#property indicator_type2   DRAW_LINE
#property indicator_color2  clrGreen
#property indicator_style2  STYLE_SOLID
#property indicator_width2  2

// Input parameters
input int PivotLookback = 5;      // Pivot lookback period (optimized for M15)
input double SlopeFactor = 1.0;   // Slope steepness (1.0 for gold M15)
input int ATRPeriod = 14;         // ATR period for slope calculation
input bool ShowBreakouts = true;  // Show breakout alerts

// Indicator buffers
double UpperTrendline[];
double LowerTrendline[];

// Global variables
datetime lastBarTime = 0;

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int OnInit()
{
   SetIndexBuffer(0, UpperTrendline, INDICATOR_DATA);
   SetIndexBuffer(1, LowerTrendline, INDICATOR_DATA);
   
   PlotIndexSetDouble(0, PLOT_EMPTY_VALUE, 0.0);
   PlotIndexSetDouble(1, PLOT_EMPTY_VALUE, 0.0);
   
   IndicatorSetString(INDICATOR_SHORTNAME, "Trendlines with Breaks (Gold M15)");
   
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
{
   if (rates_total < PivotLookback * 2 + 1) return(0);
   
   // Check for new bar (M15 timeframe)
   if (time[rates_total-1] == lastBarTime) return(prev_calculated);
   lastBarTime = time[rates_total-1];
   
   int start = prev_calculated == 0 ? PivotLookback : prev_calculated - 1;
   
   for (int i = start; i < rates_total && !IsStopped(); i++)
   {
      // Find pivot highs and lows
      double pivotHigh = PivotHigh(high, i, PivotLookback);
      double pivotLow = PivotLow(low, i, PivotLookback);
      
      // Calculate ATR-based slope
      double atr = iATR(NULL, PERIOD_M15, ATRPeriod, i);
      double slope = atr * SlopeFactor;
      
      // Upper trendline (resistance)
      if (pivotHigh > 0)
      {
         UpperTrendline[i] = pivotHigh;
         for (int j = i - 1; j >= 0 && UpperTrendline[j] == 0; j--)
            UpperTrendline[j] = UpperTrendline[j+1] - slope * (i - j);
      }
      else
         UpperTrendline[i] = UpperTrendline[i-1];
      
      // Lower trendline (support)
      if (pivotLow > 0)
      {
         LowerTrendline[i] = pivotLow;
         for (int j = i - 1; j >= 0 && LowerTrendline[j] == 0; j--)
            LowerTrendline[j] = LowerTrendline[j+1] + slope * (i - j);
      }
      else
         LowerTrendline[i] = LowerTrendline[i-1];
      
      // Detect breakouts
      if (ShowBreakouts && i > PivotLookback)
      {
         if (close[i] > UpperTrendline[i] && close[i-1] <= UpperTrendline[i-1])
            Alert("Breakout ABOVE Upper Trendline at " + DoubleToString(close[i], 2));
         if (close[i] < LowerTrendline[i] && close[i-1] >= LowerTrendline[i-1])
            Alert("Breakout BELOW Lower Trendline at " + DoubleToString(close[i], 2));
      }
   }
   
   return(rates_total);
}

//+------------------------------------------------------------------+
//| Helper function to find pivot high                              |
//+------------------------------------------------------------------+
double PivotHigh(const double &high[], int pos, int lookback)
{
   if (pos < lookback || pos >= ArraySize(high) - lookback) return(0);
   
   double center = high[pos];
   for (int i = 1; i <= lookback; i++)
      if (high[pos - i] >= center || high[pos + i] >= center)
         return(0);
   return(center);
}

//+------------------------------------------------------------------+
//| Helper function to find pivot low                               |
//+------------------------------------------------------------------+
double PivotLow(const double &low[], int pos, int lookback)
{
   if (pos < lookback || pos >= ArraySize(low) - lookback) return(0);
   
   double center = low[pos];
   for (int i = 1; i <= lookback; i++)
      if (low[pos - i] <= center || low[pos + i] <= center)
         return(0);
   return(center);
}

//+------------------------------------------------------------------+
//| Helper function to calculate ATR                                |
//+------------------------------------------------------------------+
double iATR(string symbol, ENUM_TIMEFRAMES timeframe, int period, int shift)
{
   double atr[];
   ArraySetAsSeries(atr, true);
   CopyBuffer(iATR(symbol, timeframe, period), 0, shift, 1, atr);
   return(atr[0]);
}