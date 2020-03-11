mocha.setup('bdd');
const expect = chai.expect;
sinon.spy(console, 'log');

// ======================Point======================
class Point {
  constructor(x, y) {
    if(!x || !y) throw new Error('illegal arguments');
    this.x = x;
    this.y = y;
  }
  
  plus(point) {return new Point(this.x + point.x, this.y + point.y)}
}

describe('Point', () => {
  it('constructor should throw an error when no params have been passed', () => {    
    expect(() => new Point(1)).to.throw();    
    expect(() => new Point()).to.throw();    
  });
  
  it('constructor should return object with two fields with passed parameters: x and y', () => {    
    const point = new Point(1, 2);

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
  });
  
  it('object should have plus method', () => {
    const point = new Point(1, 2);
    
    expect(point.plus).to.be.an.instanceof(Function);    
  });
  
  it('plus method should get another Point object and return new one as a sum of first ones', () => {
    const firstPoint = new Point(1, 2);
    const secondPoint = new Point(3, 4);
    const result = firstPoint.plus(secondPoint);
    
    expect(result.x).to.equal(4);
    expect(result.y).to.equal(6);
  });  
});
// ======================Speaker and Screamer====================== old es5
function SpeakerOld(name) {
  if(!name) throw new Error('illegal arguments');
  this.name = name;
  this.says = " says ";
}
SpeakerOld.prototype.modifyLine = function(line) {
  return this.says + line;
};
SpeakerOld.prototype.speak = function(line) {
  console.log(this.name + this.modifyLine(line));  
};


function ScreamerOld(name)  {
  SpeakerOld.call(this, name);
  this.shouts = " shouts ";
}
ScreamerOld.prototype = Object.create(SpeakerOld.prototype);
ScreamerOld.prototype.constructor = ScreamerOld;
ScreamerOld.prototype.modifyLine = function(line) {
  return this.shouts + line.toUpperCase();
}

describe('Old Speaker and Screamer', () => {
  describe('Old Speaker', () => {
    it('constructor should throw an error when no param has been passed', () => {    
      expect(() => new SpeakerOld()).to.throw();
    });
    
    it('Old should create an object with property "name" and method "speak"', () => {    
      const speaker = new SpeakerOld('Michael');
      
      expect(speaker.name).to.equal('Michael');
      expect(speaker.speak).to.be.instanceOf(Function);
    });
    
    it('Old method "speak" should return name of the speaker who says passed text', () => {    
      const speaker = new SpeakerOld('Michael');            
      
      speaker.speak('easy, man');
      
      expect(console.log.calledWith('Michael says easy, man')).to.equal(true);
    });
  });
  
  describe('Old Screamer', () => {
    it('Old should says passed text louder than speaker', () => {    
      const screamer = new ScreamerOld('Mr. Loud');            
      
      screamer.speak('hell yeah');
      
      expect(console.log.calledWith('Mr. Loud shouts HELL YEAH')).to.equal(true);
    });   
  });  
});


// ======================Speaker and Screamer====================== new es6
class Speaker {
  says = " says ";
  
  constructor(name) {
    if(!name) throw new Error('illegal arguments');
    this.name = name;
  }
  
  speak(line) { 
    console.log(this.name + this.modifyLine(line));
  }

  modifyLine(line) {return this.says + line;}
}
class Screamer extends Speaker {
  shouts = " shouts ";
  constructor(name) { super(name); }
  modifyLine(line) { return this.shouts + line.toUpperCase(); }
}

describe('Speaker and Screamer', () => {
  describe('Speaker', () => {
    it('constructor should throw an error when no param has been passed', () => {    
      expect(() => new Speaker()).to.throw();
    });
    
    it('should create an object with property "name" and method "speak"', () => {    
      const speaker = new Speaker('Michael');
      
      expect(speaker.name).to.equal('Michael');
      expect(speaker.speak).to.be.instanceOf(Function);
    });
    
    it('method "speak" should return name of the speaker who says passed text', () => {    
      const speaker = new Speaker('Michael');            
      
      speaker.speak('easy, man');
      
      expect(console.log.calledWith('Michael says easy, man')).to.equal(true);
    });
  });
  
  describe('Screamer', () => {
    it('should says passed text louder than speaker', () => {    
      const screamer = new Screamer('Mr. Loud');            
      
      screamer.speak('hell yeah');
      
      expect(console.log.calledWith('Mr. Loud shouts HELL YEAH')).to.equal(true);
    });   
  });  
});

// ======================The Reading list======================
class BookList {
  constructor() {
    this.booksFinished = 0;
    this.booksNotFinished = 0;
    this.nextBook = null;
    this.currentBook = null;
    this.lastBook = null;
    this.books = [];
  } 
  
  add(book) {
    if(!(book instanceof Book)) throw new Error('illegal arguments');
    this.books.push(book);
    if(this.books.length === 1) this.currentBook = book;
    this.nextBook = this.books.find((elem) => elem !== this.currentBook && elem.isRead === false);
  }
  
  finishCurrentBook() {
    this.currentBook.isRead = true;
    this.lastBook = this.currentBook;
    this.currentBook = this.books.find((book) => !book.isRead);
  }
  
}

class Book {
  constructor(book) {
    if(!book.title) throw new Error('illegal arguments');
    this.title = book.title;
    this.genre = book.genre;
    this.author = book.author;
    this.isRead = book.isRead ? book.isRead : false;
    this.dateFinished = book.dateFinished ? book.dateFinished : null;
  }
    
