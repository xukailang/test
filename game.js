// ==================== 游戏数据结构 ====================

// 职业配置
const classConfig = {
    warrior: {
        name: '战士',
        avatar: '⚔️',
        hp: 150,
        maxHp: 150,
        mp: 50,
        maxMp: 50,
        attack: 15,
        defense: 10,
        skills: [
            { id: 'heavy_strike', name: '重击', desc: '造成150%伤害', mpCost: 15, level: 1, maxLevel: 5 },
            { id: 'iron_wall', name: '铁壁', desc: '提升50%防御3回合', mpCost: 20, level: 0, maxLevel: 5 },
            { id: 'berserk', name: '狂暴', desc: '连续攻击3次，每次70%伤害', mpCost: 30, level: 0, maxLevel: 5 }
        ]
    },
    mage: {
        name: '法师',
        avatar: '🔮',
        hp: 80,
        maxHp: 80,
        mp: 150,
        maxMp: 150,
        attack: 8,
        defense: 3,
        skills: [
            { id: 'fireball', name: '火球术', desc: '造成200%魔法伤害', mpCost: 20, level: 1, maxLevel: 5 },
            { id: 'freeze', name: '冰冻', desc: '降低敌人50%攻击3回合', mpCost: 25, level: 0, maxLevel: 5 },
            { id: 'magic_storm', name: '魔法风暴', desc: '造成300%伤害', mpCost: 40, level: 0, maxLevel: 5 }
        ]
    },
    rogue: {
        name: '刺客',
        avatar: '🗡️',
        hp: 100,
        maxHp: 100,
        mp: 80,
        maxMp: 80,
        attack: 12,
        defense: 5,
        skills: [
            { id: 'backstab', name: '背刺', desc: '造成200%暴击伤害', mpCost: 18, level: 1, maxLevel: 5 },
            { id: 'dodge', name: '闪避', desc: '回避下次攻击', mpCost: 15, level: 0, maxLevel: 5 },
            { id: 'combo', name: '致命连击', desc: '5次快速攻击，每次50%伤害', mpCost: 35, level: 0, maxLevel: 5 }
        ]
    }
};

// 玩家数据
let player = {
    class: null,
    className: '',
    level: 1,
    exp: 0,
    maxExp: 100,
    hp: 100,
    maxHp: 100,
    mp: 100,
    maxMp: 100,
    attack: 10,
    defense: 5,
    gold: 0,
    skillPoints: 0,
    skills: [],
    inventory: [],
    equipment: {
        weapon: null,
        armor: null,
        helmet: null
    },
    buffs: {
        defenseBoost: 0,
        attackDebuff: 0,
        dodgeNext: false
    }
};

// 怪物模板数据
const monsterTemplates = [
    { name: "史莱姆", avatar: "👹", level: 1, hp: 50, attack: 5, defense: 2, exp: 20, gold: 10 },
    { name: "哥布林", avatar: "👺", level: 2, hp: 80, attack: 8, defense: 3, exp: 35, gold: 20 },
    { name: "骷髅兵", avatar: "💀", level: 3, hp: 120, attack: 12, defense: 5, exp: 50, gold: 30 },
    { name: "狼人", avatar: "🐺", level: 4, hp: 150, attack: 15, defense: 7, exp: 70, gold: 45 },
    { name: "兽人战士", avatar: "👹", level: 5, hp: 200, attack: 20, defense: 10, exp: 100, gold: 60 },
    { name: "暗影刺客", avatar: "🥷", level: 6, hp: 180, attack: 25, defense: 8, exp: 120, gold: 75 },
    { name: "恶魔", avatar: "😈", level: 7, hp: 250, attack: 30, defense: 12, exp: 150, gold: 100 },
    { name: "巨龙", avatar: "🐉", level: 10, hp: 500, attack: 50, defense: 20, exp: 300, gold: 200 }
];

