import React from 'react'
import FusionCharts from 'fusioncharts'
import Chart from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import { filterTicketsStatus } from '../utils/filterTickets'

ReactFC.fcRoot(FusionCharts, Chart)

const TicketChart = ({ data, page }) => {
  const chartData = [
    {
      label: 'New tickets',
      value: filterTicketsStatus(data, 'new').length,
    },
    {
      label: 'In progress',
      value: filterTicketsStatus(data, 'in progress').length,
    },
    {
      label: 'Solved',
      value: filterTicketsStatus(data, 'solved').length,
    },
    {
      label: 'Pending',
      value: filterTicketsStatus(data, 'pending').length,
    },
    {
      label: 'Cancelled',
      value: filterTicketsStatus(data, 'cancelled').length,
    },
  ]
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: 'doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '350', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Ticket Ratio',
        subcaption: `Total Number of ${
          page === 'own' ? 'own' : 'team'
        } tickets: ${data.length}`, //Set the chart caption
        showPercentValues: 0,
        captionFontColor: '#FFFFFF',
        doughnutRadius: 25,
        captionFontBold: 0,
        captionFontSize: 20,
        captionFont: 'Futura',
        baseFont: 'Futura',
        baseFontSize: 14,
        baseFontColor: '#FFFFFF',
        smartLineColor: '#617d98',
        showShadow: 0,
        showLabels: 1,
        showValues: 1,
        showLegend: 1,
        legendBgColor: '#02AAC3',
        showPlotBorder: 0,
        paletteColors: ' #7AE302, #FFBF00, #1EFFA1, #FBFF23, #FC4548, #8d6e63,',
        use3DLighting: 0,
        toolTipColor: '#617d98',
        useDataPlotColorForLabels: 1,
        bgColor: '#20314f',
        showBorder: 0,
      },
      // Chart Data - from step 2
      data: chartData,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default TicketChart
