namespace core
{
    export class Router
    {
        // Private Instance members
        private m_activeLink: string;
        private m_linkData: string;
        private m_routingTable: string[];

        // Public Properties - Getters
        /**
         * @returns {string}
         */
        public get ActiveLink(): string
        {
            return this.m_activeLink;
        }

        // Public Properties - Setters
        /**
         * @param {string} link
         * @returns {void}
         */
        public set ActiveLink(link: string)
        {
            this.m_activeLink = link;
        }


        // Public Properties - Getters
        /**
         * @returns {string}
         */
         public get LinkData(): string
         {
             return this.m_linkData;
         }
 
         // Public Properties - Setters
         /**
          * @param {string} link
          * @returns {void}
          */
         public set LinkData(link: string)
         {
             this.m_linkData = link;
         }

        // Constructor
        /**
         * Creates an instance of Router
         * 
         * @constructor
         */
        constructor()
        {
            this.m_activeLink = "";
            this.m_linkData = "";
            this.m_routingTable = [];
        }

        /**
         * This method adds a new route to the routing table
         * 
         * @param {string} route 
         * @returns {void}
         */
        // Public Methods
        Add(route: string): void
        {
            this.m_routingTable.push(route);
        }
        
        /**
         * This method replaces the reference for the routing table with a new one.
         * Note: Routes should begin with a '/' character
         * 
         * @param {string[]} routingTable 
         * @returns {void}
         */
        AddTable(routingTable: string[]): void
        {
            this.m_routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the routing table
         * otherwise it returns -1 if route is not found
         * 
         * @param {string} route 
         * @returns {number}
         */
        Find(route: string): number
        {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table
         * Returns true if the route was sucessfully removed
         * Otherwise, returns false
         * 
         * @param {string} route 
         * @returns {boolean}
         */
        Remove(route: string): boolean
        {
            if(this.Find(route) > -1)
            {
                // removes the route
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            else
            {
                return false;
            }
        }

        // Public Override Methods

        /**
         * This method overrides the built in toString() method and 
         * returns the routing table in a comma-seperated string
         * 
         * @override
         * @returns {string}
         */
        toString(): string
        {
            return this.m_routingTable.toString()
        }

    }

}

let router: core.Router = new core.Router();

router.AddTable([
    "/", // Default Route
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/projects",
    "/register",
    "/login",
    "/edit"
]);

let route: string = location.pathname; // alias for location.pathname

// If route is found in the Routing Table: Else 404
router.ActiveLink = (router.Find(route) > -1) ? router.ActiveLink = (route == "/") ? "home" : route.substring(1) : "404";