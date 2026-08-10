# A Bit About Me and my Tuning Philosophy

As I grow older and navigate the world of being a father and husband, I have come to realize I have less time for unwelcome nonsense — the constant fighting with Windows and the update system made my game time a miserable experience, when I get free time.

Even running debloated Windows, custom ISOs, and other variants of Windows 11 such as IoT Enterprise LTSC, it is always in the back of my mind... when is Microsoft going to screw me and the time I put into tuning my system, and operating system? Tagzo referenced a lot of good material when it came to input lag reduction, however, I did a lot of that 10 years ago and having my settings get completely undone was very much a "mald my brains out" moment... while I am also troubleshooting the rest of my friends' systems, for the same reasons.

I'm quite frankly tired of having my experience ruined and my friends' experiences ruined. I've been gaming competitively and doing fun system tweaks for over 25 years, Windows 10 was the last stop before the absolute fuckery (excuse my language). From my experience - a retired-from-German-and-exotic-cars specialist - you learn to diagnose, repair, and tune, in one shot, with the least amount of effort and highest gains. Not by spending insane amounts of time on minimals gains. You can't churn 80+hr/week on flat rate if you spend your time scrutinizing and min-maxing on damn-near pointless gains and objectively irrelevant stuff.

Sigeon v2 FPS mod for Marvel Rivals accomplishes what we want - easy toggle and convenience. We apply the same tuning philosophy to our gaming rigs. Don't spend months tuning your RAM, CPU, and GPU. You need to learn the actual concept of tuning. I'm not sponsored by Frame Chasers nor am I sponsored by ANYONE, but if you don't know how to tune your RAM properly and quickly, go and buy his tuning course. I keep my system simple - quickly find the frequency wall, timing limits, and absolute point of instability and back it off a few notches. DONE. If you're into cars, why do you think Mercedes-AMG overbuild their engines and back off on the power? Reliability.

I digress — this is about competitive Linux gaming, not cars. You can reference my system specs and if you understand the components, you already see the tunes are quick and efficient. Wasting your time tuning and tweaking endlessly, for what feels like an eternity, will suck the soul out of your gaming experience once you finally hit that peak and boot up your first game. It is not worth it. You're either miserable (or going to be), and at some point you'll hit that instability, because something isn't operating within a perfectly controlled environment. This will cook you, and your experience.

If you're here looking for a magic launch option that instantly gives 50 more FPS or makes you a better player, you're going to be disappointed.

This guide isn't about chasing placebo tweaks.

It's about understanding your system well enough to make informed changes, measuring whether they actually helped, and then getting back to what matters: playing the game.

TL; DR: Learn foundational tuning, learn how to properly tune quickly and efficiently, apply it.

# Disclaimer

This guide is based on my own testing, and the work of members of the CachyOS community. Linux evolves quickly, so always benchmark changes on your own hardware, instead of assuming every tweak will help every system.
This guide was written intentionally with as much handholding as possible for new users, Windows refugees, and Linux veterans, so that we can all grow and expand together.

**As of August 1st 2026, Marvel Rivals has announced that rendering texture mods, screenshake mods, and removal mods are illegal. I have removed my illegal mods effective at time of editing. Commands are still intact to preserve integrity.**
Source: https://www.marvelrivals.com/guide/1214569/

# What do we tune?

Tune your RAM. The easiest, vendor-supported method of RAM OC is to enable AMD EXPO / Intel XMP in the RAM section of your Bios. Most, if not all RAM manufactured in the last 10+ years ship these, and are often advertised to run at these speeds. Static OC your AMD CPU if you want less fuss during tuning. It is standard procedure to set a "weak" or low static overclock to maintain stability and mitigate significantly increased heatloads during RAM tuning. If you can't do a static overclock, turn on PBO and find sensible parameters (PPT/TDC/EDC) without touching Curve Optimizer.

Generally speaking, CO is too tedious for minimal gains, especially if -5 CO is unstable and you lost in the silicon lottery. Intel is a different ball game with more electrical knowledge required, but the same tuning philosophy applies.
Reference my Arrow Lake system as an idea, if you're on Arrow Lake. If RAM/CPU tuning is too difficult, **Frame Chasers**.

GPU tuning is probably the easiest, tons of cookie cutter tunes and good reference points. If your GPU supports overclocking, download and install `LACT` using Shelly or simply, `sudo pacman -S lact`

Your biggest gains are in RAM tuning when it comes to 1% lows as 1% lows are **KING** when it comes to game smoothness and input lag. As always, **VALIDATE** your tunes (Karhu, TM5, linpack, OCCT, y-cruncher, furmark, etc) and **IGNORE** people who flex their overclocks.
More than 90% of the time it is unstable, and just meant for benching, or flexing their e-peen (yeah... really showing my age).

I understand that not everyone can afford an expensive course from Frame Chasers or like him. For players wishing to get their feet wet in learning RAM and systems tuning for free, I have provided some additional readings below. Please understand that the informations presented are mainly for Windows and we use some of our knowledge gained to apply to Linux. A lot of this information is gatekept, edited, and sold as services by many systems tuners. You are paying for their time and knowledge, whether it be good or bad. Some information may be old or conflicting, such as power states. It is generally advised to leave BIOS power states and power saving features enabled for Linux as the operating system is very efficient and advanced in handling these settings. Some players have reported performance loss from disabling c-states and p-states. Please always test your changes. Some of the readings here will cross reference each other or expand even further into the rabbit hole.

**Systems tuning:**

Calypto's Latency Guide - https://docs.google.com/document/d/1c2-lUJq74wuYK1WrA_bIvgb89dUN0sj8-hO3vqmrau4/mobilebasic

DDR4 OC Guide - https://github.com/integralfx/MemTestHelper/blob/oc-guide/DDR4%20OC%20Guide.md

PC Optimizations - https://github.com/BoringBoredom/PC-Optimization-Hub

More PC Optimizations - https://github.com/sieger/handbook

**My System Specs:**

