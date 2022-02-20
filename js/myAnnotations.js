class MyAnnotation{
   constructor(id, currentDate, title, note){
      this._id = id;
      this._currentDate = currentDate;
      this._title = title;
      this._note = note;
   }

   get id(){
      return this._id;
   }
   set id(value){
      this._id = value;
   }

   get currentDate(){
      return ((this._currentDate.getDate() )) + "/" + ((this._currentDate.getMonth() + 1)) + "/" + this._currentDate.getFullYear(); 
   }
   set currentDate(value){
      this._currentDate = value;
   }

   get title(){
      return this._title;
   }
   set title(value){
      this._title = value;
   }

   get note(){
      return this._note;
   }
   set note(value){
      this._note = value;
   }
}