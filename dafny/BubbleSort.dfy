predicate sorted(blood: array<int>, from: int, to: int)
  reads blood
  requires blood != null
  {
    forall i, k :: 0 <= from <= i <= k <= to < blood.Length ==> blood[i] <= blood[k]
  }
predicate sortedopp(blood: array<int>, from: int, to: int)
  reads blood
  requires blood != null
  {
    forall i, k :: 0 <= from <= i <= k <= to < blood.Length ==> blood[i] >= blood[k]
  }


method sortBloodList(blood_amount:array<int>, blood_expiry:array<int>)
modifies blood_amount
modifies blood_expiry
requires blood_amount != null
requires blood_expiry != null
ensures sorted (blood_amount, 0, blood_amount.Length)
ensures sortedopp(blood_expiry, 0, blood_expiry.Length)
{
    //bubble sort bloodamount
    var i:=0;
    var counter:=0;
    var currBag:int;
    var nextBag:int;
    while (i < blood_amount.Length)
    invariant 0 <= i <= blood_amount.Length
    decreases blood_amount.Length-i
    {
        counter :=0;
        while ( counter < blood_amount.Length - 1)
        invariant 0 <= counter <= blood_amount.Length -1
        decreases blood_amount.Length-counter
        {
            currBag:= blood_amount[counter];
            nextBag:= blood_amount[counter + 1];
            if (currBag < nextBag)
            {
                blood_amount[counter+1]:= currBag;
                blood_amount[counter]:= nextBag;
            }
            counter:=counter + 1;
        }
        i:=i + 1;
    }
    i:=0;
    //blood expiry
    while (i < blood_expiry.Length)
    invariant 0 <= i <= blood_expiry.Length
    decreases blood_expiry.Length-i
    {
        counter :=0;
        while ( counter < blood_expiry.Length - 1)
        invariant 0 <= counter <= blood_expiry.Length -1
        decreases blood_expiry.Length-counter
        {
            currBag:= blood_expiry[counter];
            nextBag:= blood_expiry[counter + 1];
            if (currBag > nextBag)
            {
                blood_expiry[counter+1]:= currBag;
                blood_expiry[counter]:= nextBag;
            }
            counter:=counter + 1;
        }
        i:=i + 1;
    }

}
