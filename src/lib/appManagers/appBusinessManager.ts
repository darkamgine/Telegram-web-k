/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import {MessageEntity} from '../../layer';
import {AppManager} from './manager';
import getPeerId from './utils/peers/getPeerId';

export default class AppBusinessManager extends AppManager {
  public resolveBusinessChatLink(slug: string) {
    return this.apiManager.invokeApiSingleProcess({
      method: 'account.resolveBusinessChatLink',
      params: {slug},
      processResult: (resolved) => {
        this.appPeersManager.saveApiPeers(resolved);

        const peerId = getPeerId(resolved.peer);
        const {message, entities} = resolved;
        const out: {peerId: PeerId, message: string, entities?: MessageEntity[]/* , totalEntities?: MessageEntity[] */} = {
          peerId,
          message,
          entities
        };

        // this.appMessagesManager.wrapMessageEntities(out);
        return out;
      }
    });
  }
}