```
Lian Li PC-O11D XL ROG Black case
Top and bottom case fan slots populated with Noctua NF-A12x25 PWM Chromax Black
﻿
Seasonic Prime TX-1600 PSU
﻿
Asus Z890 Apex - BIOS 3202
﻿
Intel 270K Plus - 5.6Ghz P-Core 1.35v Adaptive, 5.0Ghz E-Core 1.25v Adaptive, 1.3v SA, Ring 42, NGU 34, D2D 38
﻿
Arctic Liquid Freezer III 420 mounted as SIDE INTAKE, 3 additional 140 fans from spare Arctic Liquid Freezer III 420 mounted on backside of side radiator
﻿
48GB RAM - Single Rank Hynix M-die 2x24GB, CL38 8000MT Klevv Cras V, tuned to CL38-48-48-48 8200MT at 1.5v VDD, 1.45v VDDQ, 1.45v memory controller, tREFI 50000, tRFC 700, tRFCB 600
﻿
Asus TUF RTX 4090 - Max power limit (600W/600W), +200 core clock, +1000 memclock
﻿
Asus Dimm.2 (to avoid lane splitting/bifurcation of GPU)
﻿
Samsung 9100 Pro 2TB - CachyOS and main games store here, install in main and GEN 5 supported slot of the Dimm.2
﻿
Samsung 990 Pro 2TB - Ventoy drive + extra storage, installed in secondary slot of Dimm.2
﻿
SK Hynix Platinum P41 2TB - Extra storage, installed in mobo M.2_1
﻿
Samsung 990 EVO Plus 1TB - Windows 11 IoT Enterprise LTSC, installed in Sabrent USB 3.2 Type C Enclosure as a VHDX to prevent Windows hijacking shenanigans + portability
﻿
Peripherals:

Primary Monitor: Samsung G9 49in OLED (G93SC) 5120x1440 240hz, OSD settings - Freesync/Adaptive Sync enabled, HDR DISABLED, VRR Control OFF (THIS SETTING IS A SCAM, HEAVY INPUT LAG)

Secondary Monitor: None

Mouse: Logitech Superstrike + 8 match grade sapphire dot skates, 8Khz Polling
﻿
Keyboard: Keychron Q6 8K HE
﻿
Secondary/backup keyboard:  Wooting 60HE SOCD enabled (Profile code: 270fe1d4251fb0cfce4a48da26bc8917024f)
﻿
Mousepad: Artisan Hien XXL
﻿
Audio Interface: Motu M4
﻿
Headphones: Monolith M1060, foams behind metal grill removed, earpads replaced with LTYIVABHTTW velvet pads, NewFantasia 6N OCC Copper Silver Plated headphone cables, Oratory 1990 M1060 EQ applied via easyeffects
﻿
Mic: Shure SM57 + A2WS windscreen
```

# Okay, so **why** Linux gaming?

Simple. I want my system to just **work**. I like the performance gains with fine-tuning knobs. I like my advantages. I miss the simplicity and the operating system doing exactly what **I** want.

Marvel Rivals keeps upping the frame buffering (higher FPS, "smoother game"), resulting in seriously detrimental input lag from frame buffer, so that the game may seem more optimized to the hordes of laypeople and non-latency-sensitive folks.
This is impossible to tune out on Windows, and with the chance of mods getting banned, you'll be out of luck on Windows.

# Let's Get Started! Please?

Sure, but we will need to establish foundational knowledge first.

You have freedom of choice. I work with **CachyOS**, so I will be referencing CachyOS. Feel free to use whatever distro you want - CachyOS just works for me and other contributors who have serious backgrounds or gaming accolades, namely Netborg - one of the **strongest contributors** to high ELO competitive Linux gaming with **Quake III World Cyber Games National LAN Qualifier experiences** under his belt to prove it.

I like to refer to his work as Reflex 1.5 as it is better than Reflex on Windows, AND it is GPU agnostic. For example, **significantly tighter frame pacing and response.** AMD users, you are now on a leveled playing field with Nvidia. Nvidia's Reflex 2.0 is still in development/not released after 2 years from announcement.

> Lore drop yap - about 10 years ago, for some of us old enough to know and remember, high ELO Quake/afps players who came into Overwatch were without a doubt some of the scariest players to face in OW1 GM, as they had years of experience and operating system tuning (Linux), along with inhuman levels of mechanical skill and reaction speeds. We're getting older and losing our time and reflexes, it is time to pass on that knowledge and skill to the young ones so they can be better, faster, and stronger than us in every single way.

By CachyOS installation defaults, limine + btrfs + KDE plasma just works and will be referenced in this guide.
Limine is a no-nonsense bootloader, and pairs well with btrfs snapshotting -- in case you mess up your system, and you need to go back.

KDE Plasma has the bells and whistles of a fully-featured desktop environment, while remaining simple with Windows-like familiarity. It is also highly configurable enough for the majority of people, who love to rice their desktops. I keep mine simple, I don't use wallpaper engine as I enjoy using X11 over Wayland for Marvel Rivals. If I am showcasing the OS, sure I'll hop over a Wayland session and leave wallpaper engine running so you're not staring at my family photo.

For AMD users, I strongly advise Wayland, unless X11 proves to be beneficial for your system. You will need to test this for yourself, as some AMD models do see X11 benefits. For Nvidia, you can do either session, but on my hardware (4090+270K+), X11 consistently gets better performance, significantly lower input lag, **AND** a much stronger mouse connection between your body and mind (this is also your hint, healthy body and mind = optimal gaming conditions).

# Important Documentation and Reading

Installation: https://wiki.cachyos.org/installation/installation_prepare/

I suggest using Ventoy but Rufus works too. If you use Ventoy, make sure your Ventoy is formatted as GPT and **NOT MBR**. You will encounter unexpected behavior and possibly rabbit hole issues with MBR.

If you have an MSI motherboard, be aware that some MSI motherboards do not play nicely. Please check documentation here: https://wiki.cachyos.org/installation/boot_managers/

For your BIOS settings, you will need to disable `secure boot` and set the key to `custom` or `other`. Some motherboards do not show the option to set to `custom` or `other`, and will just assume `custom/other` when secure boot is disabled.

If you enjoy extra security, you can enable secure boot **AFTER** the standard installation procedure has been completed. The secure boot documentation can be found here: https://wiki.cachyos.org/configuration/secure_boot_setup/

Please do not disable other security mitigations like nx-mode, svm-mode, etc, as that can cause performance regression in both Windows and Linux. This guide will never recommend disabling or compromising security features in order to preserve user and system safety. The tweaks and adjustments suggested are always to preserve full system functionality in this guide, with the exception and limitations of X11 sessions.

