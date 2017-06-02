// var Chance = require('chance') // eslint-disable-line
// var chance = new Chance()

const doener = {
  'name': 'Dönerspieß',
  'life': '20',
  'icon': '<svg viewBox="0 0 135 105" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="icon-doener" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" fill="#A87C58" points="36.698 63.343 111.97 48.09 118.325 79.454 43.053 94.706"></polygon><path d="M6.3,72 L14.1,58.3 L17.2,40.5 L25.4,20.8 L39.7,13.2 C39.7,13.2 52,7.5 53.6,7.3 C55.3,7 71.5,6.4 71.5,6.4 L81.9,9.1 C81.9,9.1 91.7,15.2 92.1,16.1 C92.5,16.9 98.9,24.5 99.1,25.1 C99.3,25.7 104.8,38.6 104.8,38.6 L39.7,57.4 L27.4,90.6 L9,84.7 L6.3,72 Z" id="Shape" stroke="#000000" fill="#7ED66B"></path><ellipse id="Oval" fill="#C97C2F" cx="26.4" cy="80.5" rx="8.8" ry="14.4"></ellipse><ellipse id="Oval" fill="#C97C2F" transform="translate(34.920530, 50.020256) rotate(203.422000) translate(-34.920530, -50.020256) " cx="34.9205302" cy="50.0202557" rx="9.1" ry="25.8"></ellipse><ellipse id="Oval" fill="#C97C2F" cx="49.2" cy="28.2" rx="17.7" ry="5.2"></ellipse><ellipse id="Oval" fill="#C97C2F" cx="60.7" cy="25.5" rx="9.9" ry="7.6"></ellipse><ellipse id="Oval" fill="#C97C2F" cx="70.8" cy="24.5" rx="8.2" ry="5.5"></ellipse><path d="M134.9,76.7 C134.2,70.4 132.8,64.5 130.7,58.9 C126.1,46.8 118.3,36.5 108.5,29.6 C97.7,11.7 79.7,0 59.3,0 C26.6,0 0,30.2 0,67.5 C0,70.7 0.2,73.9 0.6,77 C0.9,79.8 1.4,82.5 2.1,85.2 C2.5,87.1 3.6,88.7 5.1,89.9 L20.9,102.2 C22.8,103.7 25.2,104.3 27.6,103.9 L128,85.9 C132.3,85.1 135.3,81.1 134.9,76.7 Z M96.3,53.8 C97.7,53.4 98.9,54.2 98.9,55.6 C98.9,57 97.8,58.5 96.3,58.9 C94.9,59.3 93.7,58.5 93.7,57.1 C93.8,55.7 94.9,54.2 96.3,53.8 Z M21.2,86.5 C16.6,84.5 13.1,80.4 11.9,75.5 C11.6,74.2 11.4,72.9 11.4,71.6 C11.4,64 16.6,57.7 23.5,55.8 C21.5,52.1 20.3,47.9 20.3,43.4 C20.3,29.2 31.8,17.7 46,17.7 C48.6,17.7 51.2,18.1 53.6,18.8 C55.2,13.1 60.4,9 66.6,9 C71.6,9 75.9,11.7 78.3,15.7 C79.6,14.4 81.4,13.5 83.4,13.5 C87.3,13.5 90.5,16.7 90.5,20.6 L90.5,21 C87,20.1 83.5,19.6 79.8,19.5 L76.4,19.5 C71.1,19.7 66,20.7 61.1,22.4 C58.5,23.3 56,24.5 53.6,25.8 C42.2,32.2 33,42.5 27.3,55.3 C26.7,56.6 26.2,57.8 25.7,59.1 C23.9,63.8 22.6,68.8 21.9,74.1 C21.4,77.5 21.1,81.1 21.1,84.7 C21.1,85.3 21.1,85.9 21.2,86.5 L21.2,86.5 Z M40.1,72.1 L40.1,71.5 C40.4,68.4 43,65.2 46.1,64.3 C49.4,63.3 52.1,65.2 52.1,68.5 C52.1,68.9 52.1,69.4 52,69.8 C51.4,72.7 49,75.4 46.1,76.3 C42.8,77.3 40.1,75.4 40.1,72.1 Z M49.6,86.3 C48.2,86.7 47,85.9 47,84.5 C47,83.1 48.1,81.6 49.6,81.2 C51,80.8 52.2,81.6 52.2,83 C52.2,84.4 51,85.9 49.6,86.3 Z M91.5,73.3 C89.3,74 87.5,72.7 87.5,70.5 C87.5,68.3 89.3,66 91.5,65.3 C93.7,64.6 95.5,65.9 95.5,68.1 C95.5,70.4 93.7,72.7 91.5,73.3 Z M106.3,72.8 C103,73.8 100.3,71.9 100.3,68.6 C100.3,66.5 101.4,64.2 103.1,62.7 C104,61.8 105.1,61.2 106.3,60.8 C108.2,60.2 109.8,60.6 110.9,61.6 C111.8,62.4 112.3,63.6 112.3,65 C112.3,68.4 109.6,71.9 106.3,72.8 Z" id="Shape" fill="#C9B19B"></path><path d="M134.9,76.7 C134.2,70.4 132.8,64.5 130.7,58.9 L111,61.7 C111.9,62.5 112.4,63.7 112.4,65.1 C112.4,68.4 109.7,71.9 106.4,72.9 C103.1,73.9 100.4,72 100.4,68.7 C100.4,66.6 101.5,64.3 103.2,62.8 L52,69.8 C51.4,72.7 49,75.4 46.1,76.3 C42.8,77.3 40.1,75.4 40.1,72.1 L40.1,71.5 L22,74 C20.6,82.8 20.4,94.1 24.8,103.8 C25.7,103.9 26.7,103.9 27.6,103.8 L128,85.8 C132.3,85.1 135.3,81.1 134.9,76.7 Z M49.6,86.3 C48.2,86.7 47,85.9 47,84.5 C47,83.1 48.1,81.6 49.6,81.2 C51,80.8 52.2,81.6 52.2,83 C52.2,84.4 51,85.9 49.6,86.3 Z M91.5,73.3 C89.3,74 87.5,72.7 87.5,70.5 C87.5,68.3 89.3,66 91.5,65.3 C93.7,64.6 95.5,65.9 95.5,68.1 C95.5,70.4 93.7,72.7 91.5,73.3 Z" id="Shape" fill="#A37F62" opacity="0.4"></path><path d="M12.5,76.7 C12.5,77.9 16,83.3 16,83.3 C16,83.3 19.1,84.5 18.5,79.2 C17.9,73.9 15.6,73.1 16.7,70 C17.7,66.9 16.3,68.8 20.4,66.5 C24.5,64.2 25.7,63.4 25.3,61.4 C24.9,59.4 22.4,55.7 23.9,54 C25.3,52.4 26.2,51.3 27.2,48.7 C28.2,46 26.6,44 28.6,43 C30.6,42 28.6,43.4 31.7,38.3 C34.8,33.2 29.7,33.6 34,30.7 C38.3,27.8 43.2,24.6 45.9,25 C48.6,25.4 51,25 51.4,24.2 C51.8,23.4 51.6,20.3 51.2,19.7 C50.8,19.1 51,16.6 53,17.9 C55,19.1 50.3,21.4 56.3,21.2 C62.2,21 64.3,17.9 64.9,16.3 C65.5,14.7 69.6,11.8 71.2,13.2 C72.8,14.6 72.2,17.9 78,16.9 C83.7,15.9 81.7,16.3 85.4,18.9 C89.1,21.6 89.7,21.2 92.6,18.7 C95.5,16.2 92,12.6 90.3,12.8 C88.7,13 90.7,13.6 86,13.4 C81.3,13.2 79,8.9 75.8,10.1 C72.5,11.3 65.8,7.8 59.8,10.9 C53.9,14 47.3,11.5 41.6,19.9 C35.9,28.3 25.8,24.2 25.6,29.1 C25.4,34 28.1,39.3 24.8,44.5 C21.5,49.6 15.2,48.2 15.6,53.1 C16,58 7.6,62.5 11.1,67 C14.3,71.4 12.5,76.7 12.5,76.7 L12.5,76.7 Z" id="Shape" fill="#F7F6F0"></path></g></svg>'
}

