"use strict";
(function () {
    function AuthGuard() {
        let protected_routes = [
            "/contact-list",
            "/edit"
        ];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function DisplayHome() {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`
        <article>
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);
    }
    function DisplayProjectsPage() {
        console.log("Projects Page");
        $("main").append(`<p id="MainParagraph" class="h5 mt-3 "> This page displays my favourite projects that I have worked on.</a>`);
        $("main").append(`<img src="./Assets/Images/Project.PNG" alt="This Project"  width="700" height="400">`);
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
        $("main").append(`<img src="./Assets/Images/Me1.jpg" alt="Solo Picture"  width="300" height="400">  <img src="./Assets/Images/Me2.jpg" alt="Picture with Little Sister"  width="300" height="400">`);
        $("main")
            .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                       Maximus Vanhaarlem, 20 years old, currently enrolled at Durham College in Computer Programming for IT
                                       <br>Taught in C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. Looking to make a name for himself
                                       <br>the world, and enjoy his life, whilst being unable to take a good photo to save his life.
                                       <br><a href="./DownloadItems/MVResume.pdf" download><img src="./Assets/Images/PDFPicture.png" alt="Resume" width="60" height="60"></a></p>`);
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(input_field_ID, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $("#" + input_field_ID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/, "Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $("#logout").on("click", function () {
                sessionStorage.clear();
                $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                location.href = "/login";
            });
        }
    }
    function DisplayLoginPage() {
        console.log("Login Page");
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function Display404() {
    }
    function Start() {
        console.log("App Started!!");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHome();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "products":
                DisplayProjectsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "edit":
                DisplayEditPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map