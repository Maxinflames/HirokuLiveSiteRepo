// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function () {
  function Authguard(): void {
    let protected_routes: string[] = ["contact-list"];

    if (protected_routes.indexOf(router.ActiveLink) > 1) {
      if (!sessionStorage.getItem("user")) {
        router.ActiveLink = "login";
      }
    }
  }

  function LoadLink(link: string, data: string = ""): void {
    router.ActiveLink = link;
    Authguard();

    router.LinkData = data;
    history.pushState({}, "", router.ActiveLink);

    // Capitalizes the active link and sets the document title to it.
    document.title =
      router.ActiveLink.substring(0, 1).toUpperCase() +
      router.ActiveLink.substring(1);

    // removes all active Nav Links
    $("ul>li>a").each(function () {
      $(this).removeClass("active");
    });

    $(`li>a:contains(${document.title})`).addClass("active");

    CheckLogin();
    LoadContent();
  }

  function AddNavigationEvents(): void {
    let NavLinks = $("ul>li>a"); // Finds all navigation links

    NavLinks.off("click");
    NavLinks.off("mouseover");

    NavLinks.on("click", function () {
      LoadLink($(this).attr("data") as string);
    });

    NavLinks.on("mouseover", function () {
      $(this).css("cursor", "pointer");
    });
  }

  function AddLinkEvents(link: string): void {
    let linkQuery = $(`a.link[data=${link}]`);

    // remove all link events
    linkQuery.off("click");
    linkQuery.off("mouseover");
    linkQuery.off("mouseout");

    // Css adjustments
    linkQuery.css("text-decoration", "underline");
    linkQuery.css("color", "blue");

    // Add link events
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

  /**
   * This function loads the header.html content into a page
   *
   * @returns {void}
   */
  function LoadHeader(): void {
    $.get("./Views/component/header.html", function (html_data) {
      // inject Header content into the page
      $("header").html(html_data);

      AddNavigationEvents();

      CheckLogin();
    });
  }

  /**
   * Loads views content into SPA
   *
   * @returns {void}
   */
  function LoadContent(): void {
    let page_name = router.ActiveLink;
    let callback = ActiveLinkCallBack();

    console.log(page_name);
    $.get(`./Views/content/${page_name}.html`, function (html_data) {
      $("main").html(html_data);

      callback();
    });
  }

  /**
   * Loads footer file into SPA
   *
   * @returns {void}
   */
  function LoadFooter(): void {
    $.get("./Views/component/footer.html", function (html_data) {
      // inject footer content into the page
      $("footer").html(html_data);
    });
  }

  function DisplayHomePage(): void {
    console.log("Home Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> Welcome to my site.<br>Enjoy your stay!</a>`
    );
  }

  function DisplayProducts(): void {
    console.log("Products Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> This page displays my favourite projects that I have worked on.</a>`
    );
    $("main").append(
      `<img src="./Images/Project.PNG" alt="This Project"  width="700" height="400">`
    );
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

  function DisplayServicesPage(): void {
    console.log("Services Page");
    // Create reference to entry point for insertion/deletion
    let MainContent = document.getElementsByTagName("main")[0];

    // Create HTML Element in memory
    let MainParagraph = document.createElement("p");
    let FirstParagraph = document.createElement("p");
    let SecondParagraph = document.createElement("p");
    let ThirdParagraph = document.createElement("p");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> These are the 3 best things that set us apart from many.</a>`
    );
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

  function DisplayAboutPage(): void {
    console.log("About Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> Meet the Programmer!</a>`
    );
    $("main").append(
      `<img src="./Images/Me1.jpg" alt="Solo Picture"  width="300" height="400">  <img src="./Images/Me2.jpg" alt="Picture with Little Sister"  width="300" height="400">`
    );
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                     Maximus Vanhaarlem, 20 years old, currently enrolled at Durham College in Computer Programming for IT
                                     <br>Taught in C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. Looking to make a name for himself
                                     <br>the world, and enjoy his life, whilst being unable to take a good photo to save his life.
                                     <br><a href="./DownloadItems/MVResume.pdf" download><img src="./Images/PDFPicture.png" alt="Resume" width="60" height="60"></a></p>`);
  }

  function DisplayContactPage(): void {
    console.log("Contact Page");

    $("a[data = 'contact-list']").off("click");
    $("a[data = 'contact-list']").on("click", function () {
      LoadLink("contact-list");
    });

    ContactFormValidation();

    if (sessionStorage.getItem("user")) {
      // Set contact-list-btn to be visible if user is logged in
      $("#contact-list-btn").show();
    } else {
      // Set contact-list-btn to be invisible if user is not logged in
      $("#contactList").hide();
    }
    let sendButton = document.getElementById("sendButton") as HTMLElement;
    let subscribeCheckbox = document.getElementById(
      "subscribeCheckbox"
    ) as HTMLInputElement;

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
      let contactList = document.getElementById("contactList") as HTMLElement;

      let data = ""; // data container -> add deserialized data from the localStorage

      let keys = Object.keys(localStorage); // returns a string array of keys

      let index = 1; // counts how many keys

      // for every key in the keys array (collection), loop
      for (const key of keys) {
        let contactData = localStorage.getItem(key); // get localStorage data value related to the key

        let contact = new core.Contact(); // create a new empty contact object
        contact.deserialize(contactData as string);

        // inject a repeatable row into the contactList
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
          localStorage.removeItem($(this).val() as string);
        }

        // refresh after deleting
        LoadLink("contact-list");
      });

      $("button.edit").on("click", function () {
        LoadLink("edit", $(this).val() as string);
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

            let fullName = document.forms[0].fullName.value as string;
            let contactNumber = document.forms[0].contactNumber.value as string;
            let emailAddress = document.forms[0].emailAddress.value as string;

            // Add Contact
            AddContact(fullName, contactNumber, emailAddress);

            // refresh the contact-list page
            LoadLink("contact-list");
          });

          $("#cancelButton").on("click", () => {
            LoadLink("contact-list");
          });
        }
        break;
      default:
        {
          // get the contact  info from localStorage
          let contact = new core.Contact();
          contact.deserialize(localStorage.getItem(page) as string);

          // display the contact info in the edit form
          $("#fullName").val(contact.FullName);
          $("#contactNumber").val(contact.ContactNumber);
          $("#emailAddress").val(contact.EmailAddress);

          // when editButton is pressed - update the contact
          $("#editButton").on("click", (event) => {
            event.preventDefault();

            // get any changes from the form
            contact.FullName = $("#fullName").val() as string;
            contact.ContactNumber = $("#contactNumber").val() as string;
            contact.EmailAddress = $("#emailAddress").val() as string;

            // replace the item in localStorage
            localStorage.setItem(page, contact.serialize());

            // return to the contact-list
            LoadLink("contact-list");
          });

          $("#cancelButton").on("click", () => {
            LoadLink("contact-list");
          });
        }
        break;
    }
  }

  function DisplayRegisterPage(): void {
    console.log("Register Page");
  }

  function DisplayLoginPage() {
    console.log("Login Page");
    let messageArea = $("#messageArea");
    messageArea.hide();

    AddLinkEvents("register");

    $("#loginButton").on("click", function () {
      let success = false;

      // create an empty user object
      let newUser = new core.User();

      let username = document.forms[0].username.value as string;
      let password = document.forms[0].password.value as string;

      // use jQuery shortcut to lod the users.json file
      $.get("./Data/users.json", function (data) {
        // for every user in the users.json file, loop
        for (const user of data.users) {
          // check if the username and password entered matches the user data
          if (username == user.Username && password == user.Password) {
            console.log("conditional passed!");
            // get the user data from the file and assign it to our empty user object
            newUser.fromJSON(user);
            success = true;
            break;
          }
        }

        // if username and password matches..success! -> perform the login sequence
        if (success) {
          // add user to session storage
          sessionStorage.setItem("user", newUser.serialize() as string);

          // hide any error message
          messageArea.removeAttr("class").hide();

          // redirect the user to the secure area of the site - contact-list.html
          LoadLink("contact-list");
        } else {
          // display an error message
          $("#username").trigger("focus").trigger("select");
          messageArea
            .addClass("alert alert-danger")
            .text("Error: Invalid Login Credentials")
            .show();
        }
      });
    });

    $("#cancelButton").on("click", function () {
      // clear the login form
      document.forms[0].reset();

      // return to the home page
      LoadLink("home");
    });
  }

  function Display404Page(): void {}

  function CheckLogin(): void {
    // if user is logged in
    if (sessionStorage.getItem("user")) {
      // swap out the login link for logout
      $("#login").html(
        `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      );

      $("#logout").on("click", function () {
        // perform logout
        sessionStorage.clear();

        // Swaps logout link for login
        $("#login").html(
          `<a class="nav-link" data = "login"><i class="fas fa-sign-in-alt"></i> Login</a>`
        );

        AddNavigationEvents();

        // Loads login page
        LoadLink("login");
      });
    }
  }

  /**
   *  This function adds a Contact object to localStorage
   *
   * @param {string} fullName
   * @param {string} contactNumber
   * @param {string} emailAddress
   */
  function AddContact(
    fullName: string,
    contactNumber: string,
    emailAddress: string
  ): void {
    let contact = new core.Contact(fullName, contactNumber, emailAddress);
    if (contact.serialize()) {
      let key = contact.FullName.substring(0, 1) + Date.now();
      localStorage.setItem(key, contact.serialize() as string);
    }
  }

  /**
   * This method validates a given field from in a form,
   * and displays an error in the message area div element.
   *
   * @param {string} fieldID
   * @param {RegExp} regularExpression
   * @param {string} errorMessage
   */
  function ValidateField(
    fieldID: string,
    regularExpression: RegExp,
    errorMessage: string
  ) {
    let messageArea = $("#messageArea").hide();
    $("#" + fieldID).on("blur", function () {
      let textValue = $(this).val() as string;
      if (!regularExpression.test(textValue)) {
        // doesn't pass RegEx test
        $(this).trigger("focus"); // go back to the FullName text box
        $(this).trigger("select"); // select all the Text in the FullName text box
        messageArea.addClass("alert alert-danger"); // add the alert to the div element
        messageArea.text(errorMessage);
        messageArea.show();
      } else {
        // does pass RegEx test
        messageArea.removeAttr("class");
        messageArea.hide();
      }
    });
  }

  function ContactFormValidation(): void {
    ValidateField(
      "fullName",
      /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/,
      "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name."
    );
    ValidateField(
      "contactNumber",
      /(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
      "Please enter a valid Contact Number. Example: (416) 555-5555"
    );
    ValidateField(
      "emailAddress",
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/,
      "Please enter a valid Email Address. Example: Example_Email@hotmail.com"
    );
  }

  /**
   *
   * @param {string} activeLink
   * @returns {function}
   */
  function ActiveLinkCallBack(): Function {
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

  /**
   * This is the entry point to the web application
   *
   */
  function Start(): void {
    console.log("App Started!");

    // Runs LoadHeader function which injects the Header.html content
    LoadHeader();

    // Loads page content based on active link
    LoadLink("home");

    // runs the load footer function (no functionality at current time)
    LoadFooter();
  }

  window.addEventListener("load", Start);
})();
