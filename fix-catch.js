const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./app').concat(walk('./lib'), walk('./components'));
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (c.includes('catch (error: any)')) {
    c = c.replace(/catch \(error: any\)/g, 'catch (error: unknown)');
    // replace error.message if any
    c = c.replace(/error\.message/g, '(error as Error).message');
    changed = true;
  }
  
  if (c.includes('(err: any)')) {
    c = c.replace(/\(err: any\)/g, '(err: unknown)');
    c = c.replace(/err\.message/g, '(err as Error).message');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, c);
  }
});
console.log('Done replacing catch (error: any)');