// 装备模板数据
const itemTemplates = [
    // 武器
    { name: "木剑", type: "weapon", rarity: "common", attack: 5, defense: 0, price: 50 },
    { name: "铁剑", type: "weapon", rarity: "rare", attack: 10, defense: 0, price: 100 },
    { name: "精钢剑", type: "weapon", rarity: "epic", attack: 20, defense: 0, price: 200 },
    { name: "龙骨剑", type: "weapon", rarity: "legendary", attack: 35, defense: 0, price: 500 },
    { name: "神圣之剑", type: "weapon", rarity: "legendary", attack: 50, defense: 5, price: 1000 },
    // 防具
    { name: "布甲", type: "armor", rarity: "common", attack: 0, defense: 3, price: 40 },
    { name: "皮甲", type: "armor", rarity: "rare", attack: 0, defense: 8, price: 80 },
    { name: "锁子甲", type: "armor", rarity: "epic", attack: 0, defense: 15, price: 180 },
    { name: "板甲", type: "armor", rarity: "legendary", attack: 0, defense: 25, price: 400 },
    { name: "龙鳞甲", type: "armor", rarity: "legendary", attack: 5, defense: 40, price: 900 },
    // 头盔
    { name: "布帽", type: "helmet", rarity: "common", attack: 0, defense: 2, price: 30 },
    { name: "铁盔", type: "helmet", rarity: "rare", attack: 0, defense: 5, price: 70 },
    { name: "魔法头盔", type: "helmet", rarity: "epic", attack: 5, defense: 10, price: 150 },
    { name: "王冠", type: "helmet", rarity: "legendary", attack: 10, defense: 20, price: 600 }
];

// 当前怪物
let currentMonster = null;

// 游戏统计
let gameStats = {
    monstersKilled: 0,
    itemsFound: 0
};

// 魔法恢复定时器
let mpRegenInterval = null;

// ==================== 战斗动画和特效系统 ====================

// 显示伤害数字
function showDamageNumber(damage, isPlayerDamage, isCritical = false, isHeal = false) {
    const container = document.getElementById('damage-numbers');
    const damageNum = document.createElement('div');
    damageNum.classList.add('damage-number');

    if (isCritical) {
        damageNum.classList.add('critical');
        damageNum.textContent = `${damage}!!`;
    } else if (isHeal) {
        damageNum.classList.add('heal');
        damageNum.textContent = `+${damage}`;
    } else {
        damageNum.classList.add(isPlayerDamage ? 'monster-damage' : 'player-damage');
        damageNum.textContent = damage;
    }

    // 随机位置偏移
    const randomOffset = Math.random() * 40 - 20;
    damageNum.style.top = `${40 + randomOffset}%`;

    container.appendChild(damageNum);

    // 1秒后移除
    setTimeout(() => {
        if (damageNum.parentNode) {
            damageNum.parentNode.removeChild(damageNum);
        }
    }, 1000);
}

// 创建粒子效果
function createParticles(x, y, type, count = 10) {
    const container = document.getElementById('effect-container');

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', type);

        // 随机方向
        const angle = (Math.random() * Math.PI * 2);
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        container.appendChild(particle);

        // 1秒后移除
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// 显示技能特效
function showSkillEffect(skillId, targetX, targetY) {
    const container = document.getElementById('effect-container');
    const effect = document.createElement('div');
    effect.classList.add('skill-effect');

    let effectIcon = '';
    let effectType = '';

    switch (skillId) {
        case 'heavy_strike':
        case 'berserk':
            effectIcon = '⚔️';
            effectType = 'slash';
            break;
        case 'iron_wall':
            effectIcon = '🛡️';
            effectType = 'slash';
            break;
        case 'fireball':
        case 'magic_storm':
            effectIcon = '🔥';
            effectType = 'fire';
            createParticles(targetX, targetY, 'fire', 15);
            break;
        case 'freeze':
            effectIcon = '❄️';
            effectType = 'ice';
            createParticles(targetX, targetY, 'ice', 15);
            break;
        case 'backstab':
        case 'combo':
            effectIcon = '🗡️';
            effectType = 'slash';
            break;
        case 'dodge':
            effectIcon = '💨';
            effectType = 'slash';
            break;
    }

    effect.classList.add(effectType);
    effect.textContent = effectIcon;
    effect.style.left = targetX + '%';
    effect.style.top = targetY + '%';

    container.appendChild(effect);

    // 1秒后移除
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1000);
}

