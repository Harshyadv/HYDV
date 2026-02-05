document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.innerText = "Copy";

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(button);

    button.addEventListener("click", () => {
      const code = pre.querySelector("code").innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          button.innerText = "Copy";
          button.classList.remove("copied");
        }, 2000);
      });
    });
  });
});
