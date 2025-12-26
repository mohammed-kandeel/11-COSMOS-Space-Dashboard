// sidebar
var sidebarToggle = document.querySelector('[id="sidebar-toggle"]');
var sidebar = document.getElementById('sidebar');
var layer = document.getElementById('layer');

// links
var todayInSpaceLink = document.querySelector('[data-section="today-in-space"]');
var launchesLink = document.querySelector('[data-section="launches"]');
var planetsLink = document.querySelector('[data-section="planets"]');

// sections
var todayInSpaceSections = document.querySelector('[id="today-in-space"][data-section="today-in-space"]');
var launchesSections = document.querySelector('[id="launches"][data-section="launches"]');
var planetsSections = document.querySelector('[id="planets"][data-section="planets"]');

// variables
var planetsData;

// side nav
(function () {
   todayInSpaceLink.addEventListener('click', function () {
      // links
      todayInSpaceLink.classList.add('bg-blue-500/10', 'text-blue-400');
      launchesLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      planetsLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      todayInSpaceLink.classList.remove('text-slate-300', 'hover:bg-slate-800');
      launchesLink.classList.remove('bg-blue-500/10', 'text-blue-400');
      planetsLink.classList.remove('bg-blue-500/10', 'text-blue-400');

      // sections
      todayInSpaceSections.classList.remove('hidden');
      launchesSections.classList.add('hidden');
      planetsSections.classList.add('hidden');

      // toggle
      sidebar.classList.remove('open');
   });

   launchesLink.addEventListener('click', function () {
      // links
      todayInSpaceLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      launchesLink.classList.add('bg-blue-500/10', 'text-blue-400');
      planetsLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      todayInSpaceLink.classList.remove('bg-blue-500/10', 'text-blue-400');
      launchesLink.classList.remove('text-slate-300', 'hover:bg-slate-800');
      planetsLink.classList.remove('bg-blue-500/10', 'text-blue-400');

      // sections
      todayInSpaceSections.classList.add('hidden');
      planetsSections.classList.add('hidden');
      launchesSections.classList.remove('hidden');

      // toggle
      sidebar.classList.remove('open');
   });

   planetsLink.addEventListener('click', function () {
      // links
      todayInSpaceLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      launchesLink.classList.add('text-slate-300', 'hover:bg-slate-800');
      planetsLink.classList.add('bg-blue-500/10', 'text-blue-400');
      todayInSpaceLink.classList.remove('bg-blue-500/10', 'text-blue-400');
      launchesLink.classList.remove('bg-blue-500/10', 'text-blue-400');
      planetsLink.classList.remove('text-slate-300', 'hover:bg-slate-800');

      // sections
      todayInSpaceSections.classList.add('hidden');
      launchesSections.classList.add('hidden');
      planetsSections.classList.remove('hidden');

      // toggle
      sidebar.classList.remove('open');
   });

   sidebarToggle.addEventListener('click', function () {
      sidebar.classList.add('open');
   });

   layer.addEventListener('click', function () {
      sidebar.classList.remove('open');
   });
})();