// 播放攻击动画
function playAttackAnimation(isPlayer) {
    const character = document.getElementById(isPlayer ? 'player-battle-character' : 'monster-battle-character');
    const sprite = document.getElementById(isPlayer ? 'player-sprite' : 'monster-sprite');

    character.classList.add(isPlayer ? 'attack-animation' : 'monster-attack-animation');

    setTimeout(() => {
        character.classList.remove(isPlayer ? 'attack-animation' : 'monster-attack-animation');
    }, 500);

    // 创建打击粒子
    const x = isPlayer ? 65 : 35;
    const y = 50;
    setTimeout(() => {
        createParticles(x, y, 'hit', 8);
    }, 250);
}

// 播放受击动画
function playHitAnimation(isPlayer) {
    const character = document.getElementById(isPlayer ? 'player-battle-character' : 'monster-battle-character');
    const sprite = document.getElementById(isPlayer ? 'player-sprite' : 'monster-sprite');

    character.classList.add('hit-animation');
    sprite.classList.add('hit-flash');

    setTimeout(() => {
        character.classList.remove('hit-animation');
        sprite.classList.remove('hit-flash');
    }, 500);
}

// 播放死亡动画
function playDeathAnimation(isMonster = true) {
    const character = document.getElementById(isMonster ? 'monster-battle-character' : 'player-battle-character');

    character.classList.add('death-animation');

    setTimeout(() => {
        character.classList.remove('death-animation');
    }, 1000);
}

// 播放胜利动画
function playVictoryAnimation() {
    const character = document.getElementById('player-battle-character');
    character.classList.add('victory-animation');

    setTimeout(() => {
        character.classList.remove('victory-animation');
    }, 1000);
}

// 播放升级特效
function playLevelUpEffect() {
    const container = document.getElementById('effect-container');
    const effect = document.createElement('div');
    effect.classList.add('levelup-effect');

    container.appendChild(effect);

    // 创建升级粒子
    createParticles(35, 50, 'lightning', 20);

    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1500);
}

// 屏幕震动效果
function screenShake() {
    const battleScene = document.querySelector('.battle-scene');
    battleScene.classList.add('screen-shake');

    setTimeout(() => {
        battleScene.classList.remove('screen-shake');
    }, 500);
}

// ==================== 职业选择 ====================

function selectClass(className) {
    const config = classConfig[className];
    if (!config) return;

    player.class = className;
    player.className = config.name;
    player.hp = config.hp;
    player.maxHp = config.maxHp;
    player.mp = config.mp;
    player.maxMp = config.maxMp;
    player.attack = config.attack;
    player.defense = config.defense;
    player.skills = JSON.parse(JSON.stringify(config.skills)); // 深拷贝技能

    // 隐藏职业选择界面
    document.getElementById('class-selection').style.display = 'none';

    // 显示技能面板
    document.getElementById('skills-panel').style.display = 'block';

    // 开始魔法恢复
    startMpRegen();

    // 更新UI
    document.getElementById('player-avatar').textContent = config.avatar;
    document.getElementById('player-class').textContent = config.name;
    document.getElementById('player-sprite').textContent = config.avatar;

    // 生成怪物并更新UI
    currentMonster = generateMonster();
    updateUI();
    updateSkillList();

    addBattleLog(`✨ 你选择了 ${config.name} 职业！`);
    addBattleLog(`🎮 冒险开始了！你遇到了 ${currentMonster.name}！`);
}

// ==================== 技能系统 ====================