# Post Fresh Install

You'll be in a Wayland session. `CachyOS Hello` is the first thing to come pop out and welcome you. Go to `Apps/Tweaks` and click `Install Gaming Packages`. Also click `Install VRAM Management`, if available. This is critical for AMD GPUs, otherwise you'll have memory leaks from the GPU and it'll eat into your system RAM significantly. The issue compounds from there. Check the `Profile-sync-daemon enabled` to load browsers to your RAM instead of your storage drive.

You'll want to increase your shader cache size. Please follow CachyOS's guide on increasing shader cache size found here: https://wiki.cachyos.org/configuration/gaming/#increase-maximum-shader-cache-size

If you are scared of the terminal text editor of `micro`, you can substitute `micro` for `kate`. I find kate very friendly for beginners.

Feel free to experiment with DNS servers. I left mine on DHCP (automatic). Some people report better network performance on Cloudflare (`1.1.1.1`). There will be a section for a little bit more tweaks, in regards to schedulers and network.

Find the System Settings in your start menu, or next to the start menu. Adjust your display settings to your liking. Turn `Adaptive Sync` to `Automatic` or `Always`. This is your VRR. If this option is not available, make sure you enable G-SYNC/Freesync in your monitor OSD first. Use `Never` if you experience issues with VRR. This does not affect your eligibility for direct scanout.

HDR is optional, as it can introduce additional input lag between 1-5ms depending on monitor processing power. I only use this if I am gaming very casually and I want eyecandy. Set your `RGB range` to `Full`.

**Important settings for direct scanout** - uncheck `HDR`, set `Color profile` to `None`. I personally just tune by my monitor and save the preset. Set `Color accuracy` to `Prefer efficiency` and uncheck `Brightness Control hardware brightness with DDC/CI`, make sure that the `Night Light` feature is also disabled, or not running during your gaming session. Direct scanout in Linux refers to a method where the graphics output is sent directly from the GPU to the display without involving the compositor, you are getting the fastest image possible, and consequently, significantly reduced input lag.

If your game does not use direct mouse input, go to `Mouse & Touchpad` and disable `Enhance pointer precision`/`Enable pointer acceleration` for every device. That is mouse acceleration. Some keyboards may show it too. Disable it.

# How do I know if I have direct scanout? Can I verify it?

Sure, for Wayland — go to your start menu and search `Open KWin debug console`, open the `Effects` tab, click `showcompositing` and there will be a red outline on windows that are being processed through the compositor. You don't want to see the red outline. Direct scanout only works for games that can go fullscreen or borderless windowed fullscreen, **NOT** windowed mode.

For X11 (NVidia only) - add `__GL_SHOW_GRAPHICS_OSD=1` to your game's launch command. Verify you have a green `Flip` text. If it isn't showing a green `Flip`, direct scanout isn't working.

# What is X11 and what is Wayland?

These are what are known as display servers / display protocols, which define how programs talk to your screen. They have different methods of talking to your screen.

X11 is extremely mature and is slated for end of life, however it will be evolving through forks and SonicDE in the very near future. Nvidia drivers are strongly developed for X11, so in general, there will be a performance uplift for Nvidia users - rivaling Windows or exceeding Windows in games that often see performance regressions in Linux, such as DX12 games.

You can kind of think of X11 and Wayland like using DX11 vs DX12, you'll want to take the DX11 option - it just works and performance can be stronger, like Overwatch for example :)

**Important Note:** Some users, including myself have found that Wayland Discord screensharing can be a bad experience for Nvidia users — even with high end hardware. This does not apply to all Nvidia GPUs. A user reported his 3080ti had a near-impactless streaming experience while I have significantly reduced FPS during the stream. X11 is a possible workaround for Nvidia users wishing to Discord screenshare/stream smoothly. I personally have not found OBS streaming/recording to be an issue. Your mileage may vary.

# How do I enable X11?

Open the terminal. I like to use `Konsole`, copy the first 4 sudo commands to install X11. You can copy all four of the sudo commands at once if you wish. Use middle mouse-click to paste or just hit the paste button on the top right of Konsole. Reboot your computer.

When you arrive at the login screen, look at the bottom left and you can change your session. AMD users will also need to add a new directory and create a config file if they wish to use VRR in X11. To do that, copy the two AMD specific sudo commands and when nano comes up, paste from the Section "Device" to Endsection. Ctrl-S to write out (save) and Ctrl-X to exit.

```sh
sudo pacman -S xorg plasma-x11-session kwin-x11 sddm sddm-kcm
sudo systemctl disable plasmalogin
sudo systemctl enable sddm
```

AMD:
```sh
sudo mkdir -p /etc/X11/xorg.conf.d
sudo nano /etc/X11/xorg.conf.d/20-amdgpu.conf
```

```nim
Section "Device"
    Identifier "AMDGPU"
    Driver "amdgpu"

    Option "VariableRefresh" "true"
    Option "EnablePageFlip" "off"
    Option "TearFree" "false"
EndSection
```
**According to arch wiki article: https://wiki.archlinux.org/title/AMDGPU#Reduce_output_latency**
- EnablePageFlip should be set to off. .conf updated to reflect documentation of proper input lag reduction. Please experiment and test different options if you experience issues with VRR on AMD.

* Optionally, you can choose to not to enable sddm and just use plasmalogin. I know that sddm just works and if plasmalogin ever drops X11, I have a fallback.

# What are some downsides of X11?

Poor multi-monitor support or no multi-monitor support. If you do manage to get multi-monitor to work, you're going to deal with compositing issues. Single monitor setup is recommended. Wallpaper Engine does not work for me, it might work for you if you want to FAFO with it.

Desktop experience can feel very "sterile". VRR may not play nicely, I have VRR disabled and I'm still tear-free. Verify for yourself using the slo-mo recording of your phone camera pointed at your screen, and whip your in-game camera around.

**Please Note:** I have intentionally left out `evdev` and `anbryinput` as these settings are not compatible with all hardware and may cause more headaches than it is worth. Feel free to explore this subject on your own time and perform your own tests. I generally only switch to an X11 session when I get an itch to play Overwatch — the majority of the time I use Wayland. I'll switch to X11 when I want to Discord stream to friends.

# X11 Specific Tweaks

