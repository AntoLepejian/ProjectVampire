
method removeExpiredBlood(a:array<int>, expiry:int, currentTime:int) returns (b:array<int>, size:nat)
requires a != null;
ensures b != null;
ensures b.Length == a.Length;
ensures size <= a.Length;
ensures forall k :: 0 <= k < size ==> b[k] < currentTime;   
{
	var index := 0;
	size := 0;
	b := new int[a.Length];

	while (index < a.Length)
    invariant size <= index <= a.Length;
    invariant size <= b.Length;    
    invariant forall k :: 0 <= k < size ==> b[k] < currentTime; 
    {
    	if (a[index] < currentTime) { 
			b[size] := a[index];
			size := size + 1;
    	}
    	index := index + 1;
	}
}