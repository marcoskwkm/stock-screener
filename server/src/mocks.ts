const rawData = [
  [
    'AMD',
    'Advanced Micro Devices, Inc.',
    '54.23',
    '+0.19',
    '+0.35%',
    '52.801M',
    '69.315M',
    '63.514B',
    '127.30',
  ],
  [
    'PS',
    'Pluralsight, Inc.',
    '17.71',
    '+0.41',
    '+2.37%',
    '11.529M',
    '2.178M',
    '2.531B',
    'N/A',
  ],
  [
    'ZS',
    'Zscaler, Inc.',
    '108.57',
    '-4.48',
    '-3.96%',
    '3.898M',
    '3.793M',
    '14.17B',
    'N/A',
  ],
  [
    'DT',
    'Dynatrace, Inc.',
    '41.80',
    '+1.39',
    '+3.44%',
    '3.723M',
    '2.758M',
    '11.74B',
    'N/A',
  ],
  [
    'EGHT',
    '8x8, Inc.',
    '15.15',
    '-0.17',
    '-1.11%',
    '3.623M',
    '2.295M',
    '1.57B',
    'N/A',
  ],
  [
    'VNET',
    '21Vianet Group, Inc.',
    '18.33',
    '+1.77',
    '+10.69%',
    '3.308M',
    '959,868',
    '2.077B',
    '23.93',
  ],
  [
    'SHOP',
    'Shopify Inc.',
    '881.00',
    '+17.44',
    '+2.02%',
    '3.997M',
    '3.609M',
    '105.407B',
    'N/A',
  ],
  [
    'STNE',
    'StoneCo Ltd.',
    '38.14',
    '-0.43',
    '-1.11%',
    '3.069M',
    '4.351M',
    '10.566B',
    '202.87',
  ],
  [
    'ALRM',
    'Alarm.com Holdings, Inc.',
    '62.70',
    '-0.12',
    '-0.19%',
    '821,577',
    '660,118',
    '3.057B',
    '59.15',
  ],
  [
    'OKTA',
    'Okta, Inc.',
    '198.19',
    '+1.88',
    '+0.96%',
    '2.305M',
    '2.093M',
    '24.696B',
    'N/A',
  ],
  [
    'VSLR',
    'Vivint Solar, Inc.',
    '9.81',
    '-0.13',
    '-1.31%',
    '2.719M',
    '2.082M',
    '1.223B',
    'N/A',
  ],
  [
    'SMAR',
    'Smartsheet Inc.',
    '49.90',
    '-0.99',
    '-1.95%',
    '1.962M',
    '2.084M',
    '5.976B',
    'N/A',
  ],
  [
    'COUP',
    'Coupa Software Incorporated',
    '258.86',
    '-0.95',
    '-0.37%',
    '1.786M',
    '1.874M',
    '17.363B',
    'N/A',
  ],
  [
    'AMKR',
    'Amkor Technology, Inc.',
    '11.81',
    '-0.27',
    '-2.28%',
    '1.72M',
    '1.472M',
    '2.847B',
    '13.74',
  ],
  [
    'RNG',
    'RingCentral, Inc.',
    '276.17',
    '-8.77',
    '-3.08%',
    '1.395M',
    '1.357M',
    '24.276B',
    'N/A',
  ],
  [
    'JKS',
    'JinkoSolar Holding Co., Ltd.',
    '16.04',
    '+0.39',
    '+2.49%',
    '1.146M',
    '1.105M',
    '712.607M',
    '12.46',
  ],
  [
    'SEDG',
    'SolarEdge Technologies, Inc.',
    '153.60',
    '+2.60',
    '+1.72%',
    '1.148M',
    '1.148M',
    '7.623B',
    '46.39',
  ],
  [
    'UMC',
    'United Microelectronics Corporation',
    '2.5400',
    '-0.0400',
    '-1.55%',
    '956,028',
    '1.03M',
    '6.225B',
    '18.81',
  ],
  [
    'CSIQ',
    'Canadian Solar Inc.',
    '18.05',
    '+0.29',
    '+1.63%',
    '802,337',
    '837,635',
    '1.066B',
    '3.67',
  ],
  [
    'QTWO',
    'Q2 Holdings, Inc.',
    '80.54',
    '-0.77',
    '-0.95%',
    '655,138',
    '571,357',
    '4.192B',
    'N/A',
  ],
  [
    'HMI',
    'Huami Corporation',
    '11.47',
    '+0.45',
    '+4.08%',
    '578,291',
    '357,840',
    '710.561M',
    '16.58',
  ],
  [
    'OLED',
    'Universal Display Corporation',
    '152.55',
    '-1.79',
    '-1.16%',
    '488,121',
    '478,498',
    '7.186B',
    '49.85',
  ],
  [
    'CEVA',
    'CEVA, Inc.',
    '34.73',
    '-0.24',
    '-0.69%',
    '132,109',
    '145,700',
    '764.209M',
    '708.78',
  ],
  [
    'DQ',
    'Daqo New Energy Corp.',
    '59.98',
    '+0.57',
    '+0.96%',
    '311,336',
    '221,768',
    '833.53M',
    '15.67',
  ],
  [
    'IMOS',
    'ChipMOS TECHNOLOGIES INC.',
    '22.90',
    '+0.22',
    '+0.97%',
    '19,321',
    '16,289',
    '854.516M',
    '54.52',
  ],
]

interface Data {
  symbol: string
  name: string
  price: string
  pchange: string
  vol: string
  avgvol: string
  mktcap: string
  peratio: string
}

export const mockedData: Data[] = rawData.map((item) => ({
  symbol: item[0],
  name: item[1],
  price: item[2],
  pchange: item[3],
  vol: item[4],
  avgvol: item[5],
  mktcap: item[6],
  peratio: item[7],
}))

export const metricsList = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' },
  { id: 'pchange', label: '% Change' },
  { id: 'vol', label: 'Volume' },
  { id: 'avgvol', label: 'Avg Vol (3 month)' },
  { id: 'mktcap', label: 'Market Cap' },
  { id: 'peratio', label: 'PE Ratio (TTM)' },
]