If you are on Nvidia, open `nvidia-settings` with your terminal or just look it up in your start menu, by typing "nvidia". It will be called Nvidia X Server Settings.

Under `X Server Display Configuration`, open the `Advanced` tab and enable `G-SYNC` and/or `Allow G-SYNC on monitor not validated as G-SYNC Compatible`. In the `PowerMizer` tab, at the bottom, make sure you change `Preferred Mode` to `Prefer Maximum Performance`. Under the `GPU x -(Nvidia GeForce RTX xxxx)` tab, you can check and verify that your G-Sync mode is enabled or disabled.

In your `System Settings` menu, go to `Display & Monitor`, open the menu that says `Compositor` and **uncheck** "Enable on startup". Reboot to apply changes. Your desktop experience will feel very sterile. Still in the `System Settings`, you may want to use `KZones`. This is located in `Window Management->KWin Scripts->Get New` in order to easily snap windows into set sizes and layouts you create. I advise using an AI like ChatGPT to help you with creating your ideal layout.

# Networking Tweaks

If you have Intel LAN driver, you've been spared from the EEE madness. EEE=Energy Efficient Ethernet - you can also follow the same guide as Realtek below if you wish to disable EEE. I personally would. If you don't know what you have, consult your motherboard's specifications sheet or `lspci -nnk | grep -A3 -Ei 'ethernet|network'` to confirm whether it is Realtek.

Realtek owners... you're going to be unhappy and happy at the same time. Your miserable Windows experience with insane buffer bloats and dropped packets on Windows were mainly from your Realtek LAN inappropiately dropping your packets, due to EEE.

You can test for buffer bloat here: https://www.waveform.com/tools/bufferbloat

Identify your currently active ethernet port with `nmcli device status`.

You'll have an output that looks something like this:

```sh
$ nmcli device status
DEVICE           TYPE      STATE                   CONNECTION
eno1             ethernet  connected               Wired connection 1
br-105aef090c20  bridge    connected (externally)  br-105aef090c20
lo               loopback  connected (externally)  lo
docker0          bridge    connected (externally)  docker0
ifb-eno1         ifb       unmanaged               --
```

We have identified that eno1 is our ethernet in use.
Use this command to confirm you have EEE active:

```sh
sudo ethtool --show-eee eno1
```

You should get an output that looks something like this:

```sh
sudo ethtool --show-eee eno1
```
```
EEE settings for eno1:
        EEE status: enabled - active
        Tx LPI: 12 (us)
        Supported EEE link modes:  100baseT/Full
                                   1000baseT/Full
                                   2500baseT/Full
                                   5000baseT/Full
        Advertised EEE link modes:  100baseT/Full
                                    1000baseT/Full
                                    2500baseT/Full
                                    5000baseT/Full
        Link partner advertised EEE link modes:  100baseT/Full
                                                 1000baseT/Full
```

Use this command to disable it:

```sh
sudo ethtool --set-eee eno1 eee off
```

Next, we want to make this persistent.
Use this command to open the terminal text editor and create the file at the same time:

```sh
sudo nano /etc/systemd/system/disable-eee.service
```

⚠️ Do not blindly copy `eno1`. Replace every occurrence of `eno1` below with the active Ethernet interface you identified in the previous step. ⚠️

Now paste this into nano:

```ini
[Unit]
Description=Disable Energy Efficient Ethernet (EEE) on eno1
After=network-online.target
Wants=network-online.target
ConditionPathExists=/sys/class/net/eno1

[Service]
Type=oneshot
ExecStart=/usr/bin/ethtool --set-eee eno1 eee off
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Write out (Ctrl+S) and exit.
IF you have created this service before and are editing/restarting it:

```sh
sudo systemctl daemon-reload
```

Enable it & start it:

```sh
sudo systemctl enable --now disable-eee.service
```

Verify it works:

```sh
systemctl status disable-eee.service
```

You are expecting an output of:

```
Active: active (exited)
```

Reboot.

Verify that it EEE is now disabled:

```sh
sudo ethtool --show-eee eno1
```

Perform another buffer bloat test: https://www.waveform.com/tools/bufferbloat

# Cake SQM Setup

If you still have bufferbloat, we can install `cake-sqm-setup` to reduce buffer bloat, or eliminate buffer bloat (this saves you from buying an expensive router that has SQM).

Download `cake-sqm-setup.sh` from https://github.com/galpt/cake-sqm-setup

Navigate to your Downloads folder, right click in an empty space in the Downloads folder, and click `Open Terminal Here`

Follow Step 1 and 2 on the Github. Select the active ethernet port you are using.

You'll be asked to configure upload, upload speed, download, and download speeds. Use auto if you want fast minimal effort. I use auto and I have no buffer bloat.

It should look something like this

```
Configure upload (egress) on eno1? [Y/n or enter bandwidth directly]: y
Enter upload rate (e.g. 10M, 800k, 'auto', or 'unlimited'): auto
Autodetected link speed: 1000Mbit — using as upload limit.
Configure download (ingress) shaping for eno1 (requires IFB)? [Y/n or enter bandwidth directly]: y
Enter download rate (e.g. 50M, 5000k, 'auto', or 'unlimited'): auto
Autodetected link speed: 1000Mbit — using as download limit.

Select deployment mode:
  1) Desktop — uses 'flows' (recommended for VPN users; no per-host tracking)
  2) Router  — uses 'dual-srchost'/'dual-dsthost' (per-host flow fairness)

