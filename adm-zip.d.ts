
declare module 'adm-zip-ex'
{

    export default class AdmZip
    {
        /**
         * 
         * @param zipPath 
         */
        constructor( zipPath:string );

        //#region private 
        
        /**
         * 
         * @param prefix 
         * @param name 
         */
        private sanitize(prefix:string, name:string):string;

        // /**
        //  * get Entry for parameter
        //  * @param entry  If entry was given as a file name else if entry was given as a ZipEntry object
        //  */
        // private getEntry(entry:Object|string) :ZipEntry|null;

        //#endregion

		/**
		 * Returns an array of ZipEntry objects representing the files and folders inside the archive
		 *
		 * @return Array
		 */
        public getEntries():Array<ZipEntry>;

		/**
		 * Extracts the given entry from the archive and returns the content as a Buffer object 
		 * @param entry ZipEntry object or String with the full path of the entry
		 *
		 * @return Buffer or Null in case of error
		 */
		public readFile (entry:ZipEntry):Buffer|null;

		/**
		 * Asynchronous readFile
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 *
		 * @return Buffer or Null in case of error
		 */
		public readFileAsync (/*Object*/entry:ZipEntry, callback:(data:Buffer|null) => void ):void;

        /**
		 * Extracts the given entry from the archive and returns the content as plain text in the given encoding
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		public readAsText ( entry:ZipEntry, encoding:string ):string;

		/**
		 * Asynchronous readAsText
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		public readAsTextAsync(entry:ZipEntry, /*Function*/callback:(text:string) => void, encoding:string):void;
        
        /**
		 * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
		 *
		 * @param entry
		 */
        public deleteFile(entry:ZipEntry):void;

        /**
		 * Adds a comment to the zip. The zip must be rewritten after adding the comment.
		 * @param comment
		 */
		public addZipComment(comment:string):void;

        /**
		 * Returns the zip comment
		 *
		 * @return String
		 */
		public getZipComment ():string;

		/**
		 * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
		 * The comment cannot exceed 65535 characters in length
		 *
		 * @param entry
		 * @param comment
		 */
        public addZipEntryComment(entry:ZipEntry, comment:string) :void
        
        /**
		 * Returns the comment of the specified entry
		 *
		 * @param entry
		 * @return String
		 */
		public getZipEntryComment (entry:ZipEntry):string;

        /**
		 * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
		 *
		 * @param entry
		 * @param content
		 */
        public updateFile(entry:ZipEntry, content:Buffer):void;

		/**
		 * Adds a file from the disk to the archive
		 *
		 * @param localPath File to add to zip
		 * @param zipPath Optional path inside the zip
		 * @param zipName Optional name for the file
		 */
        public addLocalFile (localPath:string, zipPath:string, zipName:string):void; 

        /**
		 * Adds a local directory and all its nested files and directories to the archive
		 *
		 * @param localPath
		 * @param zipPath optional path inside zip
		 * @param filter optional RegExp or Function if files match will
		 *               be included.
		 */
		public addLocalFolder(localPath:string, zipPath:string, filter:(...arg:any)=>any|RegExp ):void; 

        /**
		 * Allows you to create a entry (file or directory) in the zip file.
		 * If you want to create a directory the entryName must end in / and a null buffer should be provided.
		 * Comment and attributes are optional
		 *
		 * @param entryName
		 * @param content
		 * @param comment
		 * @param attr
		 */
        public addFile (entryName:string, content:Buffer, comment:string, attr:number):void ;

        /**
		 * Returns an array of ZipEntry objects representing the files and folders inside the archive
		 *
		 * @return Array
		 */
		public getEntries():Array<ZipEntry>; 

		/**
		 * Returns a ZipEntry object representing the file or folder specified by ``name``.
		 *
		 * @param name
		 * @return ZipEntry
		 */
		public getEntry(name:string) :ZipEntry;


		/**
		 * Extracts the given entry to the given targetPath
		 * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
		 *
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param targetPath Target folder where to write the file
		 * @param maintainEntryPath If maintainEntryPath is true and the entry is inside a folder, the entry folder
		 *                          will be created in targetPath as well. Default is TRUE
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 *
		 * @return Boolean
		 */
		public extractEntryTo(entry:ZipEntry, targetPath:string, maintainEntryPath:boolean,overwrite:boolean):boolean ;

        /**
         * 
         * @param zipEntry 
         * @param targetPath 
         * @param maintainEntryPath 
         * @param overwrite 
         * @param callback 
         */
        public extractEntryToAsync( zipEntry:ZipEntry , 
            targetPath:string , 
            maintainEntryPath:boolean , 
            overwrite:boolean , 
            callback:(err:any)=>void):any;

