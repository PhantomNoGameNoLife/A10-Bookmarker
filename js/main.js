var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var validNameMessage = document.getElementById('validName');
var validURLMessage = document.getElementById('validURL');

var siteList = [];
if (localStorage.getItem('sites')) {
    siteList = JSON.parse(localStorage.getItem('sites'));
    displaySite(siteList);
}

function validName(name) {
    var regex = /^[a-zA-Z]{3,10}$/;
    if (regex.test(name)) {
        siteName.classList.remove('is-invalid');
        siteName.classList.add('is-valid');
        validNameMessage.classList.remove('invalid-tooltip');
        validNameMessage.classList.add('valid-tooltip', 'd-block');
        validNameMessage.innerHTML = 'Looks good!';
        return true;
    }
    siteName.classList.remove('is-valid');
    siteName.classList.add('is-invalid');
    validNameMessage.classList.remove('valid-tooltip');
    validNameMessage.classList.add('invalid-tooltip', 'd-block');
    validNameMessage.innerHTML = 'Site name must contain 3-10 characters only';
    return false;
}

function validURL(url) {
    var regex = /^https?:\/\/(www\.)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(\/)?$/;
    if (regex.test(url)) {
        siteURL.classList.remove('is-invalid');
        siteURL.classList.add('is-valid');
        validURLMessage.classList.remove('invalid-tooltip');
        validURLMessage.classList.add('valid-tooltip', 'd-block');
        validURLMessage.innerHTML = 'Looks good!';
        return true;
    }
    siteURL.classList.remove('is-valid');
    siteURL.classList.add('is-invalid');
    validURLMessage.classList.remove('valid-tooltip');
    validURLMessage.classList.add('invalid-tooltip', 'd-block');
    validURLMessage.innerHTML = 'Please enter a valid URL like https://example.com or http://www.site.org/ or https://blog.site-sub.app';
    return false;
}

function addSite() {
    if (validName(siteName.value) && validURL(siteURL.value)) {
        var site = {
            name: siteName.value,
            url: siteURL.value
        }
        siteList.push(site);
        localStorage.setItem('sites', JSON.stringify(siteList))
        displaySite(siteList);
        clearInput();
    }
}

function clearInput() {
    siteName.value = '';
    siteURL.value = '';
    validNameMessage.classList.remove('d-block');
}

function displaySite(site) {
    var x = '';
    for (var i = 0; i < site.length; i++) {
        x += `
            <tr scope="row">
                <td>${i + 1}</td>
                <td>${site[i].name}</td>
                <td><a href="${site[i].url}" target="_blank" class="btn btn-primary btn-custom"><i
                                    class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `
    }
    document.getElementById('site').innerHTML = x;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(siteList))
    displaySite(siteList);
}