Choice [1/2] (default: 1): 1
```

Mash yes for the rest of the options after choosing `Desktop` deployment mode. This is to apply the changes and make persistent across reboots. Do your bufferbloat test. If you score higher, great. You should expect your speed to slightly decrease or increase depending on your ISP and router, but your bufferbloat should decrease, and your bufferbloat grade should increase after the test.

**Below are advanced tweaks, you may need to research and ask questions on your Linux community's Discord to get a better grasp of what these features do and how to fine tune it**

# Set IRQ Affinity (Advanced Tweak)

I do not advise IRQ affinity unless you have a higher core count CPU, such as a dual CCD chip from AMD. We're going to use an AMD 7950X and Intel 270K Plus as examples in IRQ affinity.

IRQ affinity handles a few processes and devices like your network and input devices. This is what makes 8Khz polling rate work and viable in Marvel Rivals for me.

For sake of time, simplicity, and because your Kernel lives on core 0, we will be using `irqaffinity=0-15` on our **7950X** to default the processes to start at core 0 and extending out to the last SMT thread of CCD0. Ideally, we want to use our strongest cores to support high polling rate mice, and reduce the amount of cores being used, so our games can use the remaining powerful cores reserved for them. 

For single 3D V-Cache (7950X3D/9950X3D) users, you can experiment between `0-15` and `16-31` to see what responds better for **YOUR** system. At the time of writing (August-09-2026), Dual 3D V-Cache users with the 9950X3D2 can also experiment to see which responds better, but ideally this would be the true end-game CPU benefiting heavily from IRQ tweak+CPU partitioning.

**For Intel 270K Plus:** I use `irqaffinity=8-23` (All 16 E-cores) to sync with my CPU partition

Open your file manager of choice (Dolphin is default on KDE) and open your Root drive. Navigate to `/etc/default/` and open `limine` with `kate`. Alternatively and efficiently, you can open your terminal and paste the command below:

```sh
sudo nano /etc/default/limine
```

On the `KERNEL_CMDLINE`, before the end quotation, add a space and paste in `irqaffinity=0-15`.

Your contents may look a little bit different than mine (because of different hardware and UUIDs), but it should look like this:

```ini
ESP_PATH="/boot"
KERNEL_CMDLINE[default]+="quiet nowatchdog splash rw rootflags=subvol=/@ root=UUID=50e8fa77-bb41-4a7f-8bee-c6bf3ff75d90 irqaffinity=0-15"
BOOT_ORDER="*, *lts, *fallback, Snapshots"
```

Write out (Ctrl-S) and exit (Ctrl-X).
Save the changes to limine with the command below:

```sh
sudo limine-mkinitcpio
```

# CPU Partitioning (Advanced Tweak)

I do not advise CPU partitioning unless you have a higher core count CPU, such as a dual CCD chip from AMD. Skip this if you don't want to constantly run different commands for launching things, or do not like tinkering back and forth with an app that requires all available cores.

Conceptually:
```
OS / housekeeping CPUs
├── system services
├── IRQs
├── audio
├── networking
└── miscellaneous kernel work

Game partition
├── game threads
├── render thread
├── simulation
└── worker threads
```

Common dual CCD chips are 5950X, 7950X, and 9950X along with their X3D variants. If you are on Intel and you have P-cores and E-cores, you also benefit from this.

This is a neat trick that Windows users utilizing `Process Lasso` and `ReservedCpuSets` would do to pin cores. We're actually going to take it a step further. We do this because of the interconnect latency penalty of AMD dual CCD CPUs when your stubborn game(s) and the scheduler cannot properly assign the cores onto one CCD. Windows users suffer from this with Marvel Rivals disallowing you from assigning your CPU cores. We have freedom of choice here. You'll want to have an understanding of cores and SMT/hyperthreading cores. I advise keeping SMT/hyperthreading turned on in BIOS, you can always force SMT/hyperthreading off with the sched-ext flags or game launch commands. Marvel Rivals in particular runs better with SMT/hyperthreading on Linux, and better without SMT/hyperthreading on Windows.

We're going to use an AMD 7950X and Intel 270K Plus as examples in CPU partitioning. The 7950X is a 16-core, 32-thread CPU and the 270K plus is a 24-core, 24-thread CPU, as Arrow Lake CPUs do not have SMT/hyperthreading. The 7950X core/thread assignments are C0-C31 and the 270K core/thread assignments are C0-C23. The 7950X physical cores are C0-7 and C16-23 while the SMT threads are C8-15 and C24-31. We can assign the operating system to C0-15 and leave C16-31 to our games on the 7950X. For the 270K Plus, we can assign C8-23 for the sake of simplicity and still have an incredibly fast/responsive system.

Open the systemd system.conf file
```sh
kate /etc/systemd/system.conf
```
Find and uncomment `CPUAffinity=` (remove the hash from `#CPUAffinity=`)

For the 7950X, set the value after the equal sign to 0-15 (`CPUAffinity=0-15`).

For the 270K Plus, set the value after the equal sign to 8-23 `CPUAffinity=8-23`.

Save and exit.

**Special Note:** For single 3D V-Cache (7950X3D/9950X3D) users, your 3D V-Cache lives on CCD0 (0-15). You will want to assign 16-31 (`CPUAffinity=16-31`). At the time of writing (August-09-2026), Dual 3D V-Cache users with the 9950X3D2 can also experiment to see which responds better, but ideally this would be the true end-game CPU benefiting heavily from IRQ tweak+CPU partitioning.

# Sched-ext

`sched-ext` is a great way to increase your 1% lows and reduce input lag. Some schedulers are better than others in other games. Cosmos is a pretty popular choice amongst the minority of competitive Linux gamers, and works well in almost every game. You can access the `sched-ext` by typing `schedext` into your search bar of your "start menu". We can set our scheduler to Cosmos and change to the gaming profile. Replace the gaming profile flags with the codeblock below. This is a cookie cutter setting so it works well for most games - I advise reading the CachyOS wiki on schedulers, as you've made it this far, but I will still try and do my best to explain what these cookie cutter settings below do.
```sh
-c 0 -p 0
```

`-c 0` minimizes unnecessary task migration, helping preserve cache locality and reduce scheduling jitter. `-p 0` biases Cosmos toward immediate scheduling decisions for interactive tasks instead of being more conservative.

Keep hot threads on the same CPU whenever practical.
Respond quickly when interactive threads wake up.
Reduce unnecessary task movement.
Favor consistent frame pacing over perfectly balancing CPU utilization.

That lines up extremely well with how modern game engines behave:

Main thread
Render thread
Audio thread
Input thread

These threads wake up repeatedly every frame and benefit from staying on the same core rather than being shuffled around.

Imagine each CPU core is a mechanic's workbench. A game thread is a mechanic assembling an engine.

If you let the mechanic keep using the same bench, all the tools are already laid out exactly where they expect them.

If you move the mechanic to another bench every few seconds, they spend time finding their tools again before getting back to work.

`-c 0` tells Cosmos: "Don't move the mechanic unless you really have to." `-p 0` makes sure the mechanic doesn't have to wait in line every time they need another part.