function updateSkillList() {
    const skillList = document.getElementById('skill-list');
    skillList.innerHTML = '';

    player.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-item');

        const damageBonus = (skill.level - 1) * 20;
        const currentCost = Math.max(5, skill.mpCost - skill.level + 1);

        skillDiv.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">Lv.${skill.level}/${skill.maxLevel}</span>
            </div>
            <div class="skill-desc">${skill.desc}</div>
            <div class="skill-cost">💧 消耗魔法: ${currentCost}</div>
            ${damageBonus > 0 ? `<div style="color: #27ae60; font-size: 0.9em;">⬆ 伤害加成: +${damageBonus}%</div>` : ''}
            <div class="skill-actions">
                <button class="btn-skill btn-use-skill" onclick="useSkill('${skill.id}')"
                    ${skill.level === 0 ? 'disabled' : ''}>
                    ✨ 使用技能
                </button>
                <button class="btn-skill btn-upgrade-skill" onclick="upgradeSkill('${skill.id}')"
                    ${player.skillPoints === 0 || skill.level >= skill.maxLevel ? 'disabled' : ''}>
                    ⬆ 升级 (1点)
                </button>
            </div>
        `;

        skillList.appendChild(skillDiv);
    });

    // 更新技能点显示
    if (player.skillPoints > 0) {
        document.getElementById('skill-points').style.display = 'inline';
        document.getElementById('skill-points-count').textContent = player.skillPoints;
    } else {
        document.getElementById('skill-points').style.display = 'none';
    }
}

function upgradeSkill(skillId) {
    const skill = player.skills.find(s => s.id === skillId);
    if (!skill) return;

    if (player.skillPoints === 0) {
        addBattleLog('❌ 没有技能点！');
        return;
    }

    if (skill.level >= skill.maxLevel) {
        addBattleLog('❌ 技能已达到最高等级！');
        return;
    }

    player.skillPoints--;
    skill.level++;

    addBattleLog(`⬆ ${skill.name} 升级到 Lv.${skill.level}！`);
    updateSkillList();
    updateUI();
}

function useSkill(skillId) {
    if (!currentMonster || currentMonster.hp <= 0) return;

    const skill = player.skills.find(s => s.id === skillId);
    if (!skill || skill.level === 0) return;

    const mpCost = Math.max(5, skill.mpCost - skill.level + 1);

    if (player.mp < mpCost) {
        addBattleLog('❌ 魔法值不足！');
        return;
    }

    player.mp -= mpCost;

    // 执行技能效果
    executeSkill(skill);

    updateUI();

    // 怪物反击（如果没死）
    if (currentMonster.hp > 0 && !player.buffs.dodgeNext) {
        setTimeout(() => monsterCounterAttack(), 800);
    } else if (player.buffs.dodgeNext) {
        player.buffs.dodgeNext = false;
    }
}

function executeSkill(skill) {
    const damageBonus = 1 + (skill.level - 1) * 0.2;

    // 播放技能特效
    playAttackAnimation(true);
    showSkillEffect(skill.id, 65, 50);

    switch (skill.id) {
        case 'heavy_strike':
            {
                const damage = Math.floor(getTotalAttack() * 1.5 * damageBonus);
                currentMonster.hp -= damage;
                setTimeout(() => {
                    playHitAnimation(false);
                    showDamageNumber(damage, true, false);
                    screenShake();
                }, 300);
                addBattleLog(`⚔️ 你使用了 ${skill.name}，造成 ${damage} 点伤害！`);
                setTimeout(() => checkMonsterDeath(), 600);
            }
            break;

        case 'iron_wall':
            player.buffs.defenseBoost = Math.floor(getTotalDefense() * 0.5 * damageBonus);
            addBattleLog(`🛡️ 你使用了 ${skill.name}，防御力提升 ${player.buffs.defenseBoost}！`);
            setTimeout(() => {
                player.buffs.defenseBoost = 0;
                addBattleLog('🛡️ 铁壁效果结束');
            }, 15000);
            break;

        case 'berserk':
            {
                addBattleLog(`⚔️ 你使用了 ${skill.name}！`);
                let totalDamage = 0;
                let hitCount = 0;

                const hitInterval = setInterval(() => {
                    if (hitCount < 3) {
                        const damage = Math.floor(getTotalAttack() * 0.7 * damageBonus);
                        currentMonster.hp -= damage;
                        totalDamage += damage;
                        playHitAnimation(false);
                        showDamageNumber(damage, true);
                        hitCount++;
                    } else {
                        clearInterval(hitInterval);
                        addBattleLog(`💥 连续攻击造成总计 ${totalDamage} 点伤害！`);
                        screenShake();
                        checkMonsterDeath();
                    }
                }, 300);
            }
            break;

        case 'fireball':
            {
                const damage = Math.floor((getTotalAttack() + player.maxMp * 0.3) * 2 * damageBonus);
                currentMonster.hp -= damage;
                setTimeout(() => {
                    playHitAnimation(false);
                    showDamageNumber(damage, true, true);
                    screenShake();
                }, 400);
                addBattleLog(`🔥 你使用了 ${skill.name}，造成 ${damage} 点魔法伤害！`);
                setTimeout(() => checkMonsterDeath(), 700);
            }
            break;

        case 'freeze':
            currentMonster.attackDebuff = Math.floor(currentMonster.attack * 0.5);
            addBattleLog(`❄️ 你使用了 ${skill.name}，敌人攻击力降低 ${currentMonster.attackDebuff}！`);
            setTimeout(() => {
                if (currentMonster) {
                    currentMonster.attackDebuff = 0;
                    addBattleLog('❄️ 冰冻效果结束');
                }
            }, 15000);
            break;

        case 'magic_storm':
            {
                const damage = Math.floor((getTotalAttack() + player.maxMp * 0.5) * 3 * damageBonus);
                currentMonster.hp -= damage;
                setTimeout(() => {
                    playHitAnimation(false);
                    showDamageNumber(damage, true, true);
                    screenShake();
                }, 500);
                addBattleLog(`⚡ 你使用了 ${skill.name}，造成 ${damage} 点毁灭性伤害！`);
                setTimeout(() => checkMonsterDeath(), 800);
            }
            break;

        case 'backstab':
            {
                const damage = Math.floor(getTotalAttack() * 2 * damageBonus);
                currentMonster.hp -= damage;
                setTimeout(() => {
                    playHitAnimation(false);
                    showDamageNumber(damage, true, true);
                    screenShake();
                }, 300);
                addBattleLog(`🗡️ 你使用了 ${skill.name}，造成 ${damage} 点暴击伤害！`);
                setTimeout(() => checkMonsterDeath(), 600);
            }
            break;

        case 'dodge':
            player.buffs.dodgeNext = true;
            addBattleLog(`👻 你使用了 ${skill.name}，下次攻击将会被闪避！`);
            break;

        case 'combo':
            {
                addBattleLog(`🗡️ 你使用了 ${skill.name}！`);
                let totalDamage = 0;
                let hitCount = 0;

                const hitInterval = setInterval(() => {
                    if (hitCount < 5) {
                        const damage = Math.floor(getTotalAttack() * 0.5 * damageBonus);
                        currentMonster.hp -= damage;
                        totalDamage += damage;
                        playHitAnimation(false);
                        showDamageNumber(damage, true);
                        hitCount++;
                    } else {
                        clearInterval(hitInterval);
                        addBattleLog(`💥 连续攻击造成总计 ${totalDamage} 点伤害！`);
                        screenShake();
                        checkMonsterDeath();
                    }
                }, 200);
            }
            break;
    }
}

// ==================== 魔法恢复系统 ====================

function startMpRegen() {
    if (mpRegenInterval) clearInterval(mpRegenInterval);

    mpRegenInterval = setInterval(() => {
        if (player.mp < player.maxMp) {
            player.mp = Math.min(player.maxMp, player.mp + Math.floor(player.maxMp * 0.05));
            updateUI();
        }
    }, 2000); // 每2秒恢复5%最大魔法值
}

// ==================== 工具函数 ====================

function generateMonster() {
    const suitableMonsters = monsterTemplates.filter(m =>
        m.level >= player.level - 1 && m.level <= player.level + 2
    );

    const template = suitableMonsters[Math.floor(Math.random() * suitableMonsters.length)]
                     || monsterTemplates[0];

    return {
        ...template,
        hp: template.hp,
        maxHp: template.hp,
        attackDebuff: 0
    };
}

function generateLoot() {
    const dropRate = Math.random();

    if (dropRate < 0.2) {
        let availableItems = itemTemplates;

        if (player.level < 3) {
            availableItems = itemTemplates.filter(i => i.rarity === "common" || i.rarity === "rare");
        } else if (player.level < 6) {
            availableItems = itemTemplates.filter(i => i.rarity !== "legendary");
        }

        const item = availableItems[Math.floor(Math.random() * availableItems.length)];
        return { ...item, id: Date.now() + Math.random() };
    }

    return null;
}

function getTotalAttack() {
    let total = player.attack;
    if (player.equipment.weapon) total += player.equipment.weapon.attack;
    if (player.equipment.armor) total += player.equipment.armor.attack;
    if (player.equipment.helmet) total += player.equipment.helmet.attack;
    return total;
}

function getTotalDefense() {
    let total = player.defense + player.buffs.defenseBoost;
    if (player.equipment.weapon) total += player.equipment.weapon.defense;
    if (player.equipment.armor) total += player.equipment.armor.defense;
    if (player.equipment.helmet) total += player.equipment.helmet.defense;
    return total;
}

function addBattleLog(message) {
    const log = document.getElementById('battle-log');
    const p = document.createElement('p');
    p.textContent = message;
    p.classList.add('fade-in');
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;

    if (log.children.length > 20) {
        log.removeChild(log.children[0]);
    }
}

function updateUI() {
    // 更新玩家信息
    document.getElementById('player-level').textContent = player.level;
    document.getElementById('player-exp').textContent = player.exp;
    document.getElementById('player-max-exp').textContent = player.maxExp;
    document.getElementById('player-hp').textContent = Math.max(0, player.hp);
    document.getElementById('player-max-hp').textContent = player.maxHp;
    document.getElementById('player-mp').textContent = Math.max(0, player.mp);
    document.getElementById('player-max-mp').textContent = player.maxMp;
    document.getElementById('player-attack').textContent = getTotalAttack();
    document.getElementById('player-defense').textContent = getTotalDefense();
    document.getElementById('player-gold').textContent = player.gold;

    // 更新血条
    const hpPercent = (player.hp / player.maxHp) * 100;
    document.getElementById('hp-fill').style.width = hpPercent + '%';

    // 更新魔法条
    const mpPercent = (player.mp / player.maxMp) * 100;
    document.getElementById('mp-fill').style.width = mpPercent + '%';

    // 更新经验条
    const expPercent = (player.exp / player.maxExp) * 100;
    document.getElementById('exp-fill').style.width = expPercent + '%';

    // 更新装备栏
    document.getElementById('weapon-slot').textContent = player.equipment.weapon
        ? player.equipment.weapon.name
        : '无';
    document.getElementById('armor-slot').textContent = player.equipment.armor
        ? player.equipment.armor.name
        : '无';
    document.getElementById('helmet-slot').textContent = player.equipment.helmet
        ? player.equipment.helmet.name
        : '无';

    // 更新怪物信息
    if (currentMonster) {
        document.getElementById('monster-sprite').textContent = currentMonster.avatar;
        document.getElementById('monster-name').textContent = currentMonster.name;
        document.getElementById('monster-level').textContent = currentMonster.level;
        document.getElementById('monster-hp').textContent = Math.max(0, currentMonster.hp);
        document.getElementById('monster-max-hp').textContent = currentMonster.maxHp;

        const monsterHpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
        document.getElementById('monster-hp-fill').style.width = monsterHpPercent + '%';
    }

    // 更新背包
    updateInventory();

    // 更新统计
    document.getElementById('monsters-killed').textContent = gameStats.monstersKilled;
    document.getElementById('items-found').textContent = gameStats.itemsFound;
}

function updateInventory() {
    const inventoryDiv = document.getElementById('inventory-items');
    inventoryDiv.innerHTML = '';

    if (player.inventory.length === 0) {
        inventoryDiv.innerHTML = '<p class="empty-message">背包是空的</p>';
        return;
    }

    player.inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item', `item-${item.rarity}`);
        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-stats">
                ⚔️ +${item.attack} | 🛡️ +${item.defense}
            </div>
        `;
        itemDiv.onclick = () => equipItem(item);
        inventoryDiv.appendChild(itemDiv);
    });
}

