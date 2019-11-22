method Handleblood(bloodAvailable:int) returns (amount: int, bagsize:array<int>, blood_amount:array<int>)
requires bloodAvailable > 0
ensures amount == 0
{

    var bag400:=0;
    var bag200:=0;
    var bag100:=0;
    var bag50:=0;
    var bag20:=0; 
    var excess:=0;
    var length:=0;
    amount:= bloodAvailable;
    assert amount > 0;
    //verifies that at least one bag is required since bloodamount > 0 
    while (amount > 0)
    invariant amount >= 0 
    invariant amount == 0 ==> bag400 + bag200 + bag100 + bag50 + bag20 > 0
    decreases amount
    {
        if (amount >= 400){
            bag400:= bag400+1;
            amount:= amount - 400;
        }else if (amount >=200 && amount <400){
            bag200:= bag200 + 1;
            amount:= amount - 200;
        }else if (amount >= 100 && amount < 200){
            bag100:= bag100 + 1;
            amount:= amount - 100;
        }else if (amount >=50 && amount <100){
            bag50:= bag50 + 1;
            amount:= amount - 50;
        }else if (amount >= 20 && amount < 50){
            bag20 := bag20 + 1;
            amount:= amount - 20;
        }else if (amount >0 && amount <20){
            excess := amount;
            amount:= 0;
            bag20:= bag20 + 1;
        }
    }


    //to model the entities in python there are two arrays. bagsize represents the bagsize in the code 
    //and blood_amount represents the blood_amount in the code
    length:= bag400 + bag200 + bag100 + bag50 + bag20;
    assert length>0;
    bagsize:= new int[length];
    blood_amount:= new int[length];
    var count:=0;

    bag20:= bag20 + bag400 + bag200 + bag100 + bag50;
    bag50 := bag50 + bag400 + bag200 + bag100;
    bag100:= bag100 + bag400 + bag200;
    bag200 := bag200 + bag400;
    var index:= 0;
    // check lengths are same.
    assert bagsize.Length == blood_amount.Length;
    //verifies the insert into the database.
    //what we want: 
    // the bagsize matches the bloodamount when inserted EXCEPT for when there is excess.
    // in that case we want a 20 bag to be inserted and a bloodamount <20.
    while (index < blood_amount.Length ) 
    invariant index > 0 && index < blood_amount.Length-1 ==> bagsize[index-1] == blood_amount[index-1]
    invariant index == blood_amount.Length && excess > 0 ==> blood_amount[blood_amount.Length-1] <20 && bagsize[blood_amount.Length-1] == 20
    decreases blood_amount.Length - index
    {
        if (index < bag400){
            bagsize[index]:=400;
            blood_amount[index]:=400;
            index:= index+1;
        }else if (index < bag200){
            bagsize[index]:=200;
            blood_amount[index]:=200;
            index:= index+1;
        }else if (index < bag100){
            bagsize[index]:=100;
            blood_amount[index]:=100;
            index:= index+1;
        }else if (index < bag50){
            bagsize[index]:=50;
            blood_amount[index]:=50;
            index:= index+1;
        }else if (index < bag20){
            bagsize[index]:=20;
            blood_amount[index]:=20;
            index:= index+1;
        } if (index == blood_amount.Length && excess > 0){
            bagsize[index-1] := 20;
            blood_amount[index-1]:=excess;
        }
    }
}