Cake is also a new and upcoming, strong contender against cosmos. Feel free to check out more information about that scheduler, specifically the `-p esports` setting.

# General Guidelines For Competitive Esports Graphics Settings

- Fullscreen or Borderless Window — always verify with KWin debug for Wayland, `__GL_SHOW_GRAPHICS_OSD=1` for X11

- In-game v-sync turned off. We are utilizing a different method of v-sync or none at all depending on configuration

- Lowest possible graphics — some games have exceptions, unless you enjoy higher quality graphics

- No lag gen — uhhh I mean no frame gen! No frame gen!!11! This is input lag city unless your game requires it or you can tune Netborg's `low-latency` for frame gen.

- Use Nvidia DLSS or FSR — some games may actually see performance regression with DLSS/FSR. Overwatch is one of them. **This is your last reminder to always test and benchmark your tweaks.**

- Enable Nvidia Reflex — This is a given since we want to take advantage of Reflex 1.5 :)

- Frame cap according to formula if using VRR — some games perform better with in-game frame cap, some games perform better with external frame cap. Marvel Rivals favors in-game frame cap.

# Formula

Feel free to deviate. This is the formula according to Nvidia's ultra low latency mode on Windows when the setting is used correctly.

For 240Hz it will look like this:

240 - (240 * 240 / 3600) = 240 - (57,600 / 3600 ) = 240 - 16 = 224

**Cheatsheet:**

120 - (120 × 120) ÷ 3600 = 116

144 - (144 × 144) ÷ 3600 = 138

165 - (165 × 165) ÷ 3600 = 157

180 - (180 × 180) ÷ 3600 = 171

200 - (200 × 200) ÷ 3600 = 189

240 - (240 × 240) ÷ 3600 = 224

300 - (300 × 300) ÷ 3600 = 275

360 - (360 × 360) ÷ 3600 = 324

480 - (480 × 480) ÷ 3600 = 416

500 - (500 × 500) ÷ 3600 = 431

540 - (540 × 540) ÷ 3600 = 459

600 - (600 × 600) ÷ 3600 = 500

720 - (720 × 720) ÷ 3600 = 576

750 - (750 × 750) ÷ 3600 = 594

800 - (800 × 800) ÷ 3600 = 622

# VRR

VRR is Variable Refresh Rate. Your monitor dynamically adjusts it's refresh rate to sync up to your application's framerate. This can be advantageous for users sensitive to screen tearing or wish to have subjectively the most consistent experience. 

More information regarding G-SYNC and VRR technology can be found here: https://blurbusters.com/gsync/gsync101-input-lag-tests-and-settings/

Some users have reported that VRR can "act weird" or have some stutters during general desktop usage. The first step to alleviating some of the issues would be setting Adaptive Sync to `Automatic`. If `Automatic` does not play well with your system, you can also try setting  `Window Rules` to force adaptive sync off. This setting is found in `System Settings->Window Management->Window Rules`.

**Special Notes:** VRR flicker is an operating system agnostic issue. The issues can vary from poor manufacturer implementation, panel type (TN,VA,IPS,OLED,Mini-LED, etc), GPU drivers, and session type just to name a few of many possible causes. If you are unable to resolve VRR flicker, you can safely turn `Adaptive Sync` to `Never` and/or disable VRR on your monitor's OSD.

# Winboat

Winboat is a powerful virtual machine tool, made as simple and intuitive as possible. This can easily be installed and setup by accessing your `CachyOS Hello`, clicking `Apps/Tweaks`, and clicking `Install Winboat`.

During the initial setup and install, you can choose which Windows variation you want or supply your own Windows ISO. During setup, you'll be asked if you would like to have /home folder sharing and what resources you want to allocate. I personally use half of my system cores and RAM because I want my VM to be fast, and I have about 200GB of storage reserved for Winboat. Feel free to adjust your resource allocations to your liking. I chose to have /home sharing since I am using my own supplied ISO and I have Windows telemetry stripped. Sharing your /home allows you to **EASILY** use tools like the Rivals Toolkit to manage your skin mods.

After Winboat has finished installing the operating system, you will want to access the `Configuration` menu and change some settings, such as turning off `Auto Start Container`. This is so you don't accidentally start your gaming session with a VM running in the background. Scroll down towards the bottom and enable `Experimental Features`. This is so you can perform USB passthrough functions. Click save to apply changes.

USB Passthrough allows you to configure stubborn game controllers like the Playstation 5 Dual Sense Edge controller with Playstation Accessories, access, configure, and update firmware of proprietary accesories like using Logitech GHub for your headsets, microphones, and mice just to name one of many examples.

For Rivals Toolkit, assuming you are using default installation paths for Marvel Rivals, you can point the `Game Root` directory to `\\host.lan\Data\.local\share\Steam\steamapps\common\MarvelRivals`


**Important Notes:**

- ⚠️ Passing through a mouse will disallow the use of it as it is considered part of the VM and not your host. You'll need a second mouse to perform settings and update firmware of the target mouse. ⚠️

- You may need to install additional support packages **INSIDE** the VM such as `Visual C++ Redistributable for Visual Studio 2015` to enable usage of the Rivals Toolkit. Other packages may be required for other accessories apps.

- Controller users have reported that `HIDHide` may be required to use Playstation Accessories and other controller applications.

# DXVK-LOW-LATENCY and VKD3D-LOW-LATENCY

`dxvk-low-latency` and `vkd3d-low-latency` are the golden children of Netborg gracing us with their competitive advantages. `dxvk-low-latency` is used for dx11 games while `vkd3d-low-latency` is for dx12 games. We utilize Netborg's frame pacing work to leverage some serious advantages. If a game does not have Reflex/Anti Lag support, you can still look to tightening frame pacing to gain a competitive advantage! Overwatch and KovaaK's in dx11 is a great example of leveraging `dxvk-low-latency`

From Netborg's dxvk github,

>You can fine-tune the low-latency pacing options towards more fps or towards better latency. `dxvk.lowLatencyOffset = 0` is the default, a negative value will make frames start earlier by the given amount (in microseconds), and thus those frames will more likely run into buffering, which in turn may increase fps. A positive value will make frames start later by the given amount (in microseconds), which make it less likely to run into buffering and thus may improve latency.
>
>In other words, this option has an effect on the percentage of frames which go into GPU buffering. A value of zero will make 50% of frames go (mostly slightly) into buffering, since for most games, the prediction is so accurate that it will average out to 0 microseconds.
>
>It's recommended to check the GPU buffer display (`dxvk.hud = "latencydetails"`) to fine-tune this setting.

