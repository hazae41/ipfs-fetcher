# ipfs-fetcher
Fetch all resources of a hash to any gateway

![](https://cdn-images-1.medium.com/max/2600/1*czZJ7mvEAqL4wNAg-jt9Ow.jpeg)

#### What is the project about?
This project is about a better distribution of resources on the InterPlanetary File System (IPFS) by allowing developers and end-users to prefetch all resources of a hash on a specific public gateway.

Before this tool, only requested subfolders and subfiles would be fetched. With this tool, you can fetch all of them and check their availability on the specified gateway. 

This can be used when we need to publish something, or distribute something on another gateway, or even check the persistence of all resources of a hash. 

Example: I'm on planet Mars, I need to open a website on IPFS, but before, I check if all its resources are available on the Mars gateway.

It is available here: https://fetchipfs.netlify.com/

You can test it with the neocities hash: QmcKi2ae3uGb1kBg1yBpsuwoVqfmcByNdMiZ2pukxyLWD8

#### Technology Stack
It is a simple one-page website built with React and Material-UI. It does not require any IPFS instance running.
