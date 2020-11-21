const MAX_BITS_PER_CHEER = 10000;
const MAX_BITS_PER_MESSAGE = 100000;

exports.solution = function (min_cheermote_amount, valid_cheermotes, messages) {
  messages = messages.split(',');

  let bitsTotal = 0;
  let cheers = {};

  messages.forEach(message => {
    let messageOk = true;
    let messageBits = 0;
    let messageCheers = {};

    const words = message.split(' ');
    for (const word of words) {
      for (const validCheermote of valid_cheermotes) {
        if (word.startsWith(validCheermote)) {
          const bits = parseInt(word.substring(validCheermote.length));
          if (bits >= min_cheermote_amount && bits <= MAX_BITS_PER_CHEER) {
            messageBits += bits;
            messageCheers[validCheermote] = messageCheers[validCheermote]
              ? messageCheers[validCheermote] + bits
              : bits;
          } else {
            messageOk = false;
          }

          break;
        }
      }

      if (!messageOk) {
        break;
      }
    }

    if (messageOk && messageBits <= MAX_BITS_PER_MESSAGE) {
      Object.keys(messageCheers).forEach(cheermote => {
        cheers[cheermote] = cheers[cheermote]
          ? cheers[cheermote] + messageCheers[cheermote]
          : messageCheers[cheermote];
      });
      bitsTotal += messageBits;
    }
  });

  return bitsTotal > 0
    ? Object.keys(cheers)
        .sort((a, b) => cheers[b] - cheers[a])
        .map(cheermote => `${cheermote}${cheers[cheermote]}`)
    : ['NO_CHEERS'];
};
