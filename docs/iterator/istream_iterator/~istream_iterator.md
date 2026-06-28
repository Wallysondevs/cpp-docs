# std::istream_iterator<T,CharT,Traits,Distance>::~istream_iterator

```cpp
~istream_iterator();  // (até C++11)
~istream_iterator() = default;  // (desde C++11)
```

  
Destrói o iterator, incluindo o valor em cache.

Se [std::is_trivially_destructible](<#/doc/types/is_destructible>)&lt;T&gt;::value for `true`, então este destrutor é um destrutor trivial.  | (desde C++11)  