function updateShop() {
    const shopDiv = document.getElementById('shop-items');
    shopDiv.innerHTML = '';

    const shopItems = itemTemplates.slice(0, 6);

    shopItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('shop-item', `item-${item.rarity}`);
        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-stats">
                ⚔️ +${item.attack} | 🛡️ +${item.defense}
            </div>
            <div class="shop-item-price">💰 ${item.price} 金币</div>
        `;
        itemDiv.onclick = () => buyItem(item);
        shopDiv.appendChild(itemDiv);
    });
}

// ==================== 游戏逻辑 ====================

function equipItem(item) {
    const slot = item.type;

    if (player.equipment[slot]) {
        player.inventory.push(player.equipment[slot]);
    }

    player.equipment[slot] = item;
    player.inventory = player.inventory.filter(i => i.id !== item.id);

    addBattleLog(`✅ 已装备: ${item.name}`);
    updateUI();
}

function buyItem(item) {
    if (player.gold >= item.price) {
        player.gold -= item.price;
        const newItem = { ...item, id: Date.now() + Math.random() };
        player.inventory.push(newItem);
        gameStats.itemsFound++;
        addBattleLog(`🛒 购买成功: ${item.name}`);
        updateUI();
    } else {
        addBattleLog(`❌ 金币不足！还需要 ${item.price - player.gold} 金币`);
    }
}

function levelUp() {
    player.level++;
    player.maxHp += 20;
    player.hp = player.maxHp;
    player.maxMp += 10;
    player.mp = player.maxMp;
    player.attack += 3;
    player.defense += 2;
    player.exp = 0;
    player.maxExp = Math.floor(player.maxExp * 1.5);
    player.skillPoints++; // 获得技能点

    // 播放升级特效
    playLevelUpEffect();

    addBattleLog(`🎉 恭喜升级！当前等级: ${player.level}`);
    addBattleLog(`📈 生命值 +20, 魔法值 +10, 攻击力 +3, 防御力 +2`);
    addBattleLog(`💎 获得 1 技能点！`);

    updateSkillList();
}

function checkMonsterDeath() {
    if (currentMonster.hp <= 0) {
        gameStats.monstersKilled++;
        player.exp += currentMonster.exp;
        player.gold += currentMonster.gold;

        // 播放死亡和胜利动画
        playDeathAnimation(true);
        playVictoryAnimation();

        addBattleLog(`💀 ${currentMonster.name} 被击败了！`);
        addBattleLog(`💰 获得 ${currentMonster.gold} 金币，${currentMonster.exp} 经验值`);

        const loot = generateLoot();
        if (loot) {
            player.inventory.push(loot);
            gameStats.itemsFound++;
            addBattleLog(`🎁 获得装备: ${loot.name} [${loot.rarity}]`);
        }

        if (player.exp >= player.maxExp) {
            levelUp();
        }

        setTimeout(() => {
            currentMonster = generateMonster();
            addBattleLog(`🆕 新的敌人出现了: ${currentMonster.name} (等级 ${currentMonster.level})`);
            updateUI();
        }, 1500);

        updateUI();
    }
}

function attackMonster() {
    if (!currentMonster || currentMonster.hp <= 0) return;

    // 播放攻击动画
    playAttackAnimation(true);

    const playerDamage = Math.max(1, getTotalAttack() - currentMonster.defense);
    currentMonster.hp -= playerDamage;

    // 延迟显示伤害和受击动画
    setTimeout(() => {
        playHitAnimation(false);
        showDamageNumber(playerDamage, true);
    }, 250);

    addBattleLog(`⚔️ 你攻击了 ${currentMonster.name}，造成 ${playerDamage} 点伤害！`);

    setTimeout(() => {
        checkMonsterDeath();

        if (currentMonster && currentMonster.hp > 0) {
            setTimeout(() => monsterCounterAttack(), 300);
        }
    }, 500);
}

function monsterCounterAttack() {
    if (!currentMonster || currentMonster.hp <= 0) return;

    if (player.buffs.dodgeNext) {
        addBattleLog(`👻 你闪避了 ${currentMonster.name} 的攻击！`);
        player.buffs.dodgeNext = false;
        updateUI();
        return;
    }

    // 播放怪物攻击动画
    playAttackAnimation(false);

    const effectiveAttack = Math.max(1, currentMonster.attack - currentMonster.attackDebuff);
    const monsterDamage = Math.max(1, effectiveAttack - getTotalDefense());
    player.hp -= monsterDamage;

    // 延迟显示伤害和受击动画
    setTimeout(() => {
        playHitAnimation(true);
        showDamageNumber(monsterDamage, false);
    }, 250);

    addBattleLog(`💥 ${currentMonster.name} 反击了你，造成 ${monsterDamage} 点伤害！`);

    setTimeout(() => {
        if (player.hp <= 0) {
            addBattleLog(`💔 你被击败了！损失 50% 金币...`);
            player.gold = Math.floor(player.gold * 0.5);
            player.hp = player.maxHp;
            player.mp = player.maxMp;
            currentMonster = generateMonster();
            addBattleLog(`🔄 已复活！新的挑战开始...`);
        }

        updateUI();
    }, 500);
}

function heal() {
    const healCost = 50;

    if (player.gold >= healCost) {
        if (player.hp === player.maxHp) {
            addBattleLog(`❤️ 生命值已满，无需治疗！`);
            return;
        }

        player.gold -= healCost;
        const healAmount = Math.floor(player.maxHp * 0.5);
        player.hp = Math.min(player.maxHp, player.hp + healAmount);

        // 显示治疗数字
        showDamageNumber(healAmount, true, false, true);
        createParticles(35, 50, 'ice', 12);

        addBattleLog(`❤️ 使用治疗！恢复 ${healAmount} 点生命值`);
        updateUI();
    } else {
        addBattleLog(`❌ 金币不足！需要 ${healCost} 金币`);
    }
}

function flee() {
    if (Math.random() < 0.5) {
        addBattleLog(`🏃 成功逃跑！`);
        currentMonster = generateMonster();
        addBattleLog(`🆕 遇到了新的敌人: ${currentMonster.name}`);
        updateUI();
    } else {
        addBattleLog(`❌ 逃跑失败！`);

        const monsterDamage = Math.max(1, currentMonster.attack - getTotalDefense());
        player.hp -= monsterDamage;
        addBattleLog(`💥 ${currentMonster.name} 趁机攻击，造成 ${monsterDamage} 点伤害！`);

        if (player.hp <= 0) {
            addBattleLog(`💔 你被击败了！损失 50% 金币...`);
            player.gold = Math.floor(player.gold * 0.5);
            player.hp = player.maxHp;
            player.mp = player.maxMp;
            currentMonster = generateMonster();
        }

        updateUI();
    }
}

// ==================== 初始化游戏 ====================

function initGame() {
    // 显示职业选择界面
    document.getElementById('class-selection').style.display = 'flex';

    // 绑定事件
    document.getElementById('attack-btn').addEventListener('click', attackMonster);
    document.getElementById('heal-btn').addEventListener('click', heal);
    document.getElementById('flee-btn').addEventListener('click', flee);

    // 初始化商店
    updateShop();
}

// 页面加载完成后启动游戏
window.addEventListener('DOMContentLoaded', initGame);
