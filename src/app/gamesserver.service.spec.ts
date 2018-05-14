import { TestBed, inject } from '@angular/core/testing';

import { GamesserverService } from './gamesserver.service';

describe('GamesserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesserverService]
    });
  });

  it('should be created', inject([GamesserverService], (service: GamesserverService) => {
    expect(service).toBeTruthy();
  }));
});
