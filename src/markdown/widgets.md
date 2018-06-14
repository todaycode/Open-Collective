# For collectives

## Donate button

    <script src="https://opencollective.com/:collectiveSlug/:verb/button.js" color="[white|blue]"></script>

Just replace `:collectiveSlug` with the slug of your collective (e.g. webpack for https://opencollective.com/webpack).
The verb can either be "donate" or "contribute".
Example:
<center><script src="https://opencollective.com/webpack/donate/button.js"></script><script src="https://opencollective.com/webpack/donate/button.js" color="blue"></script><script src="https://opencollective.com/webpack/contribute/button.js" color="blue"></script></center>

If you want to add a donate button to a blog post, you can load an image version of the logo and then link to the donate page of your collective.

    <a href="https://opencollective.com/webpack/donate" target="_blank">
      <img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" width=300 />
    </a>

Result:

<center><a href="https://opencollective.com/webpack/donate" target="_blank"><img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" width=300 /></a></center>

On Medium, just download the image then upload it to your post (make sure the image file ends with "@2x" to make it retina size). To link it, select the image then press CMD+K (or CTRL+K on Windows). A pop up menu will show up where you can enter the URL to link the image to (see [Medium support page](https://help.medium.com/hc/en-us/articles/115004808847-Image-links)). Here is an example: https://medium.com/open-collective/open-collective-donate-button-e7e6d5965b2c


## Show backers and sponsors

Just add this script:

    <script src="https://opencollective.com/:collectiveSlug/banner.js"></script>

where `:collectiveSlug` is the slug of your collective, e.g. `apex` for https://opencollective.com/apex.

You can also add a style object (react style), e.g.

    <script src='https://opencollective.com/:collectiveSlug/banner.js?style={"a":{"color":"red"},"h1":{"fontFamily":"Verdana","fontWeight":"normal","fontSize":"20px"}}'></script>

Note: make sure that your style object is parsable with `JSON.stringify`.

### Examples:
- http://apex.run/#links
- https://www.spinacms.com/


### How to customize it?

This will use the default styling of your `h1` and `h2` on your page.
You can target them with CSS to customize them:

    #opencollective-banner h1 {
      color: black;
    }


## Show next events

    <script src="https://opencollective.com/:collectiveSlug/events.js" width="500"></script>

Example:

<script src="https://opencollective.com/brusselstogether/events.js" width="500"></script>


# For backers and sponsors

To show the list of collectives that you are backing on your website, just add this script:

    <script src="https://opencollective.com/:username/collectives.js?role=backer"></script>

You can replace `backer` by `admin` (core contributor), `member` (contributor) or `host`.
Leave it empty or remove it to show all the collectives that you are a member of irrespective of the role.

E.g. http://polycode.co.uk

![](https://cl.ly/01082x0W042G/Screen%20Shot%202017-02-27%20at%205.22.09%20PM.png)


# Feedback

If you would like a different or custom widget, let us know. Send us your feedback to info@opencollective.com or join us on our slack: https://slack.opencollective.com.