// get data
async function getTodayInSpaceData(date) {
   setInputValueForTodayInSpace(date);
   setLoadImageForTodayInSpace();

   try {
      var response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=umQgY7tWKjf8UgtG276EwaSuyNpOEjFhuedwXGnE&date=${date}`);
      if (response.ok) {
         var data = await response.json();
         todayInSpaceElements().apodLoading.classList.add('hidden');
         displayTodayInSpace(data);
      } else {
         failedLoadImageForTodayInSpace();
      }
   } catch (error) {
      console.log(error);
      failedLoadImageForTodayInSpace();
   }
}
async function getLaunchesData() {
   try {
      var response = await fetch('https://ll.thespacedevs.com/2.3.0/launches/upcoming/?format=json');
      if (response.ok) {
         var data = await response.json();
         displayLaunch(data.results);
      }
   } catch (error) {
      console.log(error);
   }
}
async function getPlanetsData() {
   try {
      var response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets');
      if (response.ok) {
         var data = await response.json();
         planetsData = data.bodies;
         displayPlanets(planetsData);
      }
   } catch (error) {
      console.log(error);
   }
}
(async function () {
   await getTodayInSpaceData(formatDateForInput(new Date()));
   await getLaunchesData();
   await getPlanetsData();
})();

// todayInSpaceButtons
(function () {
   var input = todayInSpaceElements()['input'];
   var btnLoad = todayInSpaceElements()['btnLoad'];
   var btnToday = todayInSpaceElements()['btnToday'];

   input.addEventListener('change', function () {
      var date = input.value;
      input.nextElementSibling.innerHTML = formatDateUsMonthShort(date);
   });
   btnLoad.addEventListener('click', async function () {
      var date = input.value;
      if (isSameDate(input.getAttribute('date-select'), date)) return;
      await getTodayInSpaceData(formatDateForInput(date));
   });
   btnToday.addEventListener('click', async function () {
      if (isSameDate(input.getAttribute('date-select'), new Date())) return;
      await getTodayInSpaceData(formatDateForInput(new Date()));
   });
})();

// Elements section
function todayInSpaceElements() {
   return {
      input: document.querySelector('#apod-date-input'),
      btnLoad: document.querySelector('#load-date-btn'),
      btnToday: document.querySelector('#today-apod-btn'),

      apodImageContainer: document.querySelector('#apod-image-container'),
      apodLoading: document.querySelector('#apod-loading'),
      apodImage: document.querySelector('#apod-image'),
      apodVideo: document.querySelector('#apod-video'),
      apodFailed: document.querySelector('#apod-failed'),

      apod: document.querySelector('#apod-date'),
      title: document.querySelector('#apod-title'),
      dateDetail: document.querySelector('#apod-date-detail'),
      explanation: document.querySelector('#apod-explanation'),
      copyright: document.querySelector('#apod-copyright'),
      dateInfo: document.querySelector('#apod-date-info'),
      mediaType: document.querySelector('#apod-media-type'),
   };
}
function launchElements() {
   return {
      featured: document.querySelector('[id="featured-launch"]'),
      upcoming: document.querySelector('[id="launches-grid"]'),
   };
}
function planetsElements() {
   return {
      explore: document.getElementById('planets-grid'),
      details: document.getElementById('planetDetails'),
      planetComparison: document.querySelector('[id = "planet-comparison-tbody"]'),
   };
}

// Containers section
function todayInSpaceContainers() {
   function image(item) {
      return `
                           <img  class="w-full h-full object-cover" src="${item.url}" onerror="failedLoadImageForTodayInSpace()" alt="${item.title}" />
                           <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div class="absolute bottom-6 left-6 right-6">
                                 <a href="${item.hdurl}" target="_blank" class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors block text-center">
                                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                                 </a>
                              </div>
                           </div>
      `;
   }
   function video(item) {
      return `
                           <iframe class="w-full h-full" onerror="failedLoadImageForTodayInSpace()" src="${item.url}"></iframe>`;
   }

   return {
      image,
      video,
   };
}
function launchContainers() {
   function featured(item) {
      return `
                  <!-- FEATURED LAUNCH -->
                  <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
                     <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                        <div class="flex flex-col justify-between">
                           <div>
                              <div class="flex items-center gap-3 mb-4">
                                 <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <i class="fas fa-star"></i>
                                    Featured Launch
                                 </span>
                                 <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"> Go </span>
                              </div>

                              <h3 class="text-3xl font-bold mb-3 leading-tight">${item.name}</h3>

                              <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                                 <div class="flex items-center gap-2">
                                    <i class="fas fa-building"></i>
                                    <span>${item.launch_service_provider.name}</span>
                                 </div>
                                 <div class="flex items-center gap-2">
                                    <i class="fas fa-rocket"></i>
                                    <span>${item.rocket.configuration.name}</span>
                                 </div>
                              </div>

                           ${
                              daysUntilLaunch(item.net) === -1
                                 ? ''
                                 : `<div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                                 <i class="fas fa-clock text-2xl text-blue-400"></i>
                                 <div>
                                    <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch(item.net)}</p>
                                    <p class="text-xs text-slate-400">Days Until Launch</p>
                                 </div>
                              </div>`
                           }

                              <div class="grid xl:grid-cols-2 gap-4 mb-6">
                                 <div class="bg-slate-900/50 rounded-xl p-4">
                                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                                       <i class="fas fa-calendar"></i>
                                       Launch Date
                                    </p>
                                    <p class="font-semibold">${formatFullDateUs(item.net)}</p>
                                 </div>

                                 <div class="bg-slate-900/50 rounded-xl p-4">
                                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                                       <i class="fas fa-clock"></i>
                                       Launch Time
                                    </p>
                                    <p class="font-semibold">${formatTime(item.net)} UTC</p>
                                 </div>

                                 <div class="bg-slate-900/50 rounded-xl p-4">
                                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                                       <i class="fas fa-map-marker-alt"></i>
                                       Location
                                    </p>
                                    <p class="font-semibold text-sm">${item.pad.location.name}</p>
                                 </div>

                                 <div class="bg-slate-900/50 rounded-xl p-4">
                                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                                       <i class="fas fa-globe"></i>
                                       Country
                                    </p>
                                    <p class="font-semibold">${item.pad.country.name}</p>
                                 </div>
                              </div>

                              <p class="text-slate-300 leading-relaxed mb-6">${item.mission.description}</p>
                           </div>

                           <div class="flex flex-col md:flex-row gap-3">
                              <button
                                 class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                              >
                                 <i class="fas fa-info-circle"></i>
                                 View Full Details
                              </button>

                              <div class="icons self-end md:self-center">
                                 <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                                    <i class="far fa-heart"></i>
                                 </button>

                                 <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                                    <i class="fas fa-bell"></i>
                                 </button>
                              </div>
                           </div>
                        </div>

                        <div class="relative">
                           <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">   
                                                      
                              ${
                                 item.image
                                    ? `
                              <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent">
                                 <img class="object-cover h-full w-full"
                                    src="${item.image.image_url || './assets/images/launch-placeholder.png'}"
                                    alt="${item.image.name || 'Launch image'}"
                                    onerror="this.src='./assets/images/launch-placeholder.png'">
                              </div>`
                                    : `
                              <div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800">
                                 <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                              </div>`
                              }
                           </div>
                        </div>
                     </div>
                  </div>`;
   }
   function upcoming(item) {
      return `
                  <!-- STATIC LAUNCH CARD 1 -->
                  <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all  group cursor-pointer">
                     <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
                     ${
                        item.image
                           ? `
                        <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent">
                           <img
                              class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500 "
                              src="${item.image.image_url || './assets/images/launch-placeholder.png'}"
                              alt="${item.image.name || 'Launch image'}"
                              onerror="this.src='./assets/images/launch-placeholder.png'"
                           />
                        </div>`
                           : '<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>'
                     }
                        <div class="absolute top-3 right-3">
                           <span class="px-3 py-1 text-white bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold">${item.status.abbrev}</span>
                        </div>
                     </div>

                     <div class="p-5">
                        <div class="mb-3">
                           <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${item.name}</h4>
                           <p class="text-sm text-slate-400 flex items-center gap-2">
                              <i class="fas fa-building text-xs"></i>
                              ${item.launch_service_provider.name}
                           </p>
                        </div>

                        <div class="space-y-2 mb-4">
                           <div class="flex items-center gap-2 text-sm">
                              <i class="fas fa-calendar text-slate-500 w-4"></i>
                              <span class="text-slate-300">${formatDateUsMonthShort(item.net)}</span>
                           </div>
                           <div class="flex items-center gap-2 text-sm">
                              <i class="fas fa-clock text-slate-500 w-4"></i>
                              <span class="text-slate-300">${formatTime(item.net)} UTC</span>
                           </div>
                           <div class="flex items-center gap-2 text-sm">
                              <i class="fas fa-rocket text-slate-500 w-4"></i>
                              <span class="text-slate-300">${item.rocket.configuration.full_name}</span>
                           </div>
                           <div class="flex items-center gap-2 text-sm">
                              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                              <span class="text-slate-300 line-clamp-1">${item.pad.location.name}</span>
                           </div>
                        </div>

                        <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                           <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
                           <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                              <i class="far fa-heart"></i>
                           </button>
                        </div>
                     </div>
                  </div>
      `;
   }
   return {
      featured,
      upcoming,
   };
}
function planetsContainers() {
   function explore(item) {
      return `
                     <!-- ${item.englishName} -->
                  <div 
                     onclick="displayPlanetDetails('${item.id}')"
                     class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
                     data-planet-id="${item.englishName.toLowerCase()}"
                     style="--planet-color:${
                        item.id === 'mercure'
                           ? '#eab308'
                           : item.id === 'venus'
                           ? '#f97316'
                           : item.id === 'terre'
                           ? '#3b82f6'
                           : item.id === 'mars'
                           ? '#ef4444'
                           : item.id === 'jupiter'
                           ? '#fb923c'
                           : item.id === 'saturne'
                           ? '#facc15'
                           : item.id === 'uranus'
                           ? '#06b6d4'
                           : '#2563eb'
                     }"
                     onmouseover="this.style.borderColor='${
                        item.id === 'mercure'
                           ? '#eab30880'
                           : item.id === 'venus'
                           ? '#f9731680'
                           : item.id === 'terre'
                           ? '#3b82f680'
                           : item.id === 'mars'
                           ? '#ef444480'
                           : item.id === 'jupiter'
                           ? '#fb923c80'
                           : item.id === 'saturne'
                           ? '#facc1580'
                           : item.id === 'uranus'
                           ? '#06b6d480'
                           : '#2563eb80'
                     }'"
                     onmouseout="this.style.borderColor='#334155'"
                  >
                     <div class="relative mb-3 h-24 flex items-center justify-center">
                        <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform" src="./assets/images/${item.englishName.toLowerCase()}.png" alt="${
         item.englishName
      }" />
                     </div>
                     <h4 class="font-semibold text-center text-sm ">${item.englishName}</h4>
                     <p class="text-xs text-slate-400 text-center">${calcAU(item.semimajorAxis)} AU</p>
                  </div>`;
   }
   function planetDetails(item) {
      return `
                  <div class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                     <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
                        <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                           <img
                              id="planet-detail-image"
                              class="w-full h-full object-contain"
                              src="./assets/images/${item.englishName.toLowerCase()}.png"
                              alt="${item.englishName}"
                           />
                        </div>
                        <div class="flex-1">
                           <div class="flex items-center justify-between mb-3 md:mb-4">
                              <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">${item.englishName}</h3>
                              <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                                 <i class="far fa-heart"></i>
                              </button>
                           </div>
                           <p id="planet-detail-description" class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">${item.description}</p>
                        </div>
                     </div>

                     <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-ruler text-xs"></i>
                              <span class="text-xs">Semimajor Axis</span>
                           </p>
                           <p id="planet-distance" class="text-sm md:text-lg font-semibold">${(item.semimajorAxis / 1000000).toFixed(1)}M km</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-circle"></i>
                              Mean Radius
                           </p>
                           <p id="planet-radius" class="text-lg font-semibold">${(item.meanRadius / 1000).toFixed(3)} km</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-weight"></i>
                              Mass
                           </p>
                           <p id="planet-mass" class="text-lg font-semibold">${item.mass.massValue.toFixed(2)} × 10<sup>${item.mass.massExponent}</sup> kg</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-compress"></i>
                              Density
                           </p>
                           <p id="planet-density" class="text-lg font-semibold">${item.density.toFixed(2)}g/cm³</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-sync-alt"></i>
                              Orbital Period
                           </p>
                           <p id="planet-orbital-period" class="text-lg font-semibold">${item.sideralOrbit.toFixed(2)} days</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-redo"></i>
                              Rotation Period
                           </p>
                           <p id="planet-rotation" class="text-lg font-semibold">${Math.floor(item.sideralRotation)} hours</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-moon"></i>
                              Moons
                           </p>
                           <p id="planet-moons" class="text-lg font-semibold">${item.moons ? item.moons.length : 0}</p>
                        </div>

                        <div class="bg-slate-900/50 rounded-lg p-4">
                           <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                              <i class="fas fa-arrows-alt-v"></i>
                              Gravity
                           </p>
                           <p id="planet-gravity" class="text-lg font-semibold">${item.gravity} m/s²</p>
                        </div>
                     </div>
                  </div>

                  <div class="space-y-6">
                     <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                        <h4 class="font-semibold mb-4 flex items-center">
                           <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                           Discovery Info
                        </h4>
                        <div class="space-y-3 text-sm">
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Discovered By</span>
                              <span id="planet-discoverer" class="font-semibold text-right">${item.discoveredBy ? item.discoveredBy : 'Known since antiquity'}</span>
                           </div>
