<p align="center">
  <img src="doc-images/logo.png" width="540" />
</p>
<h1 align="center">React Three + 8thWall</h1>
<h3 align="center">Create AR applications on 8th Wall, in the best way possible: Declaratively.😉</h3>

<br>

`React Three + 8thWall` is a collection of examples and boilerplate project that enable developers to use <b>React Three.js and Drei components</b> on your AR project for 8thwall.

#### Quick-start

🤩 It's simple as simple as...
`git clone <this repo>`
🚀 Then, install and run:
`npm install`
`npm run dev`

Setup project
In index.html

replace [YOUR_API_TOKEN_HERE] by your App key
---

#### How about SSL Certificates?

8thwall has a weird way of generating SSL, using webpack and a confusing serve.bat file... 🤢
But this project has everything ready and working, out of box! No need to run multiple tasks in the terminal and deal with multiple processes.

When you run `npm run dev` in the terminal, your IP will show up with a ✨https://✨.

##### You might need to create a SSL cert. for mobile

The easiest way, it's to use mkcert (<https://github.com/FiloSottile/mkcert>)
Install:
`brew install mkcert`
and run:
`mkcert -key-file key.pem -cert-file cert.pem <Your I.P>`

then airdrop to phone and install it on your device.

---

#### Examples

Here's a couple of examples I used to test the pipeline. But generally all materials, loaders and components used on Drei or React Three will work (you may face issues with some materials that use camera renders)

### Refraction Material

```jsx
import DreiRefraction from './examples';
<DreiRefraction />;
```

<p align="center">
  <img src="doc-images/refraction.gif" width="240" />
</p>

### Loading GLTF

```jsx
import LoadedGltf from './examples';
<LoadedGltf />;
```

<p align="center">
  <img src="doc-images/gltf.gif" width="240" />
</p>

### Animation Example

```jsx
import AnimatedBox from './examples';
<AnimatedBox />;
```

<p align="center">
  <img src="doc-images/animation.gif" width="240" />
</p>

### Wobble Material

```jsx
import WobbleMaterial from './examples';
<WobbleMaterial />;
```

<p align="center">
  <img src="doc-images/wooble.gif" width="240" />
</p>

### Distorted mesh

```jsx
import MeshDistortion from './examples';
<MeshDistortion />;
```

<p align="center">
  <img src="doc-images/distorted.gif" width="240" />
</p>

## 3D Furniture Models

Visualize 3D furniture from this store: https://www.3dfurniture.net/