const bug = {
  'name': 'Dönerspieß',
  'life': '75',
  'icon': '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77.084 100" enable-background="new 0 0 77.084 100" xml:space="preserve"><path d="M20.076,52.852c0,0-5.911,1.852-9.416,4.604c0.228,17.387,9.665,38.298,9.665,38.298l-0.466,4.065L21.84,100l-0.265-4.268c0,0,0.61-1.152-0.25-3.119c-0.858-1.969-8.623-22.273-8.969-32.894c2.885-2.327,7.329-4.887,7.329-4.887L20.076,52.852z"/><path d="M23.583,42.395c0,0-6.891-1.367-11.153-0.896C9.279,47.37,5.896,59.286,5.196,69.604c-0.714,1.053-2.149,2.84-2.149,2.84l1.368,1.022l1.619-3.561c0,0,1.247-0.226,1.429-2.311c0.181-2.086,0.663-12.921,5.112-23.081c3.123-0.041,10.104,0.182,10.104,0.182L23.583,42.395z"/><path d="M57.006,52.852c0,0,5.91,1.852,9.415,4.604c-0.229,17.387-9.664,38.298-9.664,38.298l0.467,4.065L55.242,100l0.263-4.268c0,0-0.607-1.152,0.252-3.119c0.855-1.969,8.621-22.273,8.969-32.894c-2.885-2.327-7.328-4.887-7.328-4.887L57.006,52.852z"/><path d="M53.497,42.395c0,0,6.893-1.367,11.154-0.896c3.149,5.872,6.533,17.788,7.232,28.104c0.713,1.053,2.149,2.84,2.149,2.84l-1.368,1.022l-1.62-3.562c0,0-1.246-0.225-1.427-2.31c-0.182-2.086-0.663-12.921-5.113-23.081c-3.121-0.041-10.104,0.182-10.104,0.182L53.497,42.395z"/><path d="M45.019,85.704c3.889-2.761,8.104-6.558,10.926-15.478c2.826-8.918,1.314-20.81-6.941-34.246c-0.188-9.687-3.16-13.162-3.551-15.146s0.895-4.674,2.658-4.131c2.793,0.856,6.877,4.616,9.969,8.659l-9.88,0.298l0.7,1.989l11.297,0.8c3.06,5.038,14.646,29.946,16.888,49.762c-0.573-20.002-12.877-45.856-15.731-50.58l0.365-0.75c0,0-0.355-12.188-0.418-15.729c-0.056-3.541-0.961-6.051-0.961-6.051l2.035-4.348L60.508,0l-1.101,4.671c0,0-1.252,0.19-0.762,2.386c0.492,2.191,1.176,18.235,1.176,18.235c-3.168-4.526-8.127-9.989-11.688-10.563c-4.129-0.652-7.438,3.442-7.438,3.442h-4.31c0,0-3.309-4.096-7.438-3.442c-3.562,0.574-8.521,6.037-11.688,10.563c0,0,0.683-16.044,1.175-18.235c0.492-2.193-0.761-2.386-0.761-2.386L16.571,0l-1.864,0.754l2.035,4.348c0,0-0.904,2.512-0.961,6.051c-0.059,3.543-0.419,15.729-0.419,15.729l0.367,0.75C12.875,32.355,0.569,58.21,0,78.213c2.239-19.814,13.827-44.725,16.885-49.762L28.18,27.65l0.702-1.987l-9.877-0.298c3.09-4.043,7.176-7.803,9.97-8.659c1.763-0.543,3.048,2.146,2.657,4.131c-0.391,1.983-3.364,5.459-3.551,15.146c-8.258,13.438-9.768,25.328-6.944,34.246c2.825,8.92,7.039,12.717,10.928,15.478c3.891,2.76,6.466,8.662,6.466,8.662S41.128,88.464,45.019,85.704z"/></svg>'
}

export default {doener, bug}
