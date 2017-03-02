import settings from '../settings.json';

function checkRule(urlRules, excludeUrlRules, url) {
  let i;
  let rule;

  for (i = 0; i < excludeUrlRules.length; i += 1) {
    rule = excludeUrlRules[i];
    if (rule) {
      const regex = new RegExp(rule);

      if (regex.test(url)) {
        return false;
      }
    }
  }

  for (i = 0; i < urlRules.length; i += 1) {
    rule = urlRules[i];
    if (rule) {
      const regex = new RegExp(rule);

      if (regex.test(url)) {
        return true;
      }
    }
  }

  return false;
}

export default function shouldBlock(url) {
  const { urlRules = [], excludeUrlRules = [] } = settings;

  if (!urlRules) {
    return true;
  }

  return checkRule(urlRules, excludeUrlRules, url);
}
