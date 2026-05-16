export const gameIcons = [
    { name: 'GTAV', color: '#1a1a1a', image: 'https://i.pinimg.com/736x/8f/01/03/8f010359c57da7850e723fa17a53b55e.jpg', top: '15%', left: '8%', size: 70 },
    { name: 'Euro Truck', color: '#c8102e', image: 'https://res.cloudinary.com/dk28vshae/image/upload/q_auto/f_auto/v1778946033/pngegg.png', top: '25%', left: '85%', size: 65 },
    { name: 'Minecraft', color: '#5d8c38', image: 'https://static.wikia.nocookie.net/logopedia/images/a/ab/Minecraft_2009_icon.svg/revision/latest?cb=20240128230646', top: '60%', left: '78%', size: 75 },
    { name: 'FC Mobile', color: '#0f2d8b', image: 'https://play-lh.googleusercontent.com/yQHb1bk88ENXLZ2_ZO-st7cuG78pva5yRAge2CjhBPoBoEng1ouxyx30vK4s4Z7553Kohd9pPVm1GC2Phs8slA=w240-h480-rw', top: '75%', left: '5%', size: 68 },
    { name: 'DLS', color: '#111111', image: 'https://img.utdstc.com/icon/738/d1c/738d1c45c4f040a3f5eb97f3eefa57b377db51655c3468006fd2f852237fba53:600', top: '80%', left: '90%', size: 60 },
    { name: 'Farming Sim', color: '#f4c430', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlmCni26B4i8-F-5GxsR-4dnWB1xV7c0Ive6FD3DeLfWv7BJ-UctkI_0JLlsIbOhnP2nbMQ&s=10', top: '20%', left: '34%', size: 55 },
    { name: 'Assetto Corsa', color: '#e10600', image: 'https://image.api.playstation.com/cdn/EP4040/CUSA01797_00/NMcAucyANMnYMNkz6V5vk9f5YXty2mCz.png', top: '45%', left: '-5%', size: 58 },
    { name: 'BeamNG', color: '#e0e0e0', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7oWSzMhvGgdiNux7SmBMI9ywWT0aEmaloePnygw-4_SMYIw4MMHRv_uqR2Daapp-EkB_Ag&s=10", top: '45%', left: '92%', size: 62 },
];

export const allGames = [
    { title: 'GTAV Mobile',downloadlink:"", img: 'https://i.pinimg.com/736x/8f/01/03/8f010359c57da7850e723fa17a53b55e.jpg', color: 'bg-gray-100', rank: 1, slug: 'gtav-mobile' },
    { title: 'Euro Truck Simulator 2 Mobile', downloadlink:"", img: 'https://res.cloudinary.com/dk28vshae/image/upload/q_auto/f_auto/v1778946033/pngegg.png', color: 'bg-red-50', rank: 2, slug: 'euro-truck-simulator-2-mobile' },
    { title: 'Minecraft (Ultra Graphics + Online)', downloadlink:"", img: 'https://static.wikia.nocookie.net/logopedia/images/a/ab/Minecraft_2009_icon.svg/revision/latest?cb=20240128230646', color: 'bg-green-50', rank: 3, slug: 'minecraft-ultra-graphics-online' },
    { title: 'BeamNG Drive Mobile', downloadlink:"", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7oWSzMhvGgdiNux7SmBMI9ywWT0aEmaloePnygw-4_SMYIw4MMHRv_uqR2Daapp-EkB_Ag&s=10", color: 'bg-gray-50', rank: 4, slug: 'beamng-drive-mobile' },
    { title: 'FC Mobile 26 + DLS 26 (Mod Menu)', downloadlink:"", img: 'https://play-lh.googleusercontent.com/yQHb1bk88ENXLZ2_ZO-st7cuG78pva5yRAge2CjhBPoBoEng1ouxyx30vK4s4Z7553Kohd9pPVm1GC2Phs8slA=w240-h480-rw', color: 'bg-blue-50', rank: 5, slug: 'fc-mobile-26-dls-26-mod-menu' },
    { title: 'Farming Simulator 25 + Assetto Corsa', downloadlink:"", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlmCni26B4i8-F-5GxsR-4dnWB1xV7c0Ive6FD3DeLfWv7BJ-UctkI_0JLlsIbOhnP2nbMQ&s=10', color: 'bg-yellow-50', rank: 6, slug: 'farming-simulator-25-assetto-corsa' },
];

export const simulationGames = [allGames[1], allGames[5]];
export const racingGames = [allGames[3]];
export const sportsGames = [allGames[4]];

export const journeyData = [
    { title: 'Mod Menu Preview', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=800&fit=crop', desc: 'See exactly what mods are included before you download. Unlimited money, unlocked cars, and more.' },
    { title: 'Installation Guide', img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=800&fit=crop', desc: 'Step-by-step video walkthrough showing how to install the APK and enable mod menus on your device.' },
];

export const featuresData = [
    { title: 'One-Click Download', desc: 'Get your modded APK instantly after completing the quick unlock step.', img: '/images/feature-1.jpeg' },
    { title: 'Mod Menu Included', desc: 'Every download comes with a built-in mod menu for unlimited resources.', img: '/images/feature-2.jpeg' },
    { title: 'Online Ready', desc: 'Most mods support online multiplayer. Play with friends using unlocked items.', img: '/images/feature-3.jpeg' },
];