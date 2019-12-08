db=connect('localhost/mDB');

function insertData(myObject)
{
    db.names.insert(myObject);
}

function getDataBack()
{
    var cursor = db.names.find();
    while (cursor.hasNext())
    {
        printjson(cursor.next());
    }
}