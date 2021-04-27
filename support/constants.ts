export enum Constants {
    user1 = 'arjun.jhawar+1@gmail.com',
    user2 = 'arjun.jhawar+2@gmail.com',
    password = 'testing123',
    user2TestSpaceName = 'Test User Space 2',
    testSamplePageName = 'Test Sample Page User 2',
    webdriverTimeOut = 30000
};

export enum ApplicationPaths {
    baseUrl = 'https://arjuntesting.atlassian.net/',
    confluenceHomeUrl = 'https://arjuntesting.atlassian.net/wiki/home',
    samplePageUser2 = 'https://arjuntesting.atlassian.net/wiki/spaces/~676660366/pages/164122/Sample+Page+User+2',
    testSamplePageUser2 = 'https://arjuntesting.atlassian.net/wiki/spaces/~676660366/pages/33056/Test+Sample+Page+User+2',
    logoutUrl = ' https://arjuntesting.atlassian.net/wiki/logout'
}

export enum RestrictionOptions {
    anyoneCanViewAndEdit = 'Anyone can view and edit',
    anyoneCanViewOnlySomeCanEdit = 'Anyone can view, only some can edit',
    onlySpecificPeopleCanViewOrEdit = 'Only specific people can view or edit'
}