        /**
		 * Test the archive
		 * @return Boolean
		 */
		public test():boolean;

        /**
         * (Asynchronous) Extracts the entire archive to the given location
         *
         * @param targetPath Target location
         * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         * @param callback
         */
        public extractAllToAsync(targetPath:string, overwrite:boolean, callback:(error:any) => void ):void

		/**
		 * Extracts the entire archive to the given location
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 */
		public extractAllTo (targetPath:string, overwrite:boolean):void;
        
		/**
		 * Asynchronous extractAllTo
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 * @param callback
		 */
        public extractAllToAsync( targetPath:String, overwrite:boolean, callback:(error:any) => void ) : void;

        /**
		 * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
		 *
		 * @param targetFileName
		 * @param callback
		 */
        public writeZip (targetFileName:String,callback:(error:any) => void):void;
        
        /**
		 * Returns the content of the entire zip file as a Buffer object
		 *
		 * @return Buffer
		 */
		public toBuffer(onSuccess:(...arg:any)=>any, onFail:(...arg:any)=>any, onItemStart:(...arg:any)=>any, onItemEnd:(...arg:any)=>any):Buffer;
    }

    /**
     * 
     */
    export class ZipEntry 
    {
        constructor(input:Buffer);

        //#region 

        private _entryHeader:any;
        private _entryName:Buffer;
        private _comment:Buffer;
        private _isDirectory:Buffer;
        private uncompressedData:any;
        private _extra:Buffer;

        private getCompressedDataFromZip():Buffer;
        private crc32OK(data:any):boolean;
        private decompress(async:boolean,callback:(data:Buffer, Error:string) => void, pass:string):Buffer|string; 
        private compress(async:boolean, callback:(data:Buffer) => void):Buffer;
        /** none */
        private readUInt64LE(buffer:Buffer, offset:number):any;
        /** none */
        private parseExtra(data:any):void; 
        private parseZip64ExtendedInformation(data:any):void;
        //#endregion
        //public entryName:string;
        //public isDirectory:boolean;

        public get entryName():any|string;
        public get rawEntryName():Buffer;
        public set entryName(val:any);
        public get extra():Buffer;
        public set extra(val:Buffer);
        public get comment():any|string;
        public set comment(val:any|string|Buffer);
        public get name():string;
        public get isDirectory():boolean;

        public getCompressedData():any;
        public getCompressedDataAsync(callback:(data:Buffer) => void):void;

        public setData(value:any):void;
        public getData(pass:any):any;
        public getDataAsync(callback:(...args:any) => void,pass:any):void;

        public get attr():any;
        public set attr(val:any);
        public get header():any;
        public set header(val:any);

        public packHeader():any;

        public toString():string;

    }

    /**
     * 
     */
    export class ZipFile
    {   
        //#region 
        private entryList:Array<ZipEntry>;
        private entryTable:any;
        private _comment:Buffer;
        private filename:string;
        private inBuffer:any;
        private mainHeader:any;

        private readEntries():void;
        private readMainHeader():void;
        //#endregion

		/**
		 * Returns an array of ZipEntry objects existent in the current opened archive
		 * @return Array
		 */
        public get entries():Array<ZipEntry>;

        /**
		 * Archive comment
		 * @return {String}
		 */
        public get comment():string;

        public set comment(val:string);

		/**
		 * Returns a reference to the entry with the given name or null if entry is inexistent
		 *
		 * @param entryName
		 * @return ZipEntry
		 */
        public getEntry(entryName:string):ZipEntry;

		/**
		 * Adds the given entry to the entry list
		 *
		 * @param entry
		 */
        public setEntry(entry:ZipEntry):void; 
        
        /**
		 * Removes the entry with the given name from the entry list.
		 *
		 * If the entry is a directory, then all nested files and directories will be removed
		 * @param entryName
		 */
        public deleteEntry(entryName:string):void;
        
        /**
		 *  Iterates and returns all nested files and directories of the given entry
		 *
		 * @param entry
		 * @return Array
		 */
        public getEntryChildren(entry:ZipEntry):Array<ZipEntry>;

        /**
		 * Returns the zip file
		 *
		 * @return Buffer
		 */
        public compressToBuffer:Buffer;
        
        public toAsyncBuffer(onSuccess:(...args:any)=>void, onFail:(...args:any)=>void, onItemStart:(...args:any)=>void, onItemEnd:(...args:any)=>void):any;
    }

}
    