=
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Discovery Date</span>
                              <span id="planet-discovery-date" class="font-semibold">${item.discoveryDate ? item.discoveryDate : 'Ancient times'}</span>
                           </div>

                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Body Type</span>
                              <span id="planet-body-type" class="font-semibold">${item.bodyType}</span>
                           </div>

                           <div class="flex justify-between items-center py-2">
                              <span class="text-slate-400">Volume</span>
                              <span id="planet-volume" class="font-semibold">${item.vol.volValue} × 10^${item.vol.volExponent} km³</span>
                           </div>
                        </div>
                     </div>

                     <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                        <h4 class="font-semibold mb-4 flex items-center">
                           <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                           Quick Facts
                        </h4>
                        <ul id="planet-facts" class="space-y-3 text-sm">
                           <li class="flex items-start">
                              <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                              <span class="text-slate-300">Mass: ${item.mass.massValue.toFixed(3)} × 10^${item.mass.massExponent} kg</span>
                           </li>
                           <li class="flex items-start">
                              <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                              <span class="text-slate-300">Surface gravity: ${item.gravity} m/s²</span>
                           </li>
                           <li class="flex items-start">
                              <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                              <span class="text-slate-300">Density: ${item.density} g/cm³</span>
                           </li>
                           <li class="flex items-start">
                              <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                              <span class="text-slate-300">Axial tilt: ${item.axialTilt}°</span>
                           </li>
                        </ul>
                     </div>

                     <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                        <h4 class="font-semibold mb-4 flex items-center">
                           <i class="fas fa-satellite text-blue-400 mr-2"></i>
                           Orbital Characteristics
                        </h4>
                        <div class="space-y-3 text-sm">
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Perihelion</span>
                              <span id="planet-perihelion" class="font-semibold">${(item.perihelion / 1000000).toFixed(1)}M km</span>
                           </div>
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Aphelion</span>
                              <span id="planet-aphelion" class="font-semibold">${(item.aphelion / 1000000).toFixed(1)}M km</span>
                           </div>
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Eccentricity</span>
                              <span id="planet-eccentricity" class="font-semibold">${item.eccentricity}</span>
                           </div>
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Inclination</span>
                              <span id="planet-inclination" class="font-semibold">${item.inclination ? item.inclination + '°' : 'N/A'}</span>
                           </div>
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Axial Tilt</span>
                              <span id="planet-axial-tilt" class="font-semibold">${item.axialTilt.toFixed(2)}°</span>
                           </div>
                           <div class="flex justify-between items-center py-2 border-b border-slate-700">
                              <span class="text-slate-400">Avg Temperature</span>
                              <span id="planet-temp" class="font-semibold">${item.avgTemp ? item.avgTemp + '°C' : 'N/A'}</span>
                           </div>
                           <div class="flex justify-between items-center py-2">
                              <span class="text-slate-400">Escape Velocity</span>
                              <span id="planet-escape" class="font-semibold">${(item.escape / 1000).toFixed(2)} km/s</span>
                           </div>
                        </div>
                     </div>
                     <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"><i class="fas fa-book mr-2"></i>Learn More</button>
                  </div>`;
   }
   function planetComparison(item) {
      return `
                              <!-- ${item.englishName} -->
                              <tr class="hover:bg-slate-800/30 transition-colors">
                                 <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                                    <div class="flex items-center space-x-2 md:space-x-3">
                                       <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color:${
                                          item.id === 'mercure'
                                             ? '#eab308'
                                             : item.id === 'venus'
                                             ? '#f97316'
                                             : item.id === 'terre'
                                             ? '#3b82f6'
                                             : item.id === 'mars'
                                             ? '#ef4444'
                                             : item.id === 'jupiter'
                                             ? '#fb923c'
                                             : item.id === 'saturne'
                                             ? '#facc15'
                                             : item.id === 'uranus'
                                             ? '#06b6d4'
                                             : '#2563eb'
                                       } "></div>
                                       <span class="font-semibold text-sm md:text-base whitespace-nowrap">${item.englishName}</span>
                                    </div>
                                 </td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${calcAU(item.semimajorAxis)}</td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${calcDiameter(item.equaRadius, item.polarRadius)}4,879</td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${calcMass(item.mass)}</td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${calcOrbitalPeriod(item.sideralOrbit)}</td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${item.moons ? item.moons.length : 0}</td>
                                 <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200" style="${
                                       item.type === 'Ice Giant'
                                          ? 'background-color: #3b82f680; color: #60a5fa'
                                          : item.type === 'Gas Giant'
                                          ? 'background-color: #a855f780; color: #c084fc'
                                          : 'background-color: #f9731680; color: #fb923c'
                                    }">${item.type}</span>
                                 </td>
                              </tr>`;
   }
   return { explore, planetComparison, planetDetails };
}

// display
function displayTodayInSpace(data) {
   var elements = todayInSpaceElements();
   var container = todayInSpaceContainers();

   elements.apod.innerHTML = 'Astronomy Picture of the Day - ' + `${formatDateUs(data.date)}`;
   elements.title.innerHTML = `${data.title}`;
   elements.dateDetail.innerHTML = '<i class="far fa-calendar mr-2"></i>' + `${formatDateUs(data.date)}`;
   elements.explanation.innerHTML = `${data.explanation}`;
   elements.copyright.innerHTML = '&copy; ' + `${data.copyright}`;
   elements.dateInfo.innerHTML = `${formatDateUs(data.date)}`;
   elements.mediaType.innerHTML = `${data.media_type}`;

   if (data.media_type === 'video') {
      todayInSpaceElements().apodFailed.classList.add('hidden');
      todayInSpaceElements().apodVideo.classList.remove('hidden');
      elements.apodVideo.innerHTML = container.video(data);
   } else {
      elements.apodImage.innerHTML = container.image(data);
      todayInSpaceElements().apodFailed.classList.add('hidden');
      todayInSpaceElements().apodImage.classList.remove('hidden');
   }
}
function displayLaunch(data) {
   var elements = launchElements();
   var container = launchContainers();
   var cartonaFeatured = container.featured(data[0]);
   var cartonaUpcoming = '';

   for (var i = 1; (i < data.length) & (i < 10); i++) {
      cartonaUpcoming += container.upcoming(data[i]);
   }

   elements.featured.innerHTML = cartonaFeatured;
   elements.upcoming.innerHTML = cartonaUpcoming;
}
function displayPlanets(data) {
   var elements = planetsElements();
   var container = planetsContainers();
   var cartonaExplore = '';
   var cartonaPlanetComparison = '';

   for (var i = 0; i < data.length && i < 8; i++) {
      cartonaExplore += container.explore(data[i]);
      cartonaPlanetComparison += container.planetComparison(data[i]);
   }

   elements.explore.innerHTML = cartonaExplore;
   elements.planetComparison.innerHTML = cartonaPlanetComparison;
   displayPlanetDetails(-1);
}
function displayPlanetDetails(id) {
   var index = searchByID(id, planetsData);
   if (index > -1) planetsElements().details.innerHTML = planetsContainers().planetDetails(planetsData[index]);
   else planetsElements().details.innerHTML = planetsContainers().planetDetails(planetsData[0]);
}

// search
function searchByID(id, data) {
   for (var i = 0; i < data.length; i++) {
      if (id === data[i].id) {
         return i;
      }
   }
   return -1;
}

// date & time
function formatFullDateUs(date) {
   // Friday, December 26, 2025
   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
}
function formatDateUsMonthShort(date) {
   // Dec 26, 2025
   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });
}
function formatDateUs(date) {
   // December 26, 2025
   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
}
function formatTime(date) {
   const d = new Date(date);
   return d.toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
   });
}
function daysUntilLaunch(date) {
   var today = new Date();
   var launch = new Date(date);
   var res = Math.ceil((launch - today) / (1000 * 60 * 60 * 24));
   if (res <= 0) return -1;
   else res;
}
function formatDateForInput(date) {
   var now = new Date();
   date = new Date(date);

   if (isSameDate(date, now) && date.getHours() > 0 && date.getHours() < 8) date.setDate(date.getDate() - 1);
   date = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
   return date;
}
function isSameDate(d1, d2) {
   d1 = new Date(d1);
   d2 = new Date(d2);
   return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}

// calc numbers
function calcDiameter(equaRadius, polarRadius) {
   var result = (equaRadius + polarRadius) / 10000;
   return result.toFixed(0);
}
function calcMass(mass) {
   var result = (mass.massValue * Math.pow(10, mass.massExponent)) / (5.972 * Math.pow(10, 24));
   return result.toFixed(2);
}
function calcOrbitalPeriod(sideralOrbit) {
   if (sideralOrbit <= 250) {
      return `${sideralOrbit.toFixed(1)} days`;
   }

   var result = sideralOrbit / 365.25;
   return `${result.toFixed(1)} years`;
}
function calcAU(semimajorAxis) {
   var result = semimajorAxis / 149597870.7;
   return result.toFixed(2);
}

// ------
function failedLoadImageForTodayInSpace() {
   todayInSpaceElements().apodLoading.classList.add('hidden');
   todayInSpaceElements().apodImage.classList.add('hidden');
   todayInSpaceElements().apodVideo.classList.add('hidden');
   todayInSpaceElements().apodFailed.classList.remove('hidden');
}
function setInputValueForTodayInSpace(date) {
   todayInSpaceElements().input.value = date;
   todayInSpaceElements().input.nextElementSibling.innerHTML = formatDateUs(date);
   todayInSpaceElements().input.setAttribute('date-select', date);
}
function setLoadImageForTodayInSpace() {
   todayInSpaceElements().apod.innerHTML = 'Astronomy Picture of the Day - Loading...';
   todayInSpaceElements().apodLoading.classList.remove('hidden');
   todayInSpaceElements().apodImage.classList.add('hidden');
   todayInSpaceElements().apodFailed.classList.add('hidden');
   todayInSpaceElements().apodVideo.classList.add('hidden');
}
