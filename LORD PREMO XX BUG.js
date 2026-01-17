// Lord Premo © Official Build

const fs = require('fs')
const fsx = require('fs-extra')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const { exec } = require('child_process')

// ================== BOT CORE ==================

switch(command) {
    case 'closetime':
        replygcxeon('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second')
        replygcxeon(`Open time ${q} starting from now`)
        setTimeout(() => {
            var nomor = m.participant
            const open = `*Opened* The group is opened by admin\nNow members can send messages`
            XeonBotInc.groupSettingUpdate(m.chat, 'not_announcement')
            replygcxeon(open)
        }, timer)
        break

    case 'kick':
        if (!m.isGroup) return replygcxeon(mess.group)
        if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
        if (!isBotAdmins) return replygcxeon(mess.botAdmin)
        let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwww], 'remove')
        break

    case 'add':
        if (!m.isGroup) return replygcxeon(mess.group)
        if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
        if (!isBotAdmins) return replygcxeon(mess.botAdmin)
        let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwwww], 'add')
        break

    case 'promote':
        if (!m.isGroup) return replygcxeon(mess.group)
        if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
        if (!isBotAdmins) return replygcxeon(mess.botAdmin)
        let blockwwwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote')
        break

    case 'demote':
        if (!m.isGroup) return replygcxeon(mess.group)
        if (!isAdmins && !isGroupOwner && !isCreator) return replygcxeon(mess.admin)
        if (!isBotAdmins) return replygcxeon(mess.botAdmin)
        let blockwwwwwa = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await XeonBotInc.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote')
        break

    // ================== GROUP SETTINGS ==================

    case 'setname':
    case 'setsubject':
        if (!text) return 'Text ?'
        await XeonBotInc.groupUpdateSubject(m.chat, text)
        break

    case 'setdesc':
    case 'setdesk':
        if (!text) return 'Text ?'
        await XeonBotInc.groupUpdateDescription(m.chat, text)
        break

    case 'setppgroup':
    case 'setppgc':
        if (!quoted) return replygcxeon(`Send/Reply Image With Caption ${prefix + command}`)
        var medis = await XeonBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
        var memeg = await XeonBotInc.updateProfilePicture(m.chat, { url: medis })
        fs.unlinkSync(medis)
        replygcxeon(mess.done)
        break

    // ================== TAGGING ==================

    case 'tagall':
        let teks = `*👥 Tag All*\n🗞️ *Message : ${q ? q : 'blank'}*\n\n`
        for (let mem of participants) {
            teks += `• @${mem.id.split('@')[0]}\n`
        }
        XeonBotInc.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) })
        break

    case 'hidetag':
        XeonBotInc.sendMessage(m.chat, { text: q ? q : '', mentions: participants.map(a => a.id) })
        break

    // ================== OWNER COMMANDS ==================

    case 'addowner':
        if (!args[0]) return replygcxeon(`Use ${prefix+command} number\nExample ${prefix+command} ${ownernumber}`)
        bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
        owner.push(bnnd)
        fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
        replygcxeon(`Number ${bnnd} Has Become An Owner!!!`)
        break

    case 'delowner':
        if (!args[0]) return replygcxeon(`Use ${prefix+command} number\nExample ${prefix+command} 2349159895444`)
        ya = q.split("|")[0].replace(/[^0-9]/g, '')
        unp = owner.indexOf(ya)
        owner.splice(unp, 1)
        fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
        replygcxeon(`The Number ${ya} Has been deleted from owner list!!!`)
        break

    // ================== AUTO MEDIA ==================

    case 'addvideo':
        VideoXeon.push(q)
        await fsx.copy(delb, `./PremoMedia/video/${q}.mp4`)
        fs.writeFileSync('./database/autoreply/video.json', JSON.stringify(VideoXeon))
        break

    case 'delvideo':
        let wanu = VideoXeon.indexOf(q)
        VideoXeon.splice(wanu, 1)
        fs.writeFileSync('./database/autoreply/video.json', JSON.stringify(VideoXeon))
        fs.unlinkSync(`./PremoMedia/video/${q}.mp4`)
        break

    case 'addimage':
        ImageXeon.push(q)
        await fsx.copy(delb, `./PremoMedia/image/${q}.jpg`)
        fs.writeFileSync('./database/autoreply/image.json', JSON.stringify(ImageXeon))
        break

    case 'delimage':
        let wanuImg = ImageXeon.indexOf(q)
        ImageXeon.splice(wanuImg, 1)
        fs.writeFileSync('./database/autoreply/image.json', JSON.stringify(ImageXeon))
        fs.unlinkSync(`./PremoMedia/image/${q}.jpg`)
        break

    case 'addsticker':
        StickerXeon.push(q)
        await fsx.copy(delb, `./PremoMedia/sticker/${q}.webp`)
        fs.writeFileSync('./database/autoreply/sticker.json', JSON.stringify(StickerXeon))
        break

    case 'delsticker':
        let wanuSt = StickerXeon.indexOf(q)
        StickerXeon.splice(wanuSt, 1)
        fs.writeFileSync('./database/autoreply/sticker.json', JSON.stringify(StickerXeon))
        fs.unlinkSync(`./PremoMedia/sticker/${q}.webp`)
        break

    case 'addvn':
        VoiceNoteXeon.push(q)
        await fsx.copy(delb, `./PremoMedia/audio/${q}.mp3`)
        fs.writeFileSync('./database/autoreply/vn.json', JSON.stringify(VoiceNoteXeon))
        break

    case 'delvn':
        let wanuVn = VoiceNoteXeon.indexOf(q)
        VoiceNoteXeon.splice(wanuVn, 1)
        fs.writeFileSync('./database/autoreply/vn.json', JSON.stringify(VoiceNoteXeon))
        fs.unlinkSync(`./PremoMedia/audio/${q}.mp3`)
        break

    // ================== MENU ==================

    case 'menu':
    case 'help':
    case 'alive':
    case '?':
    case 'allmenu':
        let xeonmenuoh = `
╭═══ LORD PREMO-𝙱𝚄𝙶-𝙱𝙾𝚃 ═══⊷
┃ Prefix : [ ]
┃ User :  ${pushname}
┃ Time : ${xeonytimewisher}
┃ Date : ${new Date().toLocaleDateString()}
┃ Version : 1.0
┃ Plugins : 250
┃ Ram : 64 GB
┃ Alive : ${runtime(process.uptime())