For KovaaK's Aim Training, you could apply something like 
```sh
vulkan_present_mode=immediate PROTON_DXVK_LOWLATENCY=1 DXVK_HUD="fps,version,compiler,frametimes,renderlatency,jitter,latencydetails" DXVK_CONFIG="d3d11.maxTessFactor = 8;d3d11.relaxedBarriers = True;dxvk.trackPipelineLifetime = False;dxvk.lowLatencyOffset = 0" game-performance %command%
```

The envar `DXVK_HUD="fps,version,compiler,frametimes,renderlatency,jitter,latencydetails"` displays your stats to allow you to tune your frame pacing. You would adjust the latency offset until your P95 value is zero. I personally use a value of 100.

**Most Viscose Seal+ ranked players will notice the tighter frame pacing and responsiveness once they tune their frame buffers out and will begin to shatter through their PRs (personal records) rapidly**

From Netborg's vkd3d github,

>VKD3D_LOW_LATENCY_OFFSET: Accepts values from 0 to 500 (microseconds). This shifts the frame delivery prediction further into the future, allowing you to tune the pacing towards even lower latency by giving up a small amount of FPS.
>
>Default (100): Acts as a safe baseline since vkd3d-internal blit times are not yet measured. This provides a great balance between maximum FPS and tight pacing.
>Low-Latency Tuning (150 - 300): Recommended for competitive titles where you want the absolute snappiest mouse input and are willing to trade a slight amount of FPS.

We are barely scratching the surface of how powerful these tools are. Use this knowledge to apply to other games!

**Please take some time to read additional informations below:**

https://github.com/netborg-afps/dxvk-low-latency

https://github.com/netborg-afps/vkd3d-low-latency

# Are We Done Yet?! I WANT THE GAME LAUNCH COMMANDS FOR MARVEL RIVALS!! NOW!11!!

We are almost done...

Before you start touching the launch options, you'll want to make sure you have an understanding of proton and how CachyOS's proton works. The latest cachyos proton at the time of writing this guide is `proton-cachyos-11.0-20260703`. This latest version includes proper support for Marvel Rivals with Netborg's `low-latency` applied for VKD3D. You will want to use this. Go to your Steam Settings, Compatibility tab, and change the "Default compatibility tool" to "proton-cachyos-11.0-20260703" or any version newer than that. Make sure you also `Force the use of a specific Steam Play compatibility tool` under the game's Properties menu.

You'll also want to check in the Downloads tab and decide whether you want to use 'Enable Shader Pre-caching' or not. I like having pre-caching, so my 1% lows are buttery smooth in many games, but the processing time can be abysmal with low core count CPUs or if you have done the CPU partitioning tweak.

You can mitigate the abysmal vulkan shader processing times by launching steam through the terminal with taskset. For example with the 7950X to use all available cores, you would do the command below

```sh
steam taskset -c 0-31
```

You will want to close Steam after the game is finished processing Vulkan shaders and relaunch without taskset.

Launch options/launch commands in Steam are technically known as environment variables. We can set some of these options to allow for some pretty neat things, like hiding your AMD from the game so you can use Nvidia Reflex and FSR4.

My Intel+Nvidia system's launch commands for Marvel Rivals:
```sh
PROTON_DLSS_UPGRADE=1 DXVK_NVAPI_DRS_NGX_DLSS_SR_OVERRIDE_RENDER_PRESET_SELECTION=render_preset_l WINEDLLOVERRIDES="dsound=n" PROTON_VKD3D_LOWLATENCY=1 VKD3D_LOW_LATENCY_OFFSET=500 PROTON_LOCAL_SHADER_CACHE=1 PROTON_ENABLE_WAYLAND=0 "/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod" taskset -c 0-15 game-performance %command%
```

Explanation of each launch command for Marvel Rivals:

- `PROTON_DLSS_UPGRADE=1` Force proton DLSS upgrade.
- `DXVK_NVAPI_DRS_NGX_DLSS_SR_OVERRIDE_RENDER_PRESET_SELECTION=render_preset_l` Force DLSS preset to model L. If you are on Nvidia 3000 series, preset K may perform better: `DXVK_NVAPI_DRS_NGX_DLSS_SR_OVERRIDE_RENDER_PRESET_SELECTION=render_preset_k`
- `WINEDLLOVERRIDES="dsound=n"` Enable loading UTOC bypass if you use mods, remove this var if you're not using mods/don't have UTOC bypass installed otherwise your game will not launch.
- `PROTON_VKD3D_LOWLATENCY=1` Enable Netborg's low latency ("Reflex 1.5"). You can find more information on his github at https://github.com/netborg-afps
- `VKD3D_LOW_LATENCY_OFFSET=500` Latency offset by 500 microseconds for correct frame pacing, because "NeteaseFuckingSucks" lol and you do not use the low latency toggle in Sigeon v2, this is your low latency toggle. This command is generally not needed for other games, we are using this to combat Marvel Rival's insane frame buffering.
- `PROTON_LOCAL_SHADER_CACHE=1` Use local shader cache.
- `PROTON_ENABLE_WAYLAND=0` Explicitly disable Wayland, set to 1 to enable Wayland if you're on Wayland, and/or you wish to use HDR.
- `"/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod"` Marvel Rivals-specific MangoHud setting. Alternatively, you can just use `mangohud` in place of that giant line to use your global MangoHud settings. Or, if you don't want to use a stats hud (MangoHud) and wish to set the present mode only, use the command `vulkan_present_mode=` and add either `immediate`, `fifo_latest_ready`, or `mailbox` after the equal sign. Immediate mode allows for screen tearing under some circumstances, and has the absolute lowest latency while fifo_latest_ready and mailbox are best used for when you want to take advantage of G-SYNC+VRR+Reflex+Mailbox sync.
- `taskset -c 0-15` Sets the game to use 8 P-Cores and 8 E-Cores on Intel 270K Plus. Edit this to use the cores specific to your system. Do not use this if you are not CPU partitioning. Some users report "AMDip-like" behavior from adding the E-cores depending on Marvel Rivals patches. Set `taskset -c 0-7` if you want to be safe. Personal testing highly advised.
- `game-performance` Toggle gaming profile of sched-ext, increase game weight and priority, shut off and prevent power saving features, such as monitor dimming/sleep, accidental shutdown.
- `%command%` Runs the above environment variables.


