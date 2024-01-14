function findAncestorWithTabindex(targetElement) {
    if (targetElement == null) {
        return null
    }
    
    let currentElement = targetElement.parentElement

    while (currentElement) {
        if (currentElement.hasAttribute('tabindex')) {
          // Found an ancestor with tabindex
          console.log('Ancestor with tabindex found:', currentElement);
          return currentElement;
        }
    
        currentElement = currentElement.parentElement;
    }

    console.log('No ancestor with tabindex found.');
    return null;  
}

console.log('Handle file trees');
const fileTree = document.getElementById("repos-file-tree")
tabIndexParent = findAncestorWithTabindex(fileTree)

if (tabIndexParent) {
    tabIndexParent.classList.add("focus-hide")
}

console.log('Handle side bars');
const sideBarElements = document.getElementsByClassName("Layout-sidebar")

if (sideBarElements != null && sideBarElements != undefined) {
    const mainSideBar = sideBarElements[0]
    console.log("Side Bar found.", mainSideBar)
    console.log(mainSideBar.classList)
    mainSideBar.classList.add("focus-hide")
    console.log(mainSideBar.classList)

    const parentElement = mainSideBar.parentElement
    parentElement.classList.add("Layout-side-bar-hide")
}
