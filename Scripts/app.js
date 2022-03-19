"use strict";
(function () {
    function Authguard() {
        let protected_routes = ["contact-list"];
        if (protected_routes.indexOf(router.ActiveLink) > 1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        Authguard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title =
            router.ActiveLink.substring(0, 1).toUpperCase() +
                router.ActiveLink.substring(1);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
        LoadContent();
    }
    function AddNavigationEvents() {
        let NavLinks = $("ul>li>a");
        NavLinks.off("click");
        NavLinks.off("mouseover");
        NavLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        NavLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function LoadHeader() {
        $.get("./Views/component/header.html", function (html_data) {
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        console.log(page_name);
        $.get(`./Views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function LoadFooter() {
        $.get("./Views/component/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("main").append(`<p id="MainParagraph" class="h5 mt-3 "> Welcome to my site.<br>Enjoy your stay!</a>`);
    }
    function DisplayProducts() {
        console.log("Products Page");
        $("main").append(`<p id="MainParagraph" class="h5 mt-3 "> This page displays my favourite projects that I have worked on.</a>`);
        $("main").append(`<img src="./Images/Project.PNG" alt="This Project"  width="700" height="400">`);
        $("main")
            .append(`<p class="h7 mt-3 ">This website, made using HTML, Javascript and Node has been thoroughly enjoyable, 
                                    <br>and I have learned alot from it due to my profs enjoyable teaching style (Not trying to get 
                                    <br>brownie points I legitimately feel this way lol).</p>`);
        $("main")
            .append(`<p class="h7 mt-3 ">Another Project I enjoyed working on was my first attempt to recreate the once 
                                    <br>very popular game "Tetris". It was a project I attempted before beginning college, and failed 
                                    <br>disasterously, but I learned alot on how Object Oriented Programming works, and had I have had 
                                    <br>the time, I believe I would have completed it once restarting.</p>`);
        $("main")
            .append(`<p class="h7 mt-3 ">A project I did not explicitly enjoy doing, but was proud of the end result 
                                    <br>was my WEBD-3201 website. It was a painful journey but it ended up working exactly how I had
                                    <br>wanted, and looked in my opinion quite stunning, unfortunately I have no pictures of the end result/p>`);
    }
    function DisplayServicesPage() {
        console.log("Services Page");
        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");
        let FirstParagraph = document.createElement("p");
        let SecondParagraph = document.createElement("p");
        let ThirdParagraph = document.createElement("p");
        $("main").append(`<p id="MainParagraph" class="h5 mt-3 "> These are the 3 best things that set us apart from many.</a>`);
        $("main")
            .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    Our programmers are skilled with many different types of programming languages, some of which
                                    <br>being, C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. As such we are skilled in
                                    <br>many different regions of programming and give you the best options for what you are looking for.</p>`);
        $("main")
            .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We look to give a one on one experience with any clients we accumulate, and strive to give you 
                                    <br>what your looking for in your website. Whether it be design or functionality, I am certain 
                                    <br>we will give you what your looking for through our personal touch and details.</p>`);
        $("main")
            .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We are very detail oriented, and find ourselves unable to sleep with details on our minds,
                                    <br>and as such, we can assure you that you will get the best product we can come up with.</p>`);
    }
    function DisplayAboutPage() {
        console.log("About Page");
        $("main").append(`<p id="MainParagraph" class="h5 mt-3 "> Meet the Programmer!</a>`);
        $("main").append(`<img src="./Images/Me1.jpg" alt="Solo Picture"  width="300" height="400">  <img src="./Images/Me2.jpg" alt="Picture with Little Sister"  width="300" height="400">`);
        $("main")
            .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                     Maximus Vanhaarlem, 20 years old, currently enrolled at Durham College in Computer Programming for IT
                                     <br>Taught in C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. Looking to make a name for himself
                                     <br>the world, and enjoy his life, whilst being unable to take a good photo to save his life.
                                     <br><a href="./DownloadItems/MVResume.pdf" download><img src="./Images/PDFPicture.png" alt="Resume" width="60" height="60"></a></p>`);
    }
    function DisplayContactPage() {
        console.log("Contact Page");
        $("a[data = 'contact-list']").off("click");
        $("a[data = 'contact-list']").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();
        if (sessionStorage.getItem("user")) {
            $("#contact-list-btn").show();
        }
        else {
            $("#contactList").hide();
        }
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
            setTimeout(function () {
                LoadLink("home");
            }, 3000);
        });
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;
                index++;
            }
            contactList.innerHTML = data;
            $("button.delete").on("click", function () {
                if (confirm("Are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                LoadLink("contact-list");
            });
            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val());
            });
        }
        $("#addButton").on("click", () => {
            LoadLink("edit", "add");
        });
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
        let page = router.LinkData;
        switch (page) {
            case "add":
                {
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            let username = document.forms[0].username.value;
            let password = document.forms[0].password.value;
            $.get("./Data/users.json", function (data) {
                for (const user of data.users) {
                    if (username == user.Username && password == user.Password) {
                        console.log("conditional passed!");
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            LoadLink("home");
        });
    }
    function Display404Page() { }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $("#logout").on("click", function () {
                sessionStorage.clear();
                $("#login").html(`<a class="nav-link" data = "login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                AddNavigationEvents();
                LoadLink("login");
            });
        }
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(fieldID, regularExpression, errorMessage) {
        let messageArea = $("#messageArea").hide();
        $("#" + fieldID).on("blur", function () {
            let textValue = $(this).val();
            if (!regularExpression.test(textValue)) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messageArea.addClass("alert alert-danger");
                messageArea.text(errorMessage);
                messageArea.show();
            }
            else {
                messageArea.removeAttr("class");
                messageArea.hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/, "Please enter a valid Email Address. Example: Example_Email@hotmail.com");
    }
    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home":
                return DisplayHomePage;
            case "products":
                return DisplayProducts;
            case "services":
                return DisplayServicesPage;
            case "about":
                return DisplayAboutPage;
            case "contact":
                return DisplayContactPage;
            case "contact-list":
                return DisplayContactListPage;
            case "edit":
                return DisplayEditPage;
            case "login":
                return DisplayLoginPage;
            case "register":
                return DisplayRegisterPage;
            case "404":
                return Display404Page;
            default:
                console.error("ERROR: callback does not exist: " + router.ActiveLink);
                return new Function();
        }
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map