  markAsRead() { 
    this.isRead = true;
    this.dateFinished = new Date(Date.now());
  }
}


describe('The Reading list', () => {   
  describe('Book', () => {    
    describe('should have next fields', () => {
      it('title (required)', () => {               
        expect(() => new Book({})).to.throw();
        
        const book = new Book({ title: 'BookTitle' });
        
        expect(book.title).to.equal('BookTitle');
      });
      
      it('genre', () => {
        const book = new Book({ title: 'BookTitle', genre: 'BookGenre' });
        
        expect(book.genre).to.equal('BookGenre');
      });
      
      it('isRead (default = false)', () => {               
        const book = new Book({ title: 'BookTitle' });
        
        expect(book.isRead).to.equal(false);
        
        const bookIsRead = new Book({ title: 'BookTitle', isRead: true });
        
        expect(bookIsRead.isRead).to.equal(true);
      });
      
      it('dateFinished (default = null)', () => {               
        const book = new Book({ title: 'BookTitle' });
        
        expect(book.dateFinished).to.equal(null);       
      });
    });
    
    describe('should have next methods', () => {
      describe('.markAsRead()', () => {
        it('should be defined', () => {
          expect(new Book({ title: 'Title' }).markAsRead).to.be.instanceof(Function);
        });

        it('should mark book as read', () => {
          const book = new Book({ title: 'Title' });

          expect(book.isRead).to.equal(false);

          book.markAsRead();

          expect(book.isRead).to.equal(true);        
        });

        it('should set date when finished', () => {
          const book = new Book({ title: 'Title' });

          expect(book.dateFinished).to.equal(null);

          book.markAsRead();

          expect(book.dateFinished).to.eql(new Date(Date.now()));
        });
      });
    });
  });
  
  describe('BookList', () => {
    describe('should have next fields', () => {
      it('number of books marked as read', () => {
        const list = new BookList();
                
        expect(list.booksFinished).to.equal(0);
      });

      it('number of books marked as not read', () => {
        const list = new BookList();
                
        expect(list.booksNotFinished).to.equal(0);
      });
      
      it('reference to the next book', () => {
        const list = new BookList();
                
        expect(list.nextBook).to.equal(null);        
      });
      
      it('reference to the current book', () => {
        const list = new BookList();
                
        expect(list.currentBook).to.equal(null);        
      });
      
      it('reference to the last book read', () => {
        const list = new BookList();
                
        expect(list.lastBook).to.equal(null);        
      });
      
      it('list of all books', () => {
        const list = new BookList();
                
        expect(list.books).to.be.instanceOf(Array);
        expect(list.books).to.eql([]);        
      });
    });
    
    describe('should have next methods', () => {
      describe('.add()', () => {
        it('should be defined', () => {
          expect(new BookList().add).to.be.instanceof(Function);
        });
        
        it('should be get only Book', () => {
          expect(() => new BookList().add()).to.throw();
          expect(() => new BookList().add(123)).to.throw();

          const book = new Book({ title: 'Title' });
          expect(() => new BookList().add(book)).to.not.throw();
        });
        
        it('should add new Book into the list', () => {          
          const book = new Book({ title: 'Title' });
          const list = new BookList();                    

          expect(list.books.length).to.equal(0);
          
          list.add(book);
          
          expect(list.books.length).to.equal(1);
        });
        
        it('should make book as current one if it is first in a list', () => {          
          const book = new Book({ title: 'Title' });
          const list = new BookList();

          expect(list.books.length).to.equal(0);
          
          list.add(book);
          
          expect(list.books.length).to.equal(1);
          expect(list.currentBook).to.eql(book);
          
          const book2 = new Book({ title: 'Title2' });
          
          list.add(book2);
          expect(list.books.length).to.equal(2);
          expect(list.currentBook).to.not.eql(book2);
        });
      });           
      
      describe('.finishCurrentBook()', () => {
        it('should be defined', () => {
          expect(new BookList().finishCurrentBook).to.be.instanceof(Function);
        });
        
        it('should change current book status as read', () => {
          const book = new Book({ title: 'Title' });
          const list = new BookList();          
          
          list.add(book);
          list.finishCurrentBook();
          expect(book.isRead).to.equal(true);
        });
        
        it('should save previous read book', () => {
          const book = new Book({ title: 'Title' });
          const book2 = new Book({ title: 'Title2' });
          const list = new BookList();          
          
          list.add(book);
          list.add(book2);
          list.finishCurrentBook();
          expect(book.isRead).to.equal(true);
          expect(list.lastBook).to.eql(book);
        });
        
        it('should present next unread book from the list as next to read', () => {
          const book = new Book({ title: 'Title' });
          const book2 = new Book({ title: 'Title2' });
          const list = new BookList();          
          
          list.add(book);
          list.add(book2);                    
          expect(list.nextBook).to.eql(book2);
        });
        
        it('should take next book as current one', () => {
          const book = new Book({ title: 'Title' });
          const book2 = new Book({ title: 'Title2' });
          const list = new BookList();          
          
          list.add(book);
          list.add(book2);
          list.finishCurrentBook();
          expect(list.currentBook).to.eql(book2);
        });
      });
    });
  });
});

mocha.run();