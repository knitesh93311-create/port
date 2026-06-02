// Icon Resolver: Maps icon name strings (from backend/admin) to actual React icon components.
// This solves the issue where the admin panel stores icons as strings like "FaReact"
// but the frontend components expect actual React component references.

import {
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaAws, FaDatabase, FaServer, FaCode,
  FaMobileAlt, FaSearchPlus, FaBrain, FaShoppingBag, FaComments, FaBriefcase, FaGraduationCap,
  FaProjectDiagram, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp, FaAngular, FaVuejs,
  FaLinux, FaWindows, FaApple, FaChrome, FaFirefox, FaSafari, FaSlack, FaTrello, FaJira,
  FaFigma, FaSketch, FaWordpress, FaShopify, FaStripe, FaPaypal, FaCloudflare,
  FaLock, FaShieldAlt, FaRocket, FaCogs, FaTerminal, FaDesktop, FaLaptopCode,
  FaPalette, FaPencilAlt, FaChartLine, FaChartBar, FaSitemap, FaPlug, FaCubes, FaLayerGroup
} from 'react-icons/fa';

import {
  SiMongodb, SiExpress, SiRedux, SiTailwindcss, SiPostman, SiFirebase, SiMysql,
  SiJavascript, SiHtml5, SiCss, SiNextdotjs, SiTypescript, SiGraphql, SiVercel,
  SiNetlify, SiHeroku, SiDigitalocean, SiNginx, SiRedis, SiPostgresql, SiPrisma,
  SiSocketdotio, SiJsonwebtokens, SiSwagger, SiJest, SiCypress, SiStorybook,
  SiWebpack, SiVite, SiBabel, SiEslint, SiPrettier, SiGitlab, SiBitbucket,
  SiNotion, SiObsidian, SiFigma
} from 'react-icons/si';

// Master map: string name → React component
const iconMap = {
  // FontAwesome icons
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaAws, FaDatabase, FaServer, FaCode,
  FaMobileAlt, FaSearchPlus, FaBrain, FaShoppingBag, FaComments, FaBriefcase, FaGraduationCap,
  FaProjectDiagram, FaHtml5, FaCss3Alt, FaPython, FaJava, FaPhp, FaAngular, FaVuejs,
  FaLinux, FaWindows, FaApple, FaChrome, FaFirefox, FaSafari, FaSlack, FaTrello, FaJira,
  FaFigma, FaSketch, FaWordpress, FaShopify, FaStripe, FaPaypal, FaCloudflare,
  FaLock, FaShieldAlt, FaRocket, FaCogs, FaTerminal, FaDesktop, FaLaptopCode,
  FaPalette, FaPencilAlt, FaChartLine, FaChartBar, FaSitemap, FaPlug, FaCubes, FaLayerGroup,

  // Simple Icons
  SiMongodb, SiExpress, SiRedux, SiTailwindcss, SiPostman, SiFirebase, SiMysql,
  SiJavascript, SiHtml5, SiCss, SiNextdotjs, SiTypescript, SiGraphql, SiVercel,
  SiNetlify, SiHeroku, SiDigitalocean, SiNginx, SiRedis, SiPostgresql, SiPrisma,
  SiSocketdotio, SiJsonwebtokens, SiSwagger, SiJest, SiCypress, SiStorybook,
  SiWebpack, SiVite, SiBabel, SiEslint, SiPrettier, SiGitlab, SiBitbucket,
  SiNotion, SiObsidian, SiFigma,
};

/**
 * Resolves an icon name string to the corresponding React icon component.
 * Returns FaCode as fallback if the icon is not found.
 *
 * @param {string} iconName - The name of the icon (e.g., "FaReact", "SiMongodb")
 * @returns {React.ComponentType} The resolved React icon component
 */
export function resolveIcon(iconName) {
  if (!iconName || typeof iconName !== 'string') return FaCode;
  return iconMap[iconName] || FaCode;
}

/**
 * Resolves the `iconName` field on an item to an `icon` field with the actual component.
 * Handles both `icon` (already a component) and `iconName` (string from backend) fields.
 *
 * @param {Object} item - The data object with iconName or icon field
 * @returns {Object} The item with a resolved `icon` field
 */
export function resolveItemIcon(item) {
  if (!item) return item;
  
  // If `icon` is already a function (React component), keep it
  if (typeof item.icon === 'function') return item;
  
  // If iconName exists as a string, resolve it
  if (item.iconName && typeof item.iconName === 'string') {
    return { ...item, icon: resolveIcon(item.iconName) };
  }
  
  // If icon is a string, resolve it
  if (item.icon && typeof item.icon === 'string') {
    return { ...item, icon: resolveIcon(item.icon) };
  }
  
  // Fallback: set icon to FaCode
  return { ...item, icon: FaCode };
}

/**
 * Resolves icons for a skills data structure (with categories).
 * @param {Object} skillsObj - Object with category keys like { frontend: [...], backend: [...] }
 * @returns {Object} The skills object with all icons resolved
 */
export function resolveSkillsIcons(skillsObj) {
  if (!skillsObj || typeof skillsObj !== 'object') return skillsObj;
  
  const resolved = {};
  for (const [category, skills] of Object.entries(skillsObj)) {
    if (Array.isArray(skills)) {
      resolved[category] = skills.map(resolveItemIcon);
    } else {
      resolved[category] = skills;
    }
  }
  return resolved;
}

export default iconMap;