My AMD+AMD system's launch commands for Marvel Rivals:
```sh
PROTON_FSR4_UPGRADE=1 DXVK_NVAPI_ALLOW_OTHER_DRIVERS=1 DXVK_CONFIG="dxgi.hideAmdGpu = True" WINEDLLOVERRIDES="dsound=n" PROTON_VKD3D_LOWLATENCY=1 VKD3D_LOW_LATENCY_OFFSET=500 PROTON_LOCAL_SHADER_CACHE=1 PROTON_ENABLE_WAYLAND=0 "/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod" taskset -c 16-31 game-performance %command%
```

- `PROTON_FSR4_UPGRADE=1` Force proton FSR4 upgrade to the latest version if your game doesn't have FSR4 available in Linux. This upgrades the default FSR 4.0 in-game to FSR 4.1.1, which can be a significant performance boost for many AMD users.
- `DXVK_NVAPI_ALLOW_OTHER_DRIVERS=1` Allows you to use AMD FSR4 option in-game when you're hiding your AMD GPU.
- `DXVK_CONFIG="dxgi.hideAmdGpu = True"` Hides your AMD GPU instead of spoofing as Nvidia. Usually, spoofing can cause issues like breaking FSR4 path.
- `WINEDLLOVERRIDES="dsound=n"` Enable loading UTOC bypass if you use mods, remove this var if you're not using mods/don't have UTOC bypass installed otherwise your game will not launch.
- `PROTON_VKD3D_LOWLATENCY=1` Enable Netborg's low latency ("Reflex 1.5"). You can find more information on his github at https://github.com/netborg-afps
- `VKD3D_LOW_LATENCY_OFFSET=500` Latency offset by 500 microseconds for correct frame pacing, because "NeteaseFuckingSucks" lol and you do not use the low latency toggle in Sigeon v2, this is your low latency toggle. This command is generally not needed for other games, we are using this to combat Marvel Rival's insane frame buffering.
- `PROTON_LOCAL_SHADER_CACHE=1` Use local shader cache.
- `PROTON_ENABLE_WAYLAND=0` Explicitly disable Wayland, set to 1 to enable Wayland if you're on Wayland, and/or you wish to use HDR.
- `"/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod"` Marvel Rivals-specific MangoHud setting. Alternatively, you can just use `mangohud` in place of that giant line to use your global MangoHud settings. Or, if you don't want to use a stats hud (MangoHud) and wish to set the present mode only, use the command `vulkan_present_mode=` and add either `immediate`, `fifo_latest_ready`, or `mailbox` after the equal sign. Immediate mode allows for screen tearing under some circumstances, and has the absolute lowest latency while fifo_latest_ready and mailbox are best used for when you want to take advantage of G-SYNC+VRR+Reflex+Mailbox sync.
- `taskset -c 16-31` Sets the game to use 8 cores and 8 SMT cores of CCD1 (the second CCD) for 3950X/5950X/7950X/9950X. Edit this to use the cores specific to your system. Do not use this if you are not CPU partitioning.
- `game-performance` Toggle gaming profile of sched-ext, increase game weight and priority, shut off and prevent power saving features, such as monitor dimming/sleep, accidental shutdown.
- `%command%` Runs the above environment variables.

# About `DXVK_NVAPI_ALLOW_OTHER_DRIVERS=1` and `DXVK_CONFIG="dxgi.hideAmdGpu = True"`

These two commands are specific to Marvel Rivals, in order to allow AMD to work with the latest FSR4 version and Nvidia Reflex at the time of writing. This may change in the future where `PROTON_FSR4_UPGRADE=1` may no longer be needed.

* Special Note: the `"/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod"` and `VKD3D_LOW_LATENCY_OFFSET=500` are specific to the user quackle. The command `"/home/quackle/.local/share/goverlay/gameconfig/Marvel Rivals/bgmod"` is copy pasted with your user when you configure your performance/stats hud in `goverlay`. You do not have to use mangohud, use the command `vulkan_present_mode=immediate` in place of this var or `vulkan_present_mode=mailbox` if you prefer to have no screen tearing even when uncapped FPS at the cost of some near-imperceptible latency. `VKD3D_LOW_LATENCY_OFFSET=500` can be incredibly taxing on many systems, it is advised to start with the default 100 and work your way up.

I did write this intentionally, so that if you skipped reading, you'll go back and reread instead of blindly copy-pasting everything, and thus learning nothing.

# Acknowledgements
*Special thanks to my family, wife, growing son, CachyOS community, following members, and the additional readings sourced. Those long sessions of writing information, my wife destresses, feeds me nonstop, and providing valuable feedback and motivation in making this guide palatable for many. My son's early interest in computers further strengthens my motivation to continue the work for him and the future generation of gamers. Netborg, Kruzifixxion, and Cypheriel from the CachyOS community — Netborg's work in developing `dxvk-low-latency` and `vkd3d-low-latency` made it possible for many gamers to enjoy Reflex in a greater level than regular Windows Reflex WITHOUT bannable hacky methods. Kruzifixxion's work in CPU partitioning and little tips n tricks of reducing latency is invaluable to Windows refugees who came to Linux and also...**helping edit and fix my caveman writing LOL.** Generally asking for Process Lasso equivalent functions in other communities resulted in insufferable unhelpful neckbeard responses. Major props to Cypheriel for helping me beautify the guide and cleaning up commands to look more professional. Incredible special thanks and mention to CachyOS member Galih Tama, known as galpt/ararasseo/arasseo for helping me design, launch the github.io website, and the development of cake-sqm-setup! We would be doomed to buying expensive routers just for SQM without his work. Aside from CachyOS members mentioned, a HUGE thank you to Peter Jung — a founding father of CachyOS, and his crew. His values and first interactions with me made CachyOS a safe learning environment for serious esports players and Windows refugees when I first joined. If you enjoyed this guide, please join us in the CachyOS Discord community, say hello and thank you one of many incredible giants and pillars of our community!*
