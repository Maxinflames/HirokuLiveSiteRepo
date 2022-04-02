namespace core
{
    export class User
    {
        // private instance members
        private m_displayName: string;
        private m_username: string;
        private m_emailAddress: string;
        private m_password: string;

        // Getters and setters
        public get DisplayName(): string
        {
            return this.m_displayName;
        }
        public set DisplayName(name: string)
        {
            this.m_displayName = name;
        }
        public get EmailAddress(): string
        {
            return this.m_emailAddress;
        }
        public set EmailAddress(email_address: string)
        {
            this.m_emailAddress = email_address;
        }
        public get Username(): string
        {
            return this.m_username;
        }
        public set Username(username: string)
        {
            this.m_username = username;
        }
        public get Password(): string
        {
            return this.m_password;
        }
        public set Password(passcode: string)
        {
            this.m_password = passcode;
        }

        // Constructors
        constructor(displayName: string = "", emailAddress: string = "", username: string = "", password: string = "")
        {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        // Method overrides
        /**
         * This method overrides the built-in toString method and returns a comma seperated string containing the objects property values
         * 
         * @override
         * @returns {string}
         */
        toString(): string
        {
            return `Display Name    : ${this.DisplayName} \nEmail Address : ${this.EmailAddress} \nUsername: ${this.Username}`;
        }

        // Utility methods
        /**
         * 
         * @returns {{DisplayName: string, EmailAddress: string, Username: string}}
         */
        toJSON(): {DisplayName: string, EmailAddress: string, Username: string}
        {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            };
        }

        /**
         * 
         * 
         * @param data 
         */
        // TODO: Need to fix data parameter type
        fromJSON(data: User): void
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        /**
         * This method converts the objects properties into a comma-seperated string
         * 
         * @returns {(string | null)}
         */
        serialize(): string | null
        {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            else
            {
                console.error("One or more properties of the User is empty.")
                return null;
            }
        }

        /**
         * This method seperates the data string parameter into the object's property values 
         * 
         * @param {string} data
         * @returns {void} 
         */
        deserialize(data: string): void
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }
}