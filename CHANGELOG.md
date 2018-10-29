# Changelogs

# 2.1.0 Bugfix

There was a bug that was represent in almost all modules. This bug stacked the arrays that came while using get methodes. We were forced to release this patch because its broken alot of software.

For more infomartion, [read here](https://github.com/AminoJS/Amino.JS/pull/40)

## v.2.0 (The Blog / Wiki Update)
"Finally, we can release it." ~Me, or so.
The Blog / Wiki update gives new functionaly to AminoJS, fixed some bugs, enhances security and handles testcases way differently then v.0.1

Summary:
* Create, Comment and Delete Different Wiki Entries / Blog Posts. (Restricted to User Online)
* Fetch Blogs from Community Feed or a Community User.
* Users can now use AminoJS Safe, because it runs now via HTTPS
* Testcases, a lot of them.
* Added Code of Conduct and Issue Templates.

Full Changelog (with PR Refrence):
[`#6 Make Login more simple`](https://github.com/AminoJS/Amino.JS/pull/6)
Thanks to [Felix](https://github.com/felixfong227), we don't need to parse in the secret ID, that was required in every function we called.

[`#9 Modulize the Core Libary`](https://github.com/AminoJS/Amino.JS/pull/10)
Also thanks to [Felix](https://github.com/felixfong227), the entire libary is now seperated in modules, wich makes easier development possible.

[`#12 The Wiki Stuff!`](https://github.com/AminoJS/Amino.JS/pull/12)
[Robin](https://github.com/moelrobi) then started working on the "Wiki Stuff", with that PR, the Libary started to have Wiki Functionallties. The Libary could, with the PR:  Create, Comment, Delete Wiki Blogs.

[`#25 Fetch User Blogs`](https://github.com/AminoJS/Amino.JS/pull/25)
[Felipe](https://github.com/akatsukilevi) and [Robin](https://github.com/moelrobi) created the Ability to fetch User Blogs! (Dammmn Daniel! :D)

[`#26 Blog all`](https://github.com/AminoJS/Amino.JS/pull/26)
Thanks to First-Time Contributor [Tau5](https://github.com/Tau5) AminoJS got all of the Blogs! Thanks from me again!

[`#29 HTTPS!`](https://github.com/AminoJS/Amino.JS/pull/29)
Woo.. we got that now.

[`#30 & #31 & #32 Repoworks!`]
[`#30 Create issue Templates!`](https://github.com/AminoJS/Amino.JS/pull/30)
[`#31 Create Code of Conduct`](https://github.com/AminoJS/Amino.JS/pull/31)
[`#32 New Testcases!`](https://github.com/AminoJS/Amino.JS/pull/32)

Just some Repowork. New Issue Templates, a Code of Conduct and Testcases for easier Development.

## v.0.1.1
Updating the NPM Package to be routing to the new Repo.
Please take a Look at Commit [`d98828f`](https://github.com/AminoJS/Amino.JS/commit/d98828ff184cbb9b4c1fdb788d4ad120d88af598) for more Infomation
## v.0.1 (The Documentaion Update!):
The Code was documentated.
First Official Alpha Release since open-sourcing the Project.
The Code is now Avaible and Maintend on Github! (https://github.com/AminoJS/Amino.JS)
Pullrequest is under: (https://gitlab.com/AminoJS/Amino.JS/pull/2)
Full Changelog with Commit Names:
[`db28fd1 & 05b6e08`] Switching from gitlab-ci to Travis-Ci.
[`95180d5`] Added Eslint as a Sutiable Testcase.
[`6935738`] Removed some Testcases because of Sorter-Rewrite
[`840c1f2`] Changed the Readme to actually Look Better.
[`3c489ae`] Added a new Function called getMyProfile which fetches the logged in Profile
[`4641444`] Added the Docs for the above mentioned Function
## v.0.0.3:
A Bug was fixed.
See: https://gitlab.robsys.space/Kikai/KikaiFramework/issues/2
## v.0.0.2:
A major Bugfix was released.
See https://gitlab.robsys.space/Kikai/KikaiFramework/issues/1
# v.0.0.1:
The Client Framework can now do the Following:
It can Authenticate with the Narvii API.
It can Load all Communitys that a User is joined.
It can Load all joined Chats.
It can send Messages to Specific Chats.
It can load Messages from Specific Chats.
### TODO:
Add Media Support (v.0.0.2 alpha)
Make the Get Messages Cleaner (v.0.0.2 alpha)
A lot more...

## indev:
Initial Commit
Added